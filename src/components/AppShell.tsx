import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { HelpButton } from "./HelpButton";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyzer" },
  { to: "/patterns", label: "Patterns" },
  { to: "/circle", label: "Trusted Circle" },
  { to: "/exit-window", label: "Exit Window" },
  { to: "/room-check", label: "Room Check" },
  { to: "/post-separation", label: "After a breakup" },
  { to: "/help", label: "Get Help" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold">
                S
              </span>
              <span className="font-display text-base font-semibold tracking-tight">Saheli</span>
            </Link>
            <HelpButton />
          </div>
          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="shrink-0 rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-accent [&.active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">{children}</main>

      <footer className="border-t border-border/70 py-8 text-center text-xs text-muted-foreground">
        <p className="mx-auto max-w-xl px-4">
          Everything you enter stays on this device. Saheli offers support and information, not
          legal advice. In immediate danger, call 112.
        </p>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}
