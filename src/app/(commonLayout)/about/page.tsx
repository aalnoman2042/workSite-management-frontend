import ArchitectureDiagram from "@/components/module/About/architectureDiagram";
import RoleMatrix from "@/components/module/About/roleMatrix";
import ScreenshotGallery from "@/components/module/About/screenshotGallery";
import TechStack from "@/components/module/About/techStack";
import { Eyebrow, Section, SectionHeading } from "@/components/module/Home/section";
import Reveal from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import {
  ArrowRight,
  ClipboardCheck,
  MapPin,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — WorkSite Manager",
  description:
    "How WorkSite Manager is built: a Next.js 16 App Router frontend, a 47-endpoint Express + Prisma API with server-enforced role scoping, Stripe-settled payroll driven by attendance, and an AI assistant over live data.",
};

// Counted from the source, not estimated: 47 router.* calls across 10 modules, 29 wrapped in
// auth(); 11 Prisma models and 7 enums; 27 page.tsx files.
const stats = [
  { value: "47", label: "REST endpoints" },
  { value: "29", label: "role-guarded" },
  { value: "11", label: "database models" },
  { value: "4", label: "role dashboards" },
];

const modules = [
  {
    icon: Users,
    title: "Workforce",
    desc: "Register, approve and manage workers. Positions, daily and half-day rates, soft delete and restore.",
  },
  {
    icon: MapPin,
    title: "Sites",
    desc: "Create sites with a schedule and budget, track status, and see crew size and today's attendance at a glance.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance",
    desc: "Mark present, absent or half-day against a site. Every record is traceable to the engineer who took it.",
  },
  {
    icon: Wallet,
    title: "Payroll",
    desc: "Wages derived from attendance and settled through Stripe. Paid days are marked off automatically.",
  },
];

const decisions = [
  {
    title: "Permissions are enforced on the server, not hidden in the UI",
    body: "A worker's records resolve from their JWT, never from a request parameter. Calling /attendance/my-attendance?workerId=<someone-else> still returns your own rows — the token overwrites the id. Hiding a button is not access control.",
  },
  {
    title: "Site ownership is derived, because the schema has none",
    body: "A Site has no owner column, so a site engineer's scope is computed from the assignments they created and the attendance they marked. The alternative was a migration; deriving it kept the data model honest.",
  },
  {
    title: "The payment lifecycle survives people changing their mind",
    body: "A checkout that is abandoned used to strand the payment in PENDING — no longer DUE, so never listed and never retryable. Cancelling now releases it back to DUE, and Stripe's checkout.session.expired webhook does the same for a payer who never returns.",
  },
  {
    title: "The AI assistant does not depend on one model staying free",
    body: "It pinned a single free model, which OpenRouter later delisted, and the assistant went silent. It now walks a list of models and falls through on a delisting, a rate limit, or an empty response.",
  },
  {
    title: "One theme, defined once",
    body: "Colour lives in design tokens, not components. Restyling the entire product — marketing site, dashboards, charts, badges — is a change to a single file, and light and dark come for free.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="dark relative w-full overflow-hidden bg-background px-6 py-24 text-foreground sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]"
        />

        <div className="relative mx-auto max-w-4xl space-y-8 text-center">
          <div className="reveal-now">
            <Eyebrow>About the project</Eyebrow>
          </div>
          <h1
            className="reveal-now text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl"
            style={{ animationDelay: "90ms" }}
          >
            A full-stack platform for the people who run construction sites.
          </h1>
          <p
            className="reveal-now mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "180ms" }}
          >
            Workers, sites, attendance and payroll, with a dashboard per role and permissions
            enforced in the API. Attendance drives wages; Stripe settles them. Below is exactly
            how it is put together.
          </p>

          <div
            className="reveal-now mx-auto grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4"
            style={{ animationDelay: "270ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card px-4 py-6">
                <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <Section className="border-b">
        <SectionHeading
          eyebrow="What it does"
          title="Four modules that cover the whole job"
          lead="Purpose-built for the construction workflow, rather than adapted from generic HR software."
        />
        <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(({ icon: Icon, title, desc }, index) => (
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

      {/* SCREENSHOTS */}
      <Section className="border-b bg-muted/40">
        <SectionHeading
          eyebrow="The product"
          title="Every screen, from four points of view"
          lead="Real screenshots of the running app against a live database. Notice how much less a worker sees than an admin — that is the permission model, not a different page."
        />
        <Reveal>
          <ScreenshotGallery />
        </Reveal>
      </Section>

      {/* ARCHITECTURE */}
      <Section className="border-b">
        <SectionHeading
          eyebrow="Architecture"
          title="How a request actually flows"
          lead="A Next.js client that never holds a secret, an Express API that guards every role-sensitive route, and Postgres behind Prisma."
        />
        <Reveal>
          <ArchitectureDiagram />
        </Reveal>
      </Section>

      {/* PERMISSIONS */}
      <Section className="border-b bg-muted/40">
        <SectionHeading
          eyebrow="Permission model"
          title="Who can do what"
          lead="This table mirrors the guards declared on the API routes. “Own” means the record is resolved from the caller's token, so the id cannot be swapped in a query string."
        />
        <Reveal>
          <RoleMatrix />
        </Reveal>
      </Section>

      {/* STACK */}
      <Section className="border-b">
        <SectionHeading
          eyebrow="Tech stack"
          title="What each piece is doing here"
          lead="Not a logo wall — what the tool was chosen for, and the job it does in this codebase."
        />
        <Reveal>
          <TechStack />
        </Reveal>
      </Section>

      {/* ENGINEERING */}
      <Section className="border-b bg-muted/40">
        <SectionHeading
          eyebrow="Engineering decisions"
          title="The parts that were actually hard"
          lead="Every one of these was a bug or a design flaw first."
        />
        <div className="mx-auto max-w-3xl space-y-px overflow-hidden rounded-xl border bg-border">
          {decisions.map((decision, index) => (
            <Reveal key={decision.title} delay={index * 60}>
              <div className="bg-card p-7">
                <div className="flex gap-4">
                  <span className="font-mono text-sm text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">{decision.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {decision.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* AI */}
      <Section className="border-b">
        <Reveal className="mx-auto max-w-3xl">
          <div className="rounded-xl border bg-card p-8 text-center sm:p-14">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Ask your data a question
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Admins and chief engineers can ask in plain English —{" "}
              <span className="text-foreground">“show me all plumbers at Site Alpha”</span> or{" "}
              <span className="text-foreground">“workers with a daily rate above 500”</span> —
              and get an answer straight from live data, with a model fallback chain so a
              single provider change cannot take the feature offline.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal className="mx-auto max-w-2xl">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              See it running
            </h2>
            <p className="text-muted-foreground">
              Create an account and put a site on it — there is nothing to import and nothing
              to set up.
            </p>
            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Button asChild size="lg" className="group h-12 px-8">
                <Link href="/register">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
