import { Card, CardContent } from "@/components/ui/card";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";

export type StatTone = "default" | "success" | "warning" | "danger";

const toneStyles: Record<StatTone, string> = {
  default: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  danger: "bg-destructive/10 text-destructive",
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  hint?: string;
  tone?: StatTone;
}

const StatCard = ({ label, value, icon, hint, tone = "default" }: StatCardProps) => {
  const Icon = getIconComponent(icon);

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {hint && <p className="truncate text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", toneStyles[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;