// Hand-authored SVG rather than a chart library: it is a fixed diagram, so it costs no JS,
// and it uses the theme tokens directly so it follows light/dark and the brand accent.
const Node = ({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  accent?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={10}
      fill={accent ? "var(--primary)" : "var(--card)"}
      stroke={accent ? "var(--primary)" : "var(--border)"}
    />
    <text
      x={x + w / 2}
      y={subtitle ? y + h / 2 - 6 : y + h / 2 + 5}
      textAnchor="middle"
      fontSize="15"
      fontWeight="600"
      fill={accent ? "var(--primary-foreground)" : "var(--foreground)"}
    >
      {title}
    </text>
    {subtitle && (
      <text
        x={x + w / 2}
        y={y + h / 2 + 15}
        textAnchor="middle"
        fontSize="12.5"
        fill={accent ? "var(--primary-foreground)" : "var(--muted-foreground)"}
      >
        {subtitle}
      </text>
    )}
  </g>
);

const Label = ({ x, y, children }: { x: number; y: number; children: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
    {children}
  </text>
);

const ArchitectureDiagram = () => (
  <div className="overflow-x-auto rounded-xl border bg-muted/30 p-4 sm:p-8">
    <svg
      viewBox="0 0 960 610"
      className="mx-auto h-auto w-full min-w-[720px]"
      role="img"
      aria-label="System architecture: a Next.js client talks through Edge middleware to an Express API, which uses Prisma and PostgreSQL, and integrates Stripe and an OpenRouter LLM."
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      {/* client */}
      <Node x={330} y={20} w={300} h={70} title="Browser" subtitle="httpOnly JWT cookie · no secrets client-side" />
      <line x1={480} y1={90} x2={480} y2={128} stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />

      <Node
        x={280}
        y={130}
        w={400}
        h={80}
        title="Next.js 16 · App Router"
        subtitle="Server Components · Server Actions · Recharts"
      />
      <Label x={480} y={232}>
        Edge middleware (jose) — verifies the JWT, routes each role to its own dashboard
      </Label>
      <line x1={480} y1={242} x2={480} y2={278} stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* api */}
      <Node
        x={280}
        y={280}
        w={400}
        h={80}
        title="Express 5 API"
        subtitle="47 endpoints · 29 role-guarded"
        accent
      />

      {/* stripe */}
      <Node x={730} y={270} w={210} h={70} title="Stripe" subtitle="Checkout + webhook" />
      <line x1={680} y1={305} x2={726} y2={305} stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />
      <path
        d="M 835 340 L 835 385 L 620 385"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd="url(#arrow)"
      />
      <text x={828} y={404} textAnchor="end" fontSize="12" fill="var(--primary)">
        webhook → marks the attendance days paid
      </text>

      {/* ai */}
      <Node x={20} y={270} w={210} h={70} title="OpenRouter" subtitle="LLM · plain-English queries" />
      <line x1={276} y1={305} x2={234} y2={305} stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* data */}
      <line x1={480} y1={360} x2={480} y2={428} stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />
      {/* No "migrations" claim: this project has no prisma/migrations folder — the schema is
          pushed. Say what is true. */}
      <Node x={330} y={430} w={300} h={65} title="Prisma 6" subtitle="type-safe queries + schema" />
      <line x1={480} y1={495} x2={480} y2={528} stroke="var(--border)" strokeWidth="2" markerEnd="url(#arrow)" />
      <Node x={330} y={530} w={300} h={65} title="PostgreSQL · Neon" subtitle="11 models · 7 enums" />
    </svg>
  </div>
);

export default ArchitectureDiagram;
