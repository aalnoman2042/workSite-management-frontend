export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create Site",
      description:
        "Set up your construction site in minutes and assign basic details.",
    },
    {
      id: 2,
      title: "Add Workers & Engineers",
      description:
        "Add your workforce and assign roles so the system can track everything.",
    },
    {
      id: 3,
      title: "Track Attendance & Payments",
      description:
        "Monitor attendance, work hours, and auto-calculate payments effortlessly.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 mb-12 text-sm sm:text-base">
          Your workflow simplified into 3 easy steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-black text-white rounded-2xl p-8 shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl shadow-md">
                {step.id}
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}