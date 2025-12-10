"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="w-full py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Answers to common questions about managing workers, sites and attendance.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Column 1 */}
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-border rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                How do site engineers take worker attendance?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Site engineers select a worker and mark present. The system logs
                everything automatically.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-border rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                Can chief engineers manage site engineers?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, they can monitor sites, workers and verify attendance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-border rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                Is the system mobile friendly?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Everything is optimized for mobile, tablet and desktop.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Column 2 */}
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-4"
              className="border border-border rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                How is worker payment calculated?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Payments are auto-calculated based on attendance recorded by site
                engineers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-border rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                Can admins manage all roles?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, admins can manage users, sites, attendance, and system settings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border border-border rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                Is my data secure?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Your data is secured using encryption and role-based access control.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
