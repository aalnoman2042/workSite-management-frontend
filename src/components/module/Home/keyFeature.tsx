"use client";

import { Cpu, Users, ClipboardCheck, Wallet, Shield, BarChart3 } from "lucide-react";

const cardTints = [
  "bg-purple-950/40 border-purple-900/40",
  "bg-emerald-950/40 border-emerald-900/40",
  "bg-amber-950/40 border-amber-900/40",
  "bg-rose-950/40 border-rose-900/40",
  "bg-slate-800/60 border-slate-700/50",
  "bg-teal-950/40 border-teal-900/40",
];

export default function KeyFeatures() {
  const features = [
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Smart Attendance Tracking",
      desc: "Mark worker attendance instantly with real-time syncing and error-free records.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Worker Management",
      desc: "Add, update, and track all workers from a clean, intuitive dashboard.",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Site Management",
      desc: "Manage multiple sites effortlessly with role-based access and accurate updates.",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Auto Payroll Calculation",
      desc: "Payment calculations generated automatically based on attendance & working hours.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Role-Based Security",
      desc: "Highly secure system with Admin, Chief Engineer, and Site Engineer permissions.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reports",
      desc: "Get insights on workers, sites, attendance trends, and monthly summaries.",
    },
  ];

  return (
    <section className="w-full py-16 bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
          Powerful Features to Manage Your Workforce
        </h2>

        <p className="text-zinc-400 max-w-2xl mx-auto mb-12">
          Everything you need to run your construction workforce efficiently — all in one dashboard.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className={`p-6 border rounded-xl ${cardTints[i % cardTints.length]} hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-white mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-zinc-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}