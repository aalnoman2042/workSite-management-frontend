"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger, in ms. Use small steps (55–90) across siblings. */
  delay?: number;
  className?: string;
}

// Fades content up as it scrolls into view.
//
// IntersectionObserver alone is not enough: it only fires when the intersection state
// *changes*. Jump straight past an element — an anchor link like /#faq, or a scroll position
// restored on reload — and it goes from below the viewport to above it without ever
// intersecting, so no callback fires and the element stays at opacity: 0 forever. So we also
// reveal anything that is already at or above the fold, both on mount and on scroll.
const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Never leave content hidden if motion is unwanted or the API is missing.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    // Anything whose top has already reached the fold — including everything scrolled past.
    const isDueToShow = () => element.getBoundingClientRect().top < window.innerHeight * 0.92;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (isDueToShow()) reveal();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) reveal();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);

    // Covers the jump cases the observer cannot see.
    if (isDueToShow()) {
      reveal();
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
