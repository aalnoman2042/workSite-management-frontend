import Reveal from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Previously a second "Why Choose Our System?" grid, duplicating the section above it. The
// page did not need a third pitch — it needed somewhere to send the reader. This is the
// closing dark band, bookending the hero.
export default function CtaSection() {
  return (
    <section className="dark relative w-full overflow-hidden bg-background px-6 py-24 text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]"
      />

      <Reveal className="relative mx-auto max-w-2xl">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Put your next site on it today
          </h2>
          <p className="text-muted-foreground">
            Create a site, add your crew, and mark the first day. There is nothing to import
            and nothing to set up.
          </p>
          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <Button asChild size="lg" className="group h-12 px-8">
              <Link href="/register">
                Create an account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
