// Every entry says what the tool does *in this project*. A list of logos proves nothing; the
// job of this section is to show the reasoning behind each choice.
const groups = [
  {
    area: "Frontend",
    items: [
      { name: "Next.js 16", role: "App Router. Pages are Server Components, so data fetching and the API token stay on the server." },
      { name: "React 19", role: "Server Actions for every mutation — no API keys or cookies handled in the browser." },
      { name: "TypeScript 5.9", role: "End to end, sharing the shape of every API response." },
      { name: "Tailwind CSS 4", role: "Theme is defined once as design tokens; the marketing site and the app both read them." },
      { name: "shadcn / Radix", role: "Accessible primitives — dialogs, selects, accordions, tables." },
      { name: "Recharts", role: "Dashboard charts, coloured from the same tokens so they follow the theme." },
      { name: "Zod 4", role: "Validates form input before it reaches the API." },
    ],
  },
  {
    area: "Backend",
    items: [
      { name: "Express 5", role: "47 REST endpoints across 10 modules; 29 are role-guarded." },
      { name: "Prisma 6", role: "Type-safe queries over 11 models and 7 enums." },
      { name: "PostgreSQL (Neon)", role: "Serverless Postgres — workers, sites, attendance, assignments, payments." },
      { name: "JWT + bcrypt", role: "Access and refresh tokens in httpOnly cookies; passwords hashed." },
      { name: "jose", role: "Verifies the token in Next's Edge middleware, which is where route guarding happens." },
    ],
  },
  {
    area: "Integrations",
    items: [
      { name: "Stripe", role: "Checkout for worker wages. The webhook marks the payment paid and settles the attendance days behind it." },
      { name: "OpenRouter", role: "Plain-English queries over live data, with a fallback chain across free models." },
      { name: "Vercel", role: "Both the frontend and the API deploy from a push to main." },
    ],
  },
];

const TechStack = () => (
  <div className="grid gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-3">
    {groups.map((group) => (
      <div key={group.area} className="bg-card p-8">
        <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {group.area}
        </h3>
        <ul className="space-y-5">
          {group.items.map((item) => (
            <li key={item.name}>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.role}</p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default TechStack;
