"use client";

import { useState } from "react";

interface PayModalProps {
  paymentId: string;
  onClose: () => void;
}

const PayModal = ({ paymentId, onClose }: PayModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/payments/worker-pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            paymentId, // ✅ ONLY this
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create payment session");
      }

      // ✅ Redirect to Stripe Checkout
      if (data?.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
      } else {
        throw new Error("Checkout URL not found");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          minWidth: 320,
          borderRadius: 6,
        }}
      >
        <h3>Confirm Payment</h3>

        <p>Are you sure you want to proceed with this payment?</p>

        {error && (
          <p style={{ color: "red", marginBottom: 10 }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handlePay} disabled={loading}>
            {loading ? "Redirecting..." : "Pay Now"}
          </button>

          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayModal;
