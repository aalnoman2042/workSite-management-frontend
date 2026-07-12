import Reveal from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import React from "react";

// One rhythm for every public section: same max width, same vertical space, same heading
// scale. The old pages each invented their own padding and type sizes, which is most of why
// the site read as inconsistent.
export const Section = ({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className={cn("w-full px-6 py-24", className)}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
    {children}
  </span>
);

export const SectionHeading = ({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
}) => (
  <Reveal
    className={cn(
      "mb-14 space-y-4",
      align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
    )}
  >
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
    {lead && <p className="text-base leading-relaxed text-muted-foreground">{lead}</p>}
  </Reveal>
);