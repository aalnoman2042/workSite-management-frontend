import { BackendPaymentStatus } from "./stats.interface";
import { WorkerPosition } from "./worker.interface";

// Shape returned by /payments/all (supervisors) and /payments/my-payments (worker).
export interface IWorkerPayment {
    id: string;
    workerId: string;
    startDate: string;
    endDate: string;
    totalAmountDue: number;
    amountPaid: number;
    status: BackendPaymentStatus;
    paidByEngineerId?: string | null;
    paymentDate?: string | null;
    attendanceIds: string[];
    createdAt: string;
    updatedAt: string;

    // Only present on /payments/all — the worker's own view already knows who they are.
    worker?: {
        id: string;
        name: string;
        email: string;
        position?: WorkerPosition | null;
        profilePhoto?: string | null;
    };
    paidBy?: {
        id: string;
        name: string;
        email?: string;
    } | null;
}

export const PaymentStatuses: { label: string; value: BackendPaymentStatus }[] = [
    { label: "Due", value: "DUE" },
    { label: "Pending", value: "PENDING" },
    { label: "Paid", value: "PAID" },
    { label: "Failed", value: "FAILED" },
];