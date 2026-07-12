"use client";

import { UserInfoCell } from "@/components/shared/cell/userInfoCell";
import ManagementTable, { Column } from "@/components/shared/managementTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatEnumLabel } from "@/lib/formatters";
import { releasePayment } from "@/services/paymentServices/paymentManagement";
import { IWorkerPayment } from "@/types/payment.interface";
import { BackendPaymentStatus } from "@/types/stats.interface";
import { Loader2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import PayModal from "./pay-modal";

const statusVariant: Record<
  BackendPaymentStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PAID: "secondary",
  DUE: "destructive",
  PENDING: "outline",
  FAILED: "destructive",
};

interface PaymentsTableProps {
  payments: IWorkerPayment[];
  canPay?: boolean;
}

const PaymentsTable = ({ payments = [], canPay = false }: PaymentsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [payingPayment, setPayingPayment] = useState<IWorkerPayment | null>(null);
  const [releasingId, setReleasingId] = useState<string | null>(null);

  const handleRelease = async (payment: IWorkerPayment) => {
    setReleasingId(payment.id);
    const result = await releasePayment(payment.id);
    setReleasingId(null);

    if (result.success) {
      toast.success(result.message);
      startTransition(() => router.refresh());
    } else {
      toast.error(result.message);
    }
  };

  const columns: Column<IWorkerPayment>[] = [
    {
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
    },
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
      accessor: (row) => <span className="text-sm">{formatCurrency(row.amountPaid)}</span>,
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
        <span className="text-sm">{row.paymentDate ? formatDate(row.paymentDate) : "—"}</span>
      ),
    },
    {
      header: "Paid By",
      accessor: (row) => <span className="text-sm">{row.paidBy?.name || "—"}</span>,
    },
  ];

  if (canPay) {
    columns.push({
      header: "Action",
      accessor: (row) => {
        if (row.status === "DUE" || row.status === "FAILED") {
          return (
            <Button size="sm" onClick={() => setPayingPayment(row)}>
              Pay
            </Button>
          );
        }

        // A checkout that was started and abandoned. Without a way back to DUE it would sit
        // here forever, so let the engineer put it back and retry.
        if (row.status === "PENDING") {
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRelease(row)}
              disabled={releasingId === row.id}
            >
              {releasingId === row.id ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <RotateCcw className="mr-2 h-3.5 w-3.5" />
              )}
              Release
            </Button>
          );
        }

        return <span className="text-sm text-muted-foreground">—</span>;
      },
    });
  }

  return (
    <>
      <ManagementTable
        data={payments}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyMessage="No payment records found."
      />

      <PayModal payment={payingPayment} onClose={() => setPayingPayment(null)} />
    </>
  );
};

export default PaymentsTable;