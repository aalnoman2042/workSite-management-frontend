import ChartCard from "@/components/module/Dashboard/charts/chartCard";
import CountBarChart from "@/components/module/Dashboard/charts/countBarChart";
import StatusDonutChart from "@/components/module/Dashboard/charts/statusDonutChart";
import DashboardHeader from "@/components/module/Dashboard/stats/dashboardHeader";
import StatCard from "@/components/module/Dashboard/stats/statCard";
import StatsUnavailable from "@/components/module/Dashboard/stats/statsUnavailable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, formatEnumLabel, getInitials } from "@/lib/formatters";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAdminStats } from "@/services/stats/dashboardStats";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";

const AdminDashboardPage = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const stats = await getAdminStats();

  if (!stats) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          name={userInfo?.name ?? "Admin"}
          role="ADMIN"
          description="Organisation-wide overview of people, sites and payments."
        />
        <StatsUnavailable />
      </div>
    );
  }

  const { counts, sitesByStatus, workersByPosition, payments, recentWorkers } = stats;

  return (
    <div className="space-y-6">
      <DashboardHeader
        name={userInfo?.name ?? "Admin"}
        role="ADMIN"
        description="Organisation-wide overview of people, sites and payments."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Workers"
          value={counts.totalWorkers}
          icon="Users"
          hint={`${counts.approvedWorkers} approved`}
        />
        <StatCard
          label="Pending Approval"
          value={counts.pendingWorkers}
          icon="UserCheck"
          tone={counts.pendingWorkers > 0 ? "warning" : "success"}
          hint={counts.pendingWorkers > 0 ? "Waiting on review" : "All caught up"}
        />
        <StatCard
          label="Engineers"
          value={counts.siteEngineers + counts.chiefEngineers}
          icon="HardHat"
          hint={`${counts.siteEngineers} site · ${counts.chiefEngineers} chief`}
        />
        <StatCard
          label="Sites"
          value={counts.totalSites}
          icon="Building2"
          hint={`${counts.activeSites} active`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Outstanding Dues"
          value={formatCurrency(payments.totalDue)}
          icon="Wallet"
          tone={payments.totalDue > 0 ? "danger" : "success"}
          hint={`${payments.dueCount} unpaid record(s)`}
        />
        <StatCard
          label="Total Paid"
          value={formatCurrency(payments.totalPaid)}
          icon="BadgeCheck"
          tone="success"
          hint={`${payments.paidCount} settled record(s)`}
        />
        <StatCard
          label="Banned Workers"
          value={counts.bannedWorkers}
          icon="UserX"
          tone={counts.bannedWorkers > 0 ? "danger" : "default"}
          hint="Blocked from assignments"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Workforce by Position" description="Active (non-deleted) workers only.">
          <CountBarChart data={workersByPosition} />
        </ChartCard>

        <ChartCard title="Sites by Status" description="Every site across the organisation.">
          <StatusDonutChart data={sitesByStatus} />
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recently Registered Workers</CardTitle>
          <CardDescription>The 5 newest workers to join.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {recentWorkers.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">No workers yet.</p>
          )}

          {recentWorkers.map((worker) => (
            <div
              key={worker.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {getInitials(worker.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{worker.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatEnumLabel(worker.position)} · joined {formatDate(worker.createdAt)}
                </p>
              </div>
              <Badge variant={worker.approved ? "secondary" : "outline"}>
                {worker.approved ? "Approved" : "Pending"}
              </Badge>
            </div>
          ))}

          <Link
            href="/admin/dashboard/all-workers"
            className="mt-2 block px-2 text-sm font-medium text-primary hover:underline"
          >
            View all workers →
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;