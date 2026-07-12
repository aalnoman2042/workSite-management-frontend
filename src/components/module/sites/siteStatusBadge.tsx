import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SiteStatus } from "@/types/site.interface";

// Colour carries the meaning here, so it must survive dark mode.
const styles: Record<SiteStatus, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-transparent",
  UNDER_MAINTENANCE: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-transparent",
  INACTIVE: "bg-muted text-muted-foreground border-transparent",
  CLOSED: "bg-destructive/15 text-destructive border-transparent",
};

const labels: Record<SiteStatus, string> = {
  ACTIVE: "Running",
  UNDER_MAINTENANCE: "Under Maintenance",
  INACTIVE: "Inactive",
  CLOSED: "Closed",
};

const SiteStatusBadge = ({ status, className }: { status: SiteStatus; className?: string }) => (
  <Badge variant="outline" className={cn(styles[status], className)}>
    {labels[status]}
  </Badge>
);

export default SiteStatusBadge;