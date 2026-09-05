import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { PATTERNS, type Pattern } from "@/lib/data";

export const Route = createFileRoute("/patterns")({
  head: () => ({
    meta: [
      { title: "Pattern Library — Saheli" },
      {
        name: "description",
        content:
          "Learn the warning signs: love bombing, gaslighting, isolation, financial control, monitoring, coercive control, threats and stalking.",
      },
      { property: "og:title", content: "Pattern Library — Saheli" },
      {
        property: "og:description",
        content: "Warning signs explained, with what they look like and what to do.",
      },
    ],
  }),
  component: Patterns,
});

const LEVELS: { id: Pattern["level"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "watch", label: "Watch" },
  { id: "concerning", label: "Concerning" },
  { id: "serious", label: "Serious" },
];

const LEVEL_STYLES: Record<Pattern["level"], string> = {
  watch: "bg-muted text-muted-foreground",
  concerning: "bg-caution/20 text-caution",
  serious: "bg-signal/20 text-signal",
};

function Patterns() {
  const [level, setLevel] = useState<Pattern["level"] | "all">("all");
  const list = level === "all" ? PATTERNS : PATTERNS.filter((p) => p.level === level);

  return (
    <div>
      <PageHeader
        eyebrow="Recognise"
        title="Pattern Library"
        description="Concerning behaviour usually arrives as a pattern, not a single moment. These are the ones worth knowing by name."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              level === l.id
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((p) => (
          <article key={p.id} className="panel p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <span className={`rounded-full px-2 py-0.5 text-xs ${LEVEL_STYLES[p.level]}`}>
                {p.level}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
            <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              What it looks like
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              {p.looksLike.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-muted/60 p-3 text-sm">
              <span className="font-medium">What helps: </span>
              {p.whatToDo}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
