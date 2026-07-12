import { Check, Minus, User } from "lucide-react";

// Mirrors the guards actually declared on the API routes — this is not an aspirational table.
// "own" means the record is resolved from the caller's JWT, so the id cannot be spoofed by
// changing a query parameter.
type Access = "full" | "own" | "none";

const rows: { capability: string; admin: Access; chief: Access; site: Access; worker: Access }[] = [
  { capability: "Organisation-wide dashboard", admin: "full", chief: "full", site: "none", worker: "none" },
  { capability: "Create engineers", admin: "full", chief: "none", site: "none", worker: "none" },
  { capability: "Create & edit sites", admin: "none", chief: "full", site: "none", worker: "none" },
  { capability: "Approve workers", admin: "full", chief: "full", site: "none", worker: "none" },
  { capability: "Assign tasks", admin: "none", chief: "none", site: "full", worker: "none" },
  { capability: "Mark attendance", admin: "none", chief: "none", site: "full", worker: "none" },
  { capability: "View attendance", admin: "full", chief: "full", site: "full", worker: "own" },
  { capability: "Settle payments (Stripe)", admin: "none", chief: "none", site: "full", worker: "none" },
  { capability: "View payments", admin: "full", chief: "full", site: "full", worker: "own" },
  { capability: "View sites", admin: "full", chief: "full", site: "own", worker: "none" },
  { capability: "View tasks", admin: "full", chief: "full", site: "own", worker: "own" },
  { capability: "AI assistant", admin: "full", chief: "full", site: "none", worker: "none" },
];

const Cell = ({ value }: { value: Access }) => {
  if (value === "full")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Check className="h-3.5 w-3.5" />
      </span>
    );

  if (value === "own")
    return (
      <span
        className="inline-flex h-6 items-center gap-1 rounded-md bg-muted px-2 text-xs font-medium text-foreground"
        title="Only their own records — resolved from the JWT, not from a request parameter"
      >
        <User className="h-3 w-3" />
        own
      </span>
    );

  return <Minus className="mx-auto h-3.5 w-3.5 text-muted-foreground/40" />;
};

const RoleMatrix = () => (
  <div className="overflow-x-auto rounded-xl border">
    <table className="w-full min-w-[640px] text-sm">
      <thead>
        <tr className="border-b bg-muted/50">
          <th className="px-5 py-3 text-left font-medium">Capability</th>
          {["Admin", "Chief Eng.", "Site Eng.", "Worker"].map((role) => (
            <th key={role} className="px-4 py-3 text-center font-medium">
              {role}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.capability} className="border-b last:border-0 hover:bg-muted/30">
            <td className="px-5 py-3 text-muted-foreground">{row.capability}</td>
            <td className="px-4 py-3 text-center">
              <Cell value={row.admin} />
            </td>
            <td className="px-4 py-3 text-center">
              <Cell value={row.chief} />
            </td>
            <td className="px-4 py-3 text-center">
              <Cell value={row.site} />
            </td>
            <td className="px-4 py-3 text-center">
              <Cell value={row.worker} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RoleMatrix;
