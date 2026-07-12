"use client";

import Reveal from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading } from "./section";

const faqs = [
  {
    q: "How does a site engineer take attendance?",
    a: "They pick the site, then mark each worker present, absent or half-day. The record is stamped with the date and the engineer who took it, so it can always be traced back.",
  },
  {
    q: "How is a worker's pay calculated?",
    a: "From attendance. Present days are multiplied by the worker's daily rate, half-days by their half-day rate. Nobody types an amount in by hand.",
  },
  {
    q: "How do payments actually get settled?",
    a: "A site engineer pays through Stripe Checkout. Once Stripe confirms, the payment is marked paid and the attendance days behind it are marked as settled automatically.",
  },
  {
    q: "Can a worker see other people's data?",
    a: "No. A worker only ever sees their own tasks, attendance and payments, and that limit is enforced on the server — the API resolves the worker from their login, not from anything the browser sends.",
  },
  {
    q: "What can the chief engineer do that a site engineer cannot?",
    a: "The chief engineer creates and edits sites, changes site status, and approves workers. A site engineer works within the sites they are already assigned to.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes. Every page is built for phone, tablet and desktop, which matters because attendance is taken standing on a site, not at a desk.",
  },
];

export default function FAQSection() {
  return (
    <Section id="faq" className="border-b">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered"
        lead="The things people ask before they put a site on it."
      />

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 55}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium transition-colors hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}