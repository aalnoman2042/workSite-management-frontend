import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import workerImage from "../../../assets/homePage/worker.jpeg";

// The four roles are real — they are the actual permission model. The old hero claimed
// "120+ Active Sites / 450+ Workers / 98% Accuracy", none of which were true.
const roles = ["Admin", "Chief Engineer", "Site Engineer", "Worker"];

export function WorksiteHero() {
  return (
    // `dark` flips the theme tokens for this section only, so the hero is a steel band of the
    // same system rather than a separately hardcoded palette.
    <section className="dark relative w-full overflow-hidden bg-background px-6 py-24 text-foreground sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      {/* A single amber glow — the brand accent, used once, large and quiet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[620px] rounded-full bg-primary/20 blur-[130px]"
      />

      {/* Above the fold, so this animates on load with a stagger rather than waiting for an
          observer to fire. Each child is offset by ~90ms. */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <span className="reveal-now inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Worksite Management System
          </span>

          <h1
            className="reveal-now text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            Run your sites without the{" "}
            <span className="text-primary">paperwork</span>.
          </h1>

          <p
            className="reveal-now max-w-lg text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "180ms" }}
          >
            Workers, sites, attendance and payments in one place. Mark a day on site and the
            wage follows automatically — no spreadsheets, no reconciliation at month end.
          </p>

          <div
            className="reveal-now flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "270ms" }}
          >
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

          <div
            className="reveal-now space-y-3 border-t pt-8"
            style={{ animationDelay: "360ms" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              A dashboard for every role
            </p>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="reveal-now relative aspect-4/3 w-full overflow-hidden rounded-xl border shadow-2xl"
          style={{ animationDelay: "220ms" }}
        >
          <Image
            src={workerImage}
            alt="Construction workers on site"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
