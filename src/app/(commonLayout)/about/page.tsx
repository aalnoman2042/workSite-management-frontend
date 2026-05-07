import { Button } from "@/components/ui/button";
import { Sparkles, Users, ClipboardCheck, Wallet, MapPin, Shield, HardHat, UserCog } from "lucide-react";
import Link from "next/link";

const offeringTints = [
  "bg-purple-950/40 border-purple-900/40",
  "bg-emerald-950/40 border-emerald-900/40",
  "bg-amber-950/40 border-amber-900/40",
  "bg-rose-950/40 border-rose-900/40",
];

const roleTints = [
  "bg-slate-800/60 border-slate-700/50",
  "bg-teal-950/40 border-teal-900/40",
  "bg-purple-950/40 border-purple-900/40",
  "bg-emerald-950/40 border-emerald-900/40",
];

export default function AboutPage() {
  const offerings = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Worker Management",
      desc: "Add, approve, and track every worker from one dashboard. No more spreadsheets.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Site Coordination",
      desc: "Spin up new construction sites in minutes and assign engineers and workers cleanly.",
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Smart Attendance",
      desc: "Mark daily attendance with role-based access. Records sync in real time.",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Auto Payments",
      desc: "Daily and half-day rates calculated automatically from attendance data.",
    },
  ];

  const roles = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Admin",
      desc: "Full system control. Create engineers, manage workers, oversee everything.",
    },
    {
      icon: <UserCog className="w-8 h-8" />,
      title: "Chief Engineer",
      desc: "Create sites, approve workers, manage workforce assignments across projects.",
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Site Engineer",
      desc: "Assign daily tasks, record attendance on-site, process worker payments.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Worker",
      desc: "View tasks, profile, and payments. Get paid on time, every time.",
    },
  ];

  return (
    <main className="relative bg-linear-to-b from-zinc-700 via-neutral-700 to-zinc-800 text-white min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-400/15 blur-[120px] rounded-full" />

      {/* HERO */}
      <section className="w-full bg-transparent py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-sm tracking-widest text-zinc-400 uppercase">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Built for the people who actually run construction sites.
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            WorkSite Manager replaces paperwork, spreadsheets, and group-chat chaos
            with a single platform that handles workers, sites, attendance, and
            payments — end to end.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="w-full bg-transparent py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Our Mission
          </h2>
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
            Construction is one of the world&apos;s largest industries, but most of it
            still runs on pen and paper. Hours of attendance are lost, payments are
            delayed, and engineers waste afternoons reconciling data instead of
            running projects. We built WorkSite Manager so a chief engineer, a site
            engineer, and a worker can all stay on the same page — without ever
            opening a spreadsheet.
          </p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="w-full bg-transparent py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What We Build
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              The four core pieces of the platform — purpose-built for the
              construction workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, i) => (
              <div
                key={i}
                className={`p-6 border rounded-2xl hover:-translate-y-1 transition-all duration-300 ${offeringTints[i % offeringTints.length]}`}
              >
                <div className="text-white mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="w-full bg-transparent py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Roles We Support
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Every person on a construction site has different needs.
              We built role-based dashboards for each.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((item, i) => (
              <div
                key={i}
                className={`p-6 border rounded-2xl hover:-translate-y-1 transition-all duration-300 ${roleTints[i % roleTints.length]}`}
              >
                <div className="text-white mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI POWERED */}
      <section className="w-full bg-transparent py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border border-white/10 bg-white/5 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-6">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              AI-Powered Search
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Admins and chief engineers can ask plain-English questions like
              <span className="italic"> &quot;show me all plumbers at Site Alpha&quot;</span> or
              <span className="italic"> &quot;list workers with daily rate above 500&quot;</span>
              {" "}— and get instant answers from across the entire database.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-transparent py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to streamline your site?
          </h2>
          <p className="text-zinc-300">
            Get started in minutes. No setup fees, no spreadsheets to import.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/register">
              <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 rounded-xl">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 px-8 py-6 rounded-xl"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}