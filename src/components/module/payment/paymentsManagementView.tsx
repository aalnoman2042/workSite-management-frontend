import PaymentReturnHandler from "@/components/module/payment/paymentReturnHandler";
import PaymentsTable from "@/components/module/payment/payments.table";
import StatCard from "@/components/module/Dashboard/stats/statCard";
import FilterField from "@/components/shared/filterField";
import RefreshButton from "@/components/shared/refreshButton";
import SelectFilter from "@/components/shared/selectFilter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { getAllPayments } from "@/services/paymentServices/paymentManagement";
import { IWorkerPayment, PaymentStatuses } from "@/types/payment.interface";

interface PaymentsManagementViewProps {
  searchParams: { [key: string]: string | string[] | undefined };
  // Only a SITE_ENGINEER can actually settle a payment — the backend guards
  // /payments/worker-pay with auth(SITE_ENGINEER). Admin and chief engineer read only.
  canPay?: boolean;
}

const PaymentsManagementView = async ({
  searchParams,
  canPay = false,
}: PaymentsManagementViewProps) => {
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;

  const result = await getAllPayments(status);

  // The old page did `payments={res?.data}` and then `payments.map(...)`, which threw a
  // TypeError whenever the request failed. Default to an empty list instead.
  const payments: IWorkerPayment[] = Array.isArray(result?.data) ? result.data : [];
  const failed = !result?.success;

  const totalDue = payments
    .filter((payment) => payment.status === "DUE")
    .reduce((sum, payment) => sum + payment.totalAmountDue, 0);
  const totalPaid = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((sum, payment) => sum + payment.amountPaid, 0);
  const pendingCount = payments.filter((payment) => payment.status === "PENDING").length;
  const dueCount = payments.filter((payment) => payment.status === "DUE").length;

  return (
    <div className="space-y-6">
      <PaymentReturnHandler canPay={canPay} />

      <div>
        <h1 className="text-3xl font-bold">Worker Payments</h1>
        <p className="mt-1 text-muted-foreground">
          {canPay
            ? "Settle outstanding worker dues through Stripe."
            : "Worker payments and where each one stands."}
        </p>
      </div>

      {failed && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="p-4 text-sm">
            <span className="font-medium">Could not load payments.</span>{" "}
            <span className="text-muted-foreground">
              {result?.message || "Please refresh and try again."}
            </span>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Outstanding Dues"
          value={formatCurrency(totalDue)}
          icon="Wallet"
          tone={totalDue > 0 ? "danger" : "success"}
          hint={`${dueCount} payment(s) due`}
        />
        <StatCard
          label="Total Paid"
          value={formatCurrency(totalPaid)}
          icon="BadgeCheck"
          tone="success"
          hint={`${payments.filter((p) => p.status === "PAID").length} settled`}
        />
        <StatCard
          label="Awaiting Confirmation"
          value={pendingCount}
          icon="Clock"
          tone={pendingCount > 0 ? "warning" : "default"}
          hint={canPay ? "Release to retry" : "Checkout started"}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Records</CardTitle>
          <CardDescription>
            {payments.length} record(s).{" "}
            {canPay && "Pay a due payment, or release a stuck pending one to retry it."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FilterField label="Payment status">
              <SelectFilter paramName="status" options={PaymentStatuses} />
            </FilterField>
            <div className="flex items-end">
              <RefreshButton variant="outline" />
            </div>
          </div>

          <PaymentsTable payments={payments} canPay={canPay} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsManagementView;