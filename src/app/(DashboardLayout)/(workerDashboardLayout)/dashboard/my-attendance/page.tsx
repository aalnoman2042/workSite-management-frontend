import AttendanceTable from "@/components/module/attendance/attendanceTable";
import PaymentRecordsTable from "@/components/module/payment/paymentRecordsTable";
import StatCard from "@/components/module/Dashboard/stats/statCard";
import FilterField from "@/components/shared/filterField";
import RefreshButton from "@/components/shared/refreshButton";
import SelectFilter from "@/components/shared/selectFilter";
import TablePagination from "@/components/shared/tablePagination";
import { TableSkeleton } from "@/components/shared/tableSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, queryStringFormatter } from "@/lib/formatters";
import { getMyAttendance } from "@/services/attendanceServices/attendanceManagement";
import { getMyPayments } from "@/services/paymentServices/paymentManagement";
import {
  AttendanceStatuses,
  IAttendanceListResult,
  PaidFilterOptions,
} from "@/types/attendanceRecord.interface";
import { IWorkerPayment, PaymentStatuses } from "@/types/payment.interface";
import { Suspense } from "react";

// Everything on this page comes from /attendance/my-attendance and /payments/my-payments,
// which resolve the worker from the token — so this can only ever show the caller's own data.
const MyAttendancePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const { paymentStatus, ...attendanceParams } = searchParamsObj;
  const queryString = queryStringFormatter(attendanceParams);

  const [attendanceResult, paymentsResult] = await Promise.all([
    getMyAttendance(queryString),
    getMyPayments(typeof paymentStatus === "string" ? paymentStatus : undefined),
  ]);

  const attendance: IAttendanceListResult | undefined = attendanceResult?.data;
  const payments: IWorkerPayment[] = paymentsResult?.data ?? [];

  const records = attendance?.data ?? [];
  const meta = attendance?.meta;

  // Summarised from the payment ledger, not from the filtered attendance page.
  const totalDue = payments
    .filter((payment) => payment.status === "DUE")
    .reduce((sum, payment) => sum + payment.totalAmountDue, 0);
  const totalPaid = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((sum, payment) => sum + payment.amountPaid, 0);
  const awaiting = payments.filter((payment) => payment.status === "PENDING").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Attendance & Pay</h1>
        <p className="mt-1 text-muted-foreground">
          Every day you were marked on site, and what you are owed for it.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Amount Due to You"
          value={formatCurrency(totalDue)}
          icon="Wallet"
          tone={totalDue > 0 ? "warning" : "success"}
          hint={`${payments.filter((p) => p.status === "DUE").length} unpaid record(s)`}
        />
        <StatCard
          label="Total Received"
          value={formatCurrency(totalPaid)}
          icon="BadgeCheck"
          tone="success"
          hint={`${payments.filter((p) => p.status === "PAID").length} payment(s) settled`}
        />
        <StatCard
          label="Awaiting Payment"
          value={awaiting}
          icon="Clock"
          tone={awaiting > 0 ? "warning" : "default"}
          hint="Payment started, not yet confirmed"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance Records</CardTitle>
          <CardDescription>
            {meta ? `${meta.total} record(s) found.` : "Your attendance history."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <FilterField label="Attendance status">
              <SelectFilter paramName="status" options={AttendanceStatuses} />
            </FilterField>
            <FilterField label="Payment">
              <SelectFilter paramName="ispaid" options={PaidFilterOptions} />
            </FilterField>
            <div className="flex items-end">
              <RefreshButton variant="outline" />
            </div>
          </div>

          <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
            <AttendanceTable records={records} />
          </Suspense>

          {meta && meta.totalPages > 0 && (
            <TablePagination currentPage={meta.page} totalPages={meta.totalPages} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">My Payment Records</CardTitle>
          <CardDescription>
            Each payment raised against your attendance, and where it stands.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <FilterField label="Payment status">
              <SelectFilter paramName="paymentStatus" options={PaymentStatuses} />
            </FilterField>
          </div>

          <PaymentRecordsTable payments={payments} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAttendancePage;