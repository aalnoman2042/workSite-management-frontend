import { Badge } from "@/components/ui/badge";
import { formatEnumLabel } from "@/lib/formatters";
import { UserRole } from "@/lib/auth-utils";

interface DashboardHeaderProps {
  name: string;
  role: UserRole;
  description: string;
}

const DashboardHeader = ({ name, role, description }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {name}</h1>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <Badge variant="secondary" className="mt-1">
        {formatEnumLabel(role)}
      </Badge>
    </div>
  );
};

export default DashboardHeader;