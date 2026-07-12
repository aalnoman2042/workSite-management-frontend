"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

// Real screenshots of the running app, captured against the live database. Emails were
// replaced with @demo.worksite before capture — this page is public.
const screens = [
  {
    id: "admin-dashboard",
    label: "Admin",
    caption:
      "Organisation-wide overview: workforce, engineers, sites and money. Workers by position and sites by status are Recharts fed from a single guarded /stats/admin call.",
  },
  {
    id: "site-engineer-dashboard",
    label: "Site Engineer",
    caption:
      "Scoped to the caller. The API derives their sites and crew from the assignments they created and the attendance they marked — a Site has no owner column, so the scope is computed, not stored.",
  },
  {
    id: "worker-dashboard",
    label: "Worker",
    caption:
      "A worker sees only their own tasks, attendance and pay. The worker id comes from the JWT, so it cannot be swapped for someone else's.",
  },
  {
    id: "attendance",
    label: "Attendance",
    caption:
      "Every attendance record with search, status and paid/unpaid filters, alongside the payment ledger it feeds. Supervisors see everything; a worker sees only their own.",
  },
  {
    id: "payments",
    label: "Payments",
    caption:
      "Wages calculated from attendance and settled through Stripe Checkout. An abandoned checkout is released back to DUE instead of being stranded in PENDING.",
  },
  {
    id: "sites",
    label: "Sites",
    caption:
      "Sites ordered running-first, with schedule progress, crew size and today's attendance. Chief engineers can edit status and details inline.",
  },
  {
    id: "ask-ai",
    label: "AI Assistant",
    caption:
      "Ask in plain English and get an answer from live data. Falls through a list of free models, so a delisted or rate-limited model does not take the feature down.",
  },
];

const ScreenshotGallery = () => {
  const [active, setActive] = useState(screens[0]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setActive(screen)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active.id === screen.id
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {screen.label}
          </button>
        ))}
      </div>

      <figure className="space-y-4">
        <div className="overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
          <Image
            key={active.id}
            src={`/screens/${active.id}.jpg`}
            alt={`${active.label} screen of WorkSite Manager`}
            width={2160}
            height={1575}
            className="reveal-in h-auto w-full"
            priority={active.id === "admin-dashboard"}
          />
        </div>
        <figcaption className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          {active.caption}
        </figcaption>
      </figure>
    </div>
  );
};

export default ScreenshotGallery;
