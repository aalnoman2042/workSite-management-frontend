import CtaSection from "@/components/module/Home/benefits";
import FAQSection from "@/components/module/Home/FAQ";
import { WorksiteHero } from "@/components/module/Home/Hero";
import HowItWorks from "@/components/module/Home/howItWorks";
import KeyFeatures from "@/components/module/Home/keyFeature";
import RolesSection from "@/components/module/Home/whyChooseUs";
import type { Metadata } from "next";

// The old page used <Head> from next/head, which is a Pages Router API and does nothing in
// the App Router — so the site shipped with no title or description at all.
export const metadata: Metadata = {
  title: "WorkSite Manager — Run your sites without the paperwork",
  description:
    "Manage workers, sites, attendance and payments in one place. Mark a day on site and the wage follows automatically, with a role-scoped dashboard for admins, chief engineers, site engineers and workers.",
};

export default function Home() {
  return (
    <>
      <WorksiteHero />
      <HowItWorks />
      <KeyFeatures />
      <RolesSection />
      <FAQSection />
      <CtaSection />
    </>
  );
}