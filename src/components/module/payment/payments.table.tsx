"use client";

import { useState } from "react";
import PayModal from "./pay-modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaymentsTable = ({ payments }: { payments: any[] }) => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  return (
    <>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Worker Name</th>
            <th>Total Due</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.worker?.name}</td>
              <td>{payment.totalAmountDue}</td>
              <td>{payment.status}</td>
              <td>
                {payment.status !== "PAID" && (
                  <button
                    onClick={() => setSelectedPaymentId(payment.id)} // ✅ paymentId
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPaymentId && (
        <PayModal
          paymentId={selectedPaymentId} // ✅ paymentId pass
          onClose={() => setSelectedPaymentId(null)}
        />
      )}
    </>
  );
};

export default PaymentsTable;
