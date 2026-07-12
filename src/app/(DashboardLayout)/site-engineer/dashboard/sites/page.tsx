import StatCard from "@/components/module/Dashboard/stats/statCard";
import SiteList from "@/components/module/sites/siteList";
import { getSiteStats } from "@/components/module/sites/siteStats";
import { getMySites } from "@/services/siteServices/siteManagement";

// Scoped: the backend derives these from the caller's own assignments and attendance, so a
// site engineer only ever sees the sites they actually work on.
const SiteEngineerSitesPage = async () => {
  const sites = await getMySites();

  const running = sites.filter((site) => site.status === "ACTIVE").length;
  const presentToday = sites.reduce((sum, site) => sum + getSiteStats(site).presentToday, 0);
  const openTasks = sites.reduce((sum, site) => sum + getSiteStats(site).pendingAssignments, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Sites</h1>
        <p className="mt-1 text-muted-foreground">
          Sites you have assigned work or marked attendance at, running ones first.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="My Sites"
          value={sites.length}
          icon="Building2"
          hint={`${running} running`}
        />
        <StatCard
          label="Present Today"
          value={presentToday}
          icon="UserCheck"
          tone="success"
          hint="Across your sites"
        />
        <StatCard
          label="Open Tasks"
          value={openTasks}
          icon="ClipboardList"
          tone={openTasks > 0 ? "warning" : "success"}
          hint="Still pending"
        />
      </div>

      <SiteList
        sites={sites}
        emptyMessage="You have not been active on any site yet. Assign a task or mark attendance to see it here."
      />
    </div>
  );
};

export default SiteEngineerSitesPage;