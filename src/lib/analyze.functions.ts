import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AnalyzeInput = z.object({
  text: z.string().min(1).max(12000),
  context: z.string().max(500).optional(),
});

export type AnalysisResult = {
  riskLevel: "low" | "elevated" | "high" | "critical";
  headline: string;
  summary: string;
  patterns: { name: string; severity: "watch" | "concerning" | "serious"; evidence: string }[];
  nextSteps: string[];
  disclaimer: string;
};

const SYSTEM_PROMPT = `You are a trauma-informed safety analyst helping women in India recognise concerning behaviour in messages.
Analyse the conversation the user pastes and identify behavioural patterns such as: love bombing, guilt-tripping, gaslighting, isolation, financial control, monitoring/digital surveillance, coercive control, threats/intimidation, stalking, sexual coercion and boundary violations.

Rules:
- Never diagnose a person or make legal conclusions. Describe behaviour, not the person's character.
- Quote short evidence directly from the text for each pattern.
- Believe the user. Never suggest they provoked it.
- If there are explicit threats of violence, blackmail with images, or stalking, set riskLevel to "critical" or "high" and put contacting emergency help first in nextSteps.
- If nothing concerning appears, say so plainly with riskLevel "low".
- Keep the summary under 90 words and give 3-5 short, practical next steps.

Respond ONLY with JSON matching exactly:
{"riskLevel":"low|elevated|high|critical","headline":"short sentence","summary":"...","patterns":[{"name":"...","severity":"watch|concerning|serious","evidence":"short quote"}],"nextSteps":["..."]}`;

export const analyzeBehavior = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnalyzeInput.parse(input))
  .handler(async ({ data }): Promise<AnalysisResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured yet.");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        stream: false,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `${data.context ? `Context from the user: ${data.context}\n\n` : ""}Conversation to analyse:\n"""\n${data.text}\n"""`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      if (response.status === 429) {
        throw new Error("Too many requests right now. Please wait a moment and try again.");
      }
      if (response.status === 402) {
        throw new Error("The AI workspace is out of credits. Please add credits to continue.");
      }
      throw new Error(`Analysis failed (${response.status}): ${body.slice(0, 300)}`);
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = payload.choices?.[0]?.message?.content ?? "";
    const jsonText = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);

    let parsed: Partial<AnalysisResult> = {};
    try {
      parsed = JSON.parse(jsonText) as Partial<AnalysisResult>;
    } catch {
      throw new Error("The analysis came back in an unexpected format. Please try again.");
    }

    return {
      riskLevel: parsed.riskLevel ?? "elevated",
      headline: parsed.headline ?? "Review the findings below",
      summary: parsed.summary ?? "",
      patterns: Array.isArray(parsed.patterns) ? parsed.patterns.slice(0, 8) : [],
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps.slice(0, 6) : [],
      disclaimer:
        "This is guidance, not a diagnosis or legal advice. Trust your own judgement and reach out to a helpline if you feel unsafe.",
    };
  });
