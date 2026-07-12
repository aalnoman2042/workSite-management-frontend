"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/formatters";
import { createPaymentCheckout } from "@/services/paymentServices/paymentManagement";
import { IWorkerPayment } from "@/types/payment.interface";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PayModalProps {
  payment: IWorkerPayment | null;
  onClose: () => void;
}

const PayModal = ({ payment, onClose }: PayModalProps) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePay = async () => {
    if (!payment) return;

    setIsRedirecting(true);

    // The checkout session is created on the server, so serverFetch can forward the auth
    // cookie. The old modal called the backend straight from the browser, which cannot work
    // once frontend and backend sit on different domains.
    const result = await createPaymentCheckout(payment.id);

    if (!result.success || !result.checkoutUrl) {
      toast.error(result.message || "Could not start the payment.");
      setIsRedirecting(false);
      return;
    }

    window.location.href = result.checkoutUrl;
  };

  return (
    <Dialog open={!!payment} onOpenChange={(open) => !open && !isRedirecting && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm payment</DialogTitle>
          <DialogDescription>
            You are about to pay {payment?.worker?.name ?? "this worker"}. Stripe will open to
            complete the payment.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount due</span>
            <span className="text-xl font-bold">{formatCurrency(payment?.totalAmountDue)}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isRedirecting}>
            Cancel
          </Button>
          <Button onClick={handlePay} disabled={isRedirecting}>
            {isRedirecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRedirecting ? "Redirecting to Stripe..." : "Pay now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayModal;