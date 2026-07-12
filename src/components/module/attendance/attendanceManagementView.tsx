import AttendanceTable from "@/components/module/attendance/attendanceTable";
import PaymentRecordsTable from "@/components/module/payment/paymentRecordsTable";
import FilterField from "@/components/shared/filterField";
import RefreshButton from "@/components/shared/refreshButton";
import SearchFilter from "@/components/shared/searchFilter";
import SelectFilter from "@/components/shared/selectFilter";
import TablePagination from "@/components/shared/tablePagination";
import { TableSkeleton } from "@/components/shared/tableSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllAttendance } from "@/services/attendanceServices/attendanceManagement";
import { getAllPayments } from "@/services/paymentServices/paymentManagement";
import {
  AttendanceStatuses,
  IAttendanceListResult,
  PaidFilterOptions,
} from "@/types/attendanceRecord.interface";
import { IWorkerPayment, PaymentStatuses } from "@/types/payment.interface";
import { Suspense } from "react";

// Shared by the admin, chief engineer and site engineer attendance pages — all three see
// every worker's records, so the only difference between them is the route they live on.
const AttendanceManagementView = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // The payments panel has its own status filter, so keep it out of the attendance query.
  const { paymentStatus, ...attendanceParams } = searchParams;
  const queryString = queryStringFormatter(attendanceParams);

  const [attendanceResult, paymentsResult] = await Promise.all([
    getAllAttendance(queryString),
    getAllPayments(typeof paymentStatus === "string" ? paymentStatus : undefined),
  ]);

  const attendance: IAttendanceListResult | undefined = attendanceResult?.data;
  const payments: IWorkerPayment[] = paymentsResult?.data ?? [];

  const records = attendance?.data ?? [];
  const meta = attendance?.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance & Payments</h1>
        <p className="mt-1 text-muted-foreground">
          Attendance across every site, and the payment records behind it.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance Records</CardTitle>
          <CardDescription>
            {meta ? `${meta.total} record(s) found.` : "Filter by worker, status or payment."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FilterField label="Search">
              <SearchFilter paramName="searchTerm" placeholder="Worker or site..." />
            </FilterField>
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

          <Suspense fallback={<TableSkeleton columns={7} rows={10} />}>
            <AttendanceTable records={records} showWorker />
          </Suspense>

          {meta && meta.totalPages > 0 && (
            <TablePagination currentPage={meta.page} totalPages={meta.totalPages} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Records</CardTitle>
          <CardDescription>
            Worker payments and where each one stands. {payments.length} record(s).
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FilterField label="Payment status">
              <SelectFilter paramName="paymentStatus" options={PaymentStatuses} />
            </FilterField>
          </div>

          <PaymentRecordsTable payments={payments} showWorker />
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagementView;