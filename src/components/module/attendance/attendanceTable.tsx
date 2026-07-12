"use client";

import ManagementTable, { Column } from "@/components/shared/managementTable";
import { UserInfoCell } from "@/components/shared/cell/userInfoCell";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatEnumLabel } from "@/lib/formatters";
import { IAttendanceRow } from "@/types/attendanceRecord.interface";
import { Building2 } from "lucide-react";

// Columns hold accessor functions, so they can't be passed across the server/client
// boundary — they're built here, in the client component, exactly like workersColumns.
const buildColumns = (showWorker: boolean): Column<IAttendanceRow>[] => {
  const columns: Column<IAttendanceRow>[] = [];

  if (showWorker) {
    columns.push({
      header: "Worker",
      accessor: (row) => (
        <UserInfoCell
          name={row.worker.name}
          email={row.worker.email}
          photo={row.worker.profilePhoto}
        />
      ),
    });
  }

  columns.push(
    {
      header: "Site",
      accessor: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="font-medium">{row.site.name}</span>
            <span className="text-xs text-muted-foreground">
              {row.site.location || row.site.address}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (row) => <span className="text-sm">{formatDate(row.date)}</span>,
    },
    {
      header: "Status",
      accessor: (row) => (
        <Badge variant={row.status === "PRESENT" ? "secondary" : "destructive"}>
          {formatEnumLabel(row.status)}
        </Badge>
      ),
    },
    {
      header: "Day",
      accessor: (row) => (
        <span className="text-sm">{row.isHalfDay ? "Half day" : "Full day"}</span>
      ),
    },
    {
      header: "Hours",
      accessor: (row) => (
        <span className="text-sm">{row.hoursWorked ?? "—"}</span>
      ),
    },
    {
      header: "Payment",
      accessor: (row) => (
        <Badge variant={row.ispaid ? "secondary" : "outline"}>
          {row.ispaid ? "Paid" : "Unpaid"}
        </Badge>
      ),
    }
  );

  return columns;
};

interface AttendanceTableProps {
  records: IAttendanceRow[];
  showWorker?: boolean;
}

const AttendanceTable = ({ records, showWorker = false }: AttendanceTableProps) => {
  return (
    <ManagementTable
      data={records}
      columns={buildColumns(showWorker)}
      getRowKey={(row) => row.id}
      emptyMessage="No attendance records found."
    />
  );
};

export default AttendanceTable;