import StatCard from "@/components/module/Dashboard/stats/statCard";
import SiteList from "@/components/module/sites/siteList";
import { formatCurrency } from "@/lib/formatters";
import { getallSites } from "@/services/siteServices/siteManagement";

// Read-only: creating, editing and deleting sites is auth(CHIEF_ENGINEER) on the backend,
// so no manage actions are offered here.
const AdminSitesPage = async () => {
  const sites = await getallSites();

  const running = sites.filter((site) => site.status === "ACTIVE").length;
  const closed = sites.filter((site) => site.status === "CLOSED").length;
  const totalValue = sites.reduce((sum, site) => sum + (site.totalCost ?? 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Sites</h1>
        <p className="mt-1 text-muted-foreground">
          Organisation-wide view of every site, running ones first.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Sites" value={sites.length} icon="Building2" />
        <StatCard label="Running" value={running} icon="Activity" tone="success" />
        <StatCard label="Closed" value={closed} icon="Ban" />
        <StatCard
          label="Combined Value"
          value={formatCurrency(totalValue)}
          icon="Coins"
          hint="Sum of site costs"
        />
      </div>

      <SiteList sites={sites} />
    </div>
  );
};

export default AdminSitesPage;