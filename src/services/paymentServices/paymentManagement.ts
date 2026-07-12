/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// All worker payments. Guarded for ADMIN, CHIEF_ENGINEER and SITE_ENGINEER.
// Note: this endpoint also generates any missing DUE rows as a side effect of the read.
export async function getAllPayments(status?: string) {
  try {
    const response = await serverFetch.get(
      `/payments/all${status ? `?status=${status}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

// Starts a Stripe Checkout session and hands back the URL for the browser to redirect to.
// This runs on the server so the auth cookie is forwarded by serverFetch — the old modal
// called the backend straight from the browser, which cannot work once the frontend and
// backend sit on different domains (the cookie is set on the frontend's domain, and the
// backend's CORS never allowed the deployed origin).
export async function createPaymentCheckout(paymentId: string) {
  try {
    const response = await serverFetch.post("/payments/worker-pay", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result?.message || "Could not start the payment.",
      };
    }

    return { success: true, checkoutUrl: result.data?.checkoutUrl as string };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

// Puts a PENDING payment back to DUE after the payer cancels at Stripe, so it can be retried
// instead of being stranded in PENDING forever.
export async function releasePayment(paymentId: string) {
  try {
    const response = await serverFetch.patch(`/payments/release/${paymentId}`);
    const result = await response.json();

    return {
      success: !!result.success,
      message: result?.message || "Could not release the payment.",
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

// The logged-in worker's own payment records, scoped from the token. Unlike /payments/all
// this is a pure read and never writes to the payment ledger.
export async function getMyPayments(status?: string) {
  try {
    const response = await serverFetch.get(
      `/payments/my-payments${status ? `?status=${status}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}