"use client";

import { releasePayment } from "@/services/paymentServices/paymentManagement";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { toast } from "sonner";

// Stripe sends the payer back here with ?payment=success or ?payment=cancelled&paymentId=…
// On a cancel we hand the payment back to DUE, otherwise it stays PENDING forever and can
// never be retried. The webhook's checkout.session.expired covers the case where the payer
// never comes back at all.
const PaymentReturnHandlerContent = ({ canPay }: { canPay: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const outcome = searchParams.get("payment");
  const paymentId = searchParams.get("paymentId");

  // React runs effects twice in dev StrictMode, and we do not want to fire the release
  // (or the toast) a second time.
  const handled = useRef(false);

  useEffect(() => {
    if (!outcome || handled.current) return;
    handled.current = true;

    const clearQuery = () => router.replace(window.location.pathname);

    if (outcome === "success") {
      toast.success("Payment completed. It will show as paid once Stripe confirms it.");
      clearQuery();
      router.refresh();
      return;
    }

    if (outcome === "cancelled") {
      if (paymentId && canPay) {
        releasePayment(paymentId).then((result) => {
          toast.info(
            result.success
              ? "Payment cancelled. It is due again and can be retried."
              : "Payment cancelled."
          );
          clearQuery();
          router.refresh();
        });
        return;
      }

      toast.info("Payment cancelled.");
      clearQuery();
    }
  }, [outcome, paymentId, canPay, router]);

  return null;
};

const PaymentReturnHandler = ({ canPay = false }: { canPay?: boolean }) => (
  <Suspense fallback={null}>
    <PaymentReturnHandlerContent canPay={canPay} />
  </Suspense>
);

export default PaymentReturnHandler;