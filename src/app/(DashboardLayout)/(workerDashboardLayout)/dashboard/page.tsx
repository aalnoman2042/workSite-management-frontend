import AttendanceTrendChart from "@/components/module/Dashboard/charts/attendanceTrendChart";
import ChartCard from "@/components/module/Dashboard/charts/chartCard";
import DashboardHeader from "@/components/module/Dashboard/stats/dashboardHeader";
import StatCard from "@/components/module/Dashboard/stats/statCard";
import StatsUnavailable from "@/components/module/Dashboard/stats/statsUnavailable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, formatEnumLabel } from "@/lib/formatters";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getWorkerStats } from "@/services/stats/dashboardStats";
import { BackendPaymentStatus } from "@/types/stats.interface";
import { UserInfo } from "@/types/user.interface";

const paymentBadge: Record<BackendPaymentStatus, "default" | "secondary" | "outline" | "destructive"> = {
  PAID: "secondary",
  DUE: "destructive",
  PENDING: "outline",
  FAILED: "destructive",
};

const WorkerDashboardPage = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const stats = await getWorkerStats();

  const description = "Your tasks, attendance and earnings.";

  if (!stats) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          name={userInfo?.name ?? "Worker"}
          role="WORKER"
          description={description}
        />
        <StatsUnavailable />
      </div>
    );
  }

  const { profile, counts, attendanceTrend, earnings, upcomingAssignments, recentPayments } = stats;

  return (
    <div className="space-y-6">
      <DashboardHeader name={profile.name} role="WORKER" description={description} />

      {!profile.approved && (
        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardContent className="p-4 text-sm">
            <span className="font-medium">Your account is awaiting approval.</span>{" "}
            <span className="text-muted-foreground">
              You will start receiving task assignments once an engineer approves you.
            </span>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Pending Tasks"
          value={counts.pendingAssignments}
          icon="ClipboardList"
          tone={counts.pendingAssignments > 0 ? "warning" : "success"}
          hint={`${counts.completedAssignments} completed`}
        />
        <StatCard
          label="Present This Month"
          value={counts.presentThisMonth}
          icon="CalendarCheck"
          tone="success"
          hint={`${counts.halfDaysThisMonth} half-day(s)`}
        />
        <StatCard
          label="Absent This Month"
          value={counts.absentThisMonth}
          icon="CalendarX"
          tone={counts.absentThisMonth > 0 ? "danger" : "default"}
          hint="Days marked absent"
        />
        <StatCard
          label="Daily Rate"
          value={formatCurrency(profile.dailyRate)}
          icon="Coins"
          hint={formatEnumLabel(profile.position)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Amount Due to You"
          value={formatCurrency(earnings.totalDue)}
          icon="Wallet"
          tone={earnings.totalDue > 0 ? "warning" : "success"}
          hint={`${earnings.dueCount} unpaid record(s)`}
        />
        <StatCard
          label="Total Earned"
          value={formatCurrency(earnings.totalPaid)}
          icon="BadgeCheck"
          tone="success"
          hint={`${earnings.paidCount} payment(s) received`}
        />
      </div>

      <ChartCard
        title="My Attendance — Last 7 Days"
        description="How your attendance was marked at your sites."
      >
        <AttendanceTrendChart data={attendanceTrend} />
      </ChartCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Tasks</CardTitle>
            <CardDescription>Pending work assigned to you, soonest first.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {upcomingAssignments.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                You have no pending tasks. Nice work.
              </p>
            )}

            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="rounded-lg px-2 py-2.5 hover:bg-accent">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{assignment.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {assignment.site.name} · assigned by {assignment.assignedBy.name}
                    </p>
                  </div>
                  {assignment.dueDate && (
                    <Badge variant="outline" className="shrink-0">
                      Due {formatDate(assignment.dueDate)}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Payments</CardTitle>
            <CardDescription>Your last 5 payment records.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentPayments.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No payment records yet.
              </p>
            )}

            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {formatCurrency(
                      payment.status === "PAID" ? payment.amountPaid : payment.totalAmountDue
                    )}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatDate(payment.startDate)} – {formatDate(payment.endDate)}
                  </p>
                </div>
                <Badge variant={paymentBadge[payment.status]}>
                  {formatEnumLabel(payment.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboardPage;