import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain,
  BookOpen,
  Users,
  Timer,
  ScanEye,
  HeartCrack,
  LifeBuoy,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saheli — Recognise, Connect, Exit, Get Help" },
      {
        name: "description",
        content:
          "A privacy-first safety companion for women: spot manipulation and coercive control, keep trusted contacts close, and reach help fast.",
      },
      { property: "og:title", content: "Saheli — Recognise, Connect, Exit, Get Help" },
      {
        property: "og:description",
        content:
          "Spot manipulation and coercive control, keep trusted contacts close, and reach help fast.",
      },
    ],
  }),
  component: Home,
});

const STEPS = [
  {
    step: "01",
    title: "Recognise",
    body: "Understand what you are seeing, in plain words.",
  },
  { step: "02", title: "Stay connected", body: "Keep people who care within one tap." },
  { step: "03", title: "Get out", body: "Leave a situation safely, with backup watching." },
  { step: "04", title: "Get help", body: "Reach the right service, quickly." },
];

const FEATURES = [
  {
    to: "/analyze",
    icon: Brain,
    title: "Behavioral Analyzer",
    body: "Paste messages and see the patterns behind them — manipulation, coercion, threats, stalking.",
  },
  {
    to: "/patterns",
    icon: BookOpen,
    title: "Pattern Library",
    body: "Ten warning signs explained: what they look like and what to do next.",
  },
  {
    to: "/circle",
    icon: Users,
    title: "Trusted Circle",
    body: "Save the people who should know if something feels wrong.",
  },
  {
    to: "/exit-window",
    icon: Timer,
    title: "Exit Window",
    body: "A timed check-in that alerts your circle if you don't respond.",
  },
  {
    to: "/room-check",
    icon: ScanEye,
    title: "Room Check",
    body: "A practical sweep for hidden cameras in hotels and rentals.",
  },
  {
    to: "/post-separation",
    icon: HeartCrack,
    title: "Post-Separation Check",
    body: "Name what's happening after a breakup, and how serious it is.",
  },
  {
    to: "/help",
    icon: LifeBuoy,
    title: "Get Help",
    body: "Emergency numbers, women's helplines, cybercrime reporting and legal aid in India.",
  },
];

function Home() {
  return (
    <div className="space-y-16">
      <section className="hero-surface relative overflow-hidden rounded-3xl border border-border px-6 py-14 sm:px-12 sm:py-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="size-3.5 text-safe" /> Nothing you write leaves this device
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] sm:text-6xl">
          Trust what you noticed.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Saheli helps you name concerning behaviour, keep someone in the loop, leave safely, and
          find help — before a situation escalates.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/analyze"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Analyse a conversation <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/help"
            className="inline-flex h-11 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-accent"
          >
            I need help now
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          How it works
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.step} className="panel p-5">
              <span className="font-display text-xs text-muted-foreground">{s.step}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          What's inside
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="panel group flex flex-col gap-3 p-6 transition-colors hover:border-primary/60"
            >
              <f.icon className="size-6 text-primary" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
                Open <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="panel p-6 sm:p-8">
        <h2 className="text-xl font-semibold">If you are in danger right now</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Call 112 for emergency services, 181 for the women's helpline, or 1930 to report online
          blackmail and harassment. The red HELP button at the top shares your location with your
          trusted circle.
        </p>
      </section>
    </div>
  );
}
