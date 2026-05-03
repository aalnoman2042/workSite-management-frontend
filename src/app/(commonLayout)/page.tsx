// import { Hero } from "@/components/modules/Home/Hero";
// import Specialities from "@/components/modules/Home/Specialties";
// import Steps from "@/components/modules/Home/Steps";
// import Testimonials from "@/components/modules/Home/Testimonials";
// import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import BenefitsSection from "@/components/module/Home/benefits";
import FAQSection from "@/components/module/Home/FAQ";
import { WorksiteHero } from "@/components/module/Home/Hero";
import HowItWorks from "@/components/module/Home/howItWorks";
import KeyFeatures from "@/components/module/Home/keyFeature";
import WhyChooseUs from "@/components/module/Home/whyChooseUs";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Worksite Manager - Find Your Perfect Worker management system</title>
        <meta
          name="description"
          content="Discover top-rated workers tailored to your needs with our AI-powered worksite management platform. Get personalized recommendations and manage your workforce effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WorksiteHero />
       <HowItWorks />
    <WhyChooseUs />
    <KeyFeatures />
    <BenefitsSection />
    <FAQSection />
        {/* <Steps /> */}
        {/* <Testimonials /> */}
      </main>
    </>
  );
}