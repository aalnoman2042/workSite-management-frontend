import { Eyebrow, Section, SectionHeading } from "@/components/module/Home/section";
import Reveal from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import {
  ArrowRight,
  ClipboardCheck,
  HardHat,
  MapPin,
  Shield,
  Sparkles,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — WorkSite Manager",
  description:
    "Why we built WorkSite Manager: construction still runs on pen and paper. One platform for workers, sites, attendance and payments, with a dashboard for every role.",
};

const offerings = [
  {
    icon: Users,
    title: "Worker management",
    desc: "Add, approve and track every worker from one roster. Positions, rates and status in one place.",
  },
  {
    icon: MapPin,
    title: "Site coordination",
    desc: "Stand up a site in minutes, track its status and schedule, and see the crew working it.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance",
    desc: "Mark present, absent or half-day on site. Every record is traceable to the engineer who took it.",
  },
  {
    icon: Wallet,
    title: "Payments",
    desc: "Daily and half-day rates applied automatically from attendance, then settled through Stripe.",
  },
];

const roles = [
  {
    icon: Shield,
    title: "Admin",
    desc: "Full oversight. Creates engineers, manages workers, and sees the whole organisation.",
  },
  {
    icon: UserCog,
    title: "Chief Engineer",
    desc: "Creates sites, approves workers, and watches attendance and dues across every project.",
  },
  {
    icon: HardHat,
    title: "Site Engineer",
    desc: "Assigns tasks, records attendance, and pays workers — scoped to their own sites.",
  },
  {
    icon: Users,
    title: "Worker",
    desc: "Sees their own tasks, attendance and pay. Nothing belonging to anyone else.",
  },
];

const IconGrid = ({
  items,
}: {
  items: { icon: React.ElementType; title: string; desc: string }[];
}) => (
  <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
    {items.map(({ icon: Icon, title, desc }, index) => (
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
);

export default function AboutPage() {
  return (
    <>
      <section className="dark relative w-full overflow-hidden bg-background px-6 py-24 text-foreground sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]"
        />
        <div className="relative mx-auto max-w-3xl space-y-6 text-center">
          <div className="reveal-now">
            <Eyebrow>About</Eyebrow>
          </div>
          <h1
            className="reveal-now text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl"
            style={{ animationDelay: "90ms" }}
          >
            Built for the people who actually run construction sites.
          </h1>
          <p
            className="reveal-now text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "180ms" }}
          >
            WorkSite Manager replaces paperwork, spreadsheets and group-chat chaos with one
            platform that handles workers, sites, attendance and payments — end to end.
          </p>
        </div>
      </section>

      <Section className="border-b">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Eyebrow>Our mission</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Most of construction still runs on pen and paper
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Hours of attendance go missing. Payments arrive late. Engineers lose afternoons
            reconciling numbers instead of running the project. We built WorkSite Manager so a
            chief engineer, a site engineer and a worker can all stay on the same page without
            anyone opening a spreadsheet.
          </p>
        </div>
      </Section>

      <Section className="border-b">
        <SectionHeading
          eyebrow="What we build"
          title="Four pieces that cover the job"
          lead="Purpose-built for the construction workflow, not adapted from generic HR software."
        />
        <IconGrid items={offerings} />
      </Section>

      <Section className="border-b bg-muted/40">
        <SectionHeading
          eyebrow="Roles"
          title="A dashboard for each person on site"
          lead="Everyone on a site needs something different. Each role is limited to the data it is permitted to see, enforced on the server."
        />
        <IconGrid items={roles} />
      </Section>

      <Section className="border-b">
        <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 text-center sm:p-14">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Ask your data a question
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Admins and chief engineers can ask in plain English —{" "}
            <span className="text-foreground">“show me all plumbers at Site Alpha”</span> or{" "}
            <span className="text-foreground">“workers with a daily rate above 500”</span> — and
            get an answer straight from live data.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Ready to streamline your site?
          </h2>
          <p className="text-muted-foreground">
            Get started in minutes. Nothing to import, no spreadsheets to migrate.
          </p>
          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/register">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}