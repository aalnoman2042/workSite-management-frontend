import AttendanceTrendChart from "@/components/module/Dashboard/charts/attendanceTrendChart";
import ChartCard from "@/components/module/Dashboard/charts/chartCard";
import StatusDonutChart from "@/components/module/Dashboard/charts/statusDonutChart";
import DashboardHeader from "@/components/module/Dashboard/stats/dashboardHeader";
import StatCard from "@/components/module/Dashboard/stats/statCard";
import StatsUnavailable from "@/components/module/Dashboard/stats/statsUnavailable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, formatEnumLabel, getInitials } from "@/lib/formatters";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getChiefEngineerStats } from "@/services/stats/dashboardStats";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";

const ChiefEngineerDashboardPage = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const stats = await getChiefEngineerStats();

  const description = "Oversight of every site, the workforce and outstanding dues.";

  if (!stats) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          name={userInfo?.name ?? "Chief Engineer"}
          role="CHIEF_ENGINEER"
          description={description}
        />
        <StatsUnavailable />
      </div>
    );
  }

  const { counts, sitesByStatus, attendanceTrend, payments, pendingWorkers } = stats;

  const completionRate = counts.totalAssignments
    ? Math.round((counts.completedAssignments / counts.totalAssignments) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <DashboardHeader
        name={userInfo?.name ?? "Chief Engineer"}
        role="CHIEF_ENGINEER"
        description={description}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active Sites"
          value={counts.activeSites}
          icon="Building2"
          hint={`${counts.totalSites} site(s) in total`}
        />
        <StatCard
          label="Workforce"
          value={counts.totalWorkers}
          icon="Users"
          hint="Across all sites"
        />
        <StatCard
          label="Pending Approval"
          value={counts.pendingApproval}
          icon="UserCheck"
          tone={counts.pendingApproval > 0 ? "warning" : "success"}
          hint={counts.pendingApproval > 0 ? "Needs your review" : "All caught up"}
        />
        <StatCard
          label="Outstanding Dues"
          value={formatCurrency(payments.totalDue)}
          icon="Wallet"
          tone={payments.totalDue > 0 ? "danger" : "success"}
          hint={`${payments.dueCount} unpaid record(s)`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Attendance — Last 7 Days"
            description="Present vs absent across every site."
          >
            <AttendanceTrendChart data={attendanceTrend} />
          </ChartCard>
        </div>

        <ChartCard title="Sites by Status">
          <StatusDonutChart data={sitesByStatus} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task Completion</CardTitle>
            <CardDescription>
              {counts.completedAssignments} of {counts.totalAssignments} assignments completed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{completionRate}%</span>
              <span className="text-sm text-muted-foreground">
                {counts.totalAssignments - counts.completedAssignments} remaining
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workers Awaiting Approval</CardTitle>
            <CardDescription>Approve them before they can be assigned work.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {pendingWorkers.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No workers waiting for approval.
              </p>
            )}

            {pendingWorkers.map((worker) => (
              <div
                key={worker.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {getInitials(worker.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{worker.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatEnumLabel(worker.position)} · applied {formatDate(worker.createdAt)}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/chief-engineer/dashboard/workers"
              className="mt-2 block px-2 text-sm font-medium text-primary hover:underline"
            >
              Manage workers →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChiefEngineerDashboardPage;