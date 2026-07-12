import AttendanceTrendChart from "@/components/module/Dashboard/charts/attendanceTrendChart";
import ChartCard from "@/components/module/Dashboard/charts/chartCard";
import StatusDonutChart from "@/components/module/Dashboard/charts/statusDonutChart";
import DashboardHeader from "@/components/module/Dashboard/stats/dashboardHeader";
import StatCard from "@/components/module/Dashboard/stats/statCard";
import StatsUnavailable from "@/components/module/Dashboard/stats/statsUnavailable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, formatEnumLabel, getInitials } from "@/lib/formatters";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getSiteEngineerStats } from "@/services/stats/dashboardStats";
import { BackendAssignmentStatus } from "@/types/stats.interface";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";

const assignmentBadge: Record<BackendAssignmentStatus, "default" | "secondary" | "outline" | "destructive"> = {
  PENDING: "outline",
  COMPLETED: "secondary",
  CANCELLED: "destructive",
};

const SiteEngineerDashboardPage = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const stats = await getSiteEngineerStats();

  const description = "Your sites, your crew and the work you've assigned.";

  if (!stats) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          name={userInfo?.name ?? "Engineer"}
          role="SITE_ENGINEER"
          description={description}
        />
        <StatsUnavailable />
      </div>
    );
  }

  const { counts, assignmentsByStatus, attendanceTrend, payments, mySites, recentAssignments } =
    stats;

  return (
    <div className="space-y-6">
      <DashboardHeader
        name={userInfo?.name ?? "Engineer"}
        role="SITE_ENGINEER"
        description={description}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="My Sites"
          value={counts.mySites}
          icon="Building2"
          hint="Sites you work on"
        />
        <StatCard
          label="My Workers"
          value={counts.myWorkers}
          icon="Users"
          hint="Assigned or attended by you"
        />
        <StatCard
          label="Present Today"
          value={counts.presentToday}
          icon="UserCheck"
          tone="success"
          hint="Across your sites"
        />
        <StatCard
          label="Pending Tasks"
          value={counts.pendingAssignments}
          icon="Clock"
          tone={counts.pendingAssignments > 0 ? "warning" : "success"}
          hint={`${counts.completedAssignments} completed`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Attendance — Last 7 Days"
            description="Present vs absent, on your sites only."
          >
            <AttendanceTrendChart data={attendanceTrend} />
          </ChartCard>
        </div>

        <ChartCard title="My Tasks by Status" description="Assignments you created.">
          <StatusDonutChart data={assignmentsByStatus} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          label="Dues for My Workers"
          value={formatCurrency(payments.totalDue)}
          icon="Wallet"
          tone={payments.totalDue > 0 ? "danger" : "success"}
          hint={`${payments.dueCount} worker payment(s) due`}
        />
        <StatCard
          label="Total Tasks Assigned"
          value={counts.totalAssignments}
          icon="ClipboardList"
          hint="Since you joined"
        />
        <Card>
          <CardContent className="flex h-full flex-col justify-center gap-2 p-5">
            <p className="text-sm font-medium text-muted-foreground">Quick actions</p>
            <div className="flex flex-wrap gap-3 text-sm font-medium text-primary">
              <Link href="/site-engineer/dashboard/task-assign" className="hover:underline">
                Assign a task →
              </Link>
              <Link href="/site-engineer/dashboard/payments" className="hover:underline">
                Settle payments →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Sites</CardTitle>
            <CardDescription>Sites you have assigned work or marked attendance at.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {mySites.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                You have not been active on any site yet.
              </p>
            )}

            {mySites.map((site) => (
              <div
                key={site.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{site.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {site.location || site.address} · {site.workerCount} worker(s)
                  </p>
                </div>
                <Badge variant={site.status === "ACTIVE" ? "secondary" : "outline"}>
                  {formatEnumLabel(site.status)}
                </Badge>
              </div>
            ))}

            <Link
              href="/site-engineer/dashboard/sites"
              className="mt-2 block px-2 text-sm font-medium text-primary hover:underline"
            >
              View all sites →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Assignments</CardTitle>
            <CardDescription>The last 5 tasks you handed out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentAssignments.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                You have not assigned any tasks yet.
              </p>
            )}

            {recentAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {getInitials(assignment.worker.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{assignment.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {assignment.worker.name} · {assignment.site.name}
                    {assignment.dueDate && ` · due ${formatDate(assignment.dueDate)}`}
                  </p>
                </div>
                <Badge variant={assignmentBadge[assignment.status]}>
                  {formatEnumLabel(assignment.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteEngineerDashboardPage;