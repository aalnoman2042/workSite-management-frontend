import Reveal from "@/components/shared/reveal";
import { HardHat, Shield, UserCog, Users } from "lucide-react";
import { Section, SectionHeading } from "./section";

// This replaces the old "Why Choose Worksite Manager?" section, which said almost exactly the
// same thing as the "Why Choose Our System?" section directly below it on the same page.
const roles = [
  {
    icon: Shield,
    title: "Admin",
    desc: "Creates engineers, oversees the whole organisation, and sees every worker, site and payment.",
  },
  {
    icon: UserCog,
    title: "Chief Engineer",
    desc: "Creates and manages sites, approves workers, and keeps an eye on attendance and dues across projects.",
  },
  {
    icon: HardHat,
    title: "Site Engineer",
    desc: "Assigns the day's tasks, marks attendance on site, and settles worker payments — scoped to their own sites.",
  },
  {
    icon: Users,
    title: "Worker",
    desc: "Sees their own tasks, their own attendance and exactly what they are owed. Nothing else.",
  },
];

export default function WhyChooseUs() {
  return (
    <Section id="roles" className="border-b bg-muted/40">
      <SectionHeading
        eyebrow="Built for every role"
        title="Everyone sees their own work"
        lead="Four dashboards, one system. Each role is limited to the data it is permitted to see, and that limit is enforced on the server."
      />

      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {roles.map(({ icon: Icon, title, desc }, index) => (
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