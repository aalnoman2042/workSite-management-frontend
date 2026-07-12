import StatCard from "@/components/module/Dashboard/stats/statCard";
import SiteList from "@/components/module/sites/siteList";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { getallSites } from "@/services/siteServices/siteManagement";
import { Plus } from "lucide-react";
import Link from "next/link";

const ChiefEngineerSitesPage = async () => {
  const sites = await getallSites();

  const running = sites.filter((site) => site.status === "ACTIVE").length;
  const maintenance = sites.filter((site) => site.status === "UNDER_MAINTENANCE").length;
  const totalValue = sites.reduce((sum, site) => sum + (site.totalCost ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">All Sites</h1>
          <p className="mt-1 text-muted-foreground">
            Every construction site, running ones first.
          </p>
        </div>
        <Button asChild>
          <Link href="/chief-engineer/dashboard/create-site">
            <Plus className="mr-2 h-4 w-4" />
            New site
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Sites" value={sites.length} icon="Building2" />
        <StatCard
          label="Running"
          value={running}
          icon="Activity"
          tone="success"
          hint="Currently active"
        />
        <StatCard
          label="Under Maintenance"
          value={maintenance}
          icon="Wrench"
          tone={maintenance > 0 ? "warning" : "default"}
        />
        <StatCard
          label="Combined Value"
          value={formatCurrency(totalValue)}
          icon="Coins"
          hint="Sum of site costs"
        />
      </div>

      <SiteList sites={sites} canManage />
    </div>
  );
};

export default ChiefEngineerSitesPage;