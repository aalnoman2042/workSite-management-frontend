"use client";

import { UserInfoCell } from "@/components/shared/cell/userInfoCell";
import ManagementTable, { Column } from "@/components/shared/managementTable";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, formatEnumLabel } from "@/lib/formatters";
import { BackendPaymentStatus } from "@/types/stats.interface";
import { IWorkerPayment } from "@/types/payment.interface";

const statusVariant: Record<
  BackendPaymentStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PAID: "secondary",
  DUE: "destructive",
  PENDING: "outline",
  FAILED: "destructive",
};

const buildColumns = (showWorker: boolean): Column<IWorkerPayment>[] => {
  const columns: Column<IWorkerPayment>[] = [];

  if (showWorker) {
    columns.push({
      header: "Worker",
      accessor: (row) =>
        row.worker ? (
          <UserInfoCell
            name={row.worker.name}
            email={row.worker.email}
            photo={row.worker.profilePhoto}
          />
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        ),
    });
  }

  columns.push(
    {
      header: "Period",
      accessor: (row) => (
        <span className="text-sm">
          {formatDate(row.startDate)} – {formatDate(row.endDate)}
        </span>
      ),
    },
    {
      header: "Amount Due",
      accessor: (row) => (
        <span className="text-sm font-medium">{formatCurrency(row.totalAmountDue)}</span>
      ),
    },
    {
      header: "Amount Paid",
      accessor: (row) => (
        <span className="text-sm">{formatCurrency(row.amountPaid)}</span>
      ),
    },
    {
      header: "Status",
      accessor: (row) => (
        <Badge variant={statusVariant[row.status]}>{formatEnumLabel(row.status)}</Badge>
      ),
    },
    {
      header: "Paid On",
      accessor: (row) => (
        <span className="text-sm">
          {row.paymentDate ? formatDate(row.paymentDate) : "—"}
        </span>
      ),
    },
    {
      header: "Paid By",
      accessor: (row) => (
        <span className="text-sm">{row.paidBy?.name || "—"}</span>
      ),
    }
  );

  return columns;
};

interface PaymentRecordsTableProps {
  payments: IWorkerPayment[];
  showWorker?: boolean;
}

const PaymentRecordsTable = ({ payments, showWorker = false }: PaymentRecordsTableProps) => {
  return (
    <ManagementTable
      data={payments}
      columns={buildColumns(showWorker)}
      getRowKey={(row) => row.id}
      emptyMessage="No payment records found."
    />
  );
};

export default PaymentRecordsTable;