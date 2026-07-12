import Reveal from "@/components/shared/reveal";
import { Section, SectionHeading } from "./section";

const steps = [
  {
    title: "Create a site",
    description:
      "Add the site, its address, schedule and budget. It takes a minute, and it becomes the single record everything else hangs off.",
  },
  {
    title: "Add your people",
    description:
      "Bring in workers and engineers, set daily and half-day rates, and give each person the role they actually need.",
  },
  {
    title: "Mark the day",
    description:
      "Your site engineer marks who turned up. Wages are calculated from that attendance and settled through Stripe.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-b bg-muted/40">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps, then it runs itself"
        lead="No imports, no migration, no reconciliation at month end."
      />

      {/* gap-px over a border-coloured background gives hairline dividers between cells */}
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 90} className="h-full">
            <div className="group h-full bg-card p-8 transition-colors hover:bg-muted/50">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-medium text-primary transition-transform duration-200 group-hover:scale-105">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}