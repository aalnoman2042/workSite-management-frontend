import {
  Building2,
  ClipboardCheck,
  Shield,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import Reveal from "@/components/shared/reveal";
import { Section, SectionHeading } from "./section";

const features = [
  {
    icon: ClipboardCheck,
    title: "Attendance",
    desc: "Mark present, absent or half-day against a site. Every record is timestamped and tied to the engineer who took it.",
  },
  {
    icon: Users,
    title: "Workers",
    desc: "Approve new workers, set positions and rates, and keep the whole roster in one list instead of a spreadsheet.",
  },
  {
    icon: Building2,
    title: "Sites",
    desc: "Track each site's status, schedule, budget and crew. Running sites always sort to the top.",
  },
  {
    icon: Wallet,
    title: "Payments",
    desc: "Wages are calculated from attendance and settled through Stripe. Paid days are marked off automatically.",
  },
  {
    icon: Shield,
    title: "Role-based access",
    desc: "Admin, chief engineer, site engineer and worker each see only what they are permitted to — enforced on the server, not just hidden in the UI.",
  },
  {
    icon: Sparkles,
    title: "AI assistant",
    desc: "Ask in plain English — “which plumbers are on site today?” — and get an answer from live data.",
  },
];

export default function KeyFeatures() {
  return (
    <Section id="features" className="border-b">
      <SectionHeading
        eyebrow="Features"
        title="Everything a site actually needs"
        lead="Six modules that cover the day-to-day, and nothing you would never open."
      />

      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }, index) => (
          // Reveal is the grid cell, so it must fill it — otherwise the gap-px hairlines
          // between cells break wherever a card is shorter than its row.
          <Reveal key={title} delay={index * 70} className="h-full">
            <div className="group h-full bg-card p-8 transition-colors hover:bg-muted/50">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-medium">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}