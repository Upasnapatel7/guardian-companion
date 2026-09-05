import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, ShieldAlert, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { analyzeBehavior, type AnalysisResult } from "@/lib/analyze.functions";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Behavioral Analyzer — Saheli" },
      {
        name: "description",
        content:
          "Paste a conversation and see which behavioural patterns appear: manipulation, coercive control, threats or stalking.",
      },
      { property: "og:title", content: "Behavioral Analyzer — Saheli" },
      {
        property: "og:description",
        content: "See which behavioural patterns appear in a conversation.",
      },
    ],
  }),
  component: Analyze,
});

const RISK_STYLES: Record<AnalysisResult["riskLevel"], string> = {
  low: "bg-safe/15 text-safe border-safe/40",
  elevated: "bg-caution/15 text-caution border-caution/40",
  high: "bg-signal/15 text-signal border-signal/40",
  critical: "bg-signal/25 text-signal border-signal/60",
};

const SEVERITY_STYLES: Record<string, string> = {
  watch: "bg-muted text-muted-foreground",
  concerning: "bg-caution/20 text-caution",
  serious: "bg-signal/20 text-signal",
};

function Analyze() {
  const [text, setText] = useState("");
  const [context, setContext] = useState("");
  const analyze = useServerFn(analyzeBehavior);

  const mutation = useMutation({
    mutationFn: (input: { text: string; context?: string }) => analyze({ data: input }),
  });

  const result = mutation.data;

  return (
    <div>
      <PageHeader
        eyebrow="Recognise"
        title="Behavioral Analyzer"
        description="Paste messages exactly as they were sent. The analysis names the patterns it sees, quotes the evidence, and suggests what to do next. Your text is analysed and not stored."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="panel space-y-4 p-5">
          <div>
            <label className="text-sm font-medium" htmlFor="context">
              Who sent these? (optional)
            </label>
            <Input
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. my partner, a colleague, someone I met online"
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="messages">
              The conversation
            </label>
            <Textarea
              id="messages"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={14}
              placeholder={"Him: why did you take 40 minutes to reply\nMe: I was at work\nHim: send me a photo of where you are, right now"}
              className="mt-2 resize-y font-sans"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              If you have screenshots, type or paste the text from them here.
            </p>
          </div>
          <Button
            className="w-full gap-2"
            disabled={text.trim().length < 10 || mutation.isPending}
            onClick={() => mutation.mutate({ text: text.trim(), context: context.trim() || undefined })}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Analysing...
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Analyse this conversation
              </>
            )}
          </Button>
          {mutation.isError && (
            <p className="rounded-lg border border-signal/40 bg-signal/10 p-3 text-sm text-signal">
              {(mutation.error as Error).message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {!result && !mutation.isPending && (
            <div className="panel p-6 text-sm leading-relaxed text-muted-foreground">
              <ShieldAlert className="mb-3 size-6 text-primary" />
              Your results will appear here. Nothing you paste is saved — close the page and it is
              gone.
            </div>
          )}

          {result && (
            <>
              <div className={`rounded-xl border p-5 ${RISK_STYLES[result.riskLevel]}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  {result.riskLevel} concern
                </p>
                <h2 className="mt-1 text-xl font-semibold">{result.headline}</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{result.summary}</p>
              </div>

              {result.patterns.length > 0 && (
                <div className="panel p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Patterns found
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {result.patterns.map((p, i) => (
                      <li key={i} className="border-l-2 border-border pl-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{p.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${SEVERITY_STYLES[p.severity] ?? SEVERITY_STYLES.watch}`}
                          >
                            {p.severity}
                          </span>
                        </div>
                        <p className="mt-1 text-sm italic text-muted-foreground">"{p.evidence}"</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.nextSteps.length > 0 && (
                <div className="panel p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    What you can do
                  </h3>
                  <ol className="mt-4 space-y-2 text-sm">
                    {result.nextSteps.map((s, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-primary">{i + 1}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <p className="text-xs leading-relaxed text-muted-foreground">{result.disclaimer}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
