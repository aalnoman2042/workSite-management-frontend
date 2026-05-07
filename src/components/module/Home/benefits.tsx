const cardTints = [
  "bg-purple-950/40 border-purple-900/40",
  "bg-emerald-950/40 border-emerald-900/40",
  "bg-amber-950/40 border-amber-900/40",
  "bg-rose-950/40 border-rose-900/40",
];

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Reduce Manual Errors",
      desc: "Automated workflows ensure accuracy in attendance, payments and site management.",
      icon: "✔",
    },
    {
      title: "Real-time Monitoring",
      desc: "Track worker activities, site updates and attendance instantly.",
      icon: "⏱",
    },
    {
      title: "Secure & Trusted",
      desc: "Role-based access and encrypted data keep everything protected.",
      icon: "🔒",
    },
    {
      title: "Fast & Easy to Use",
      desc: "Clean UI designed for speed and efficiency across all devices.",
      icon: "⚡",
    },
  ];

  return (
    <section className="w-full bg-transparent px-6 sm:px-12 lg:px-20 py-20 text-white">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Why Choose Our System?</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          A clean, powerful and reliable platform built for managing construction workforce efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className={`group border rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${cardTints[idx % cardTints.length]}`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-zinc-300 text-sm sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}