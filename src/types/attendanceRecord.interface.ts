import { AttendanceStatus } from "./attendance.interface";
import { WorkerPosition } from "./worker.interface";

// The row shape actually returned by /attendance/all-attendance and /attendance/my-attendance.
// IAttendance in attendance.interface.ts models the full Prisma relation graph (including a
// siteEngineer the API never sends), so it can't be used for these responses.
export interface IAttendanceRow {
    id: string;
    workerId: string;
    siteId: string;
    siteEngineerId: string;
    date: string;
    status: AttendanceStatus;
    hoursWorked?: number | null;
    isHalfDay: boolean;
    ispaid: boolean;
    createdAt: string;
    updatedAt: string;

    worker: {
        id: string;
        name: string;
        email: string;
        position?: WorkerPosition | null;
        profilePhoto?: string | null;
        dailyRate?: number | null;
        halfDayRate?: number | null;
    };
    site: {
        id: string;
        name: string;
        location?: string | null;
        address: string;
    };
}

export interface IPaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IAttendanceListResult {
    meta: IPaginationMeta;
    data: IAttendanceRow[];
}

export const AttendanceStatuses: { label: string; value: AttendanceStatus }[] = [
    { label: "Present", value: "PRESENT" },
    { label: "Absent", value: "ABSENT" },
];

export const PaidFilterOptions: { label: string; value: string }[] = [
    { label: "Paid", value: "true" },
    { label: "Unpaid", value: "false" },
];