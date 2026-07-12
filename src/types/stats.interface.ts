import { WorkerPosition } from "./worker.interface";

// These mirror the backend Prisma enums. The older interfaces in site.interface.ts and
// wrokAssignment.interface.ts have drifted from them, so prefer these for dashboard data.
export type BackendSiteStatus = "ACTIVE" | "INACTIVE" | "UNDER_MAINTENANCE" | "CLOSED";
export type BackendAssignmentStatus = "PENDING" | "COMPLETED" | "CANCELLED";
export type BackendPaymentStatus = "DUE" | "PAID" | "PENDING" | "FAILED";

export interface INamedCount {
    name: string;
    count: number;
}

export interface IAttendanceTrendPoint {
    date: string; // yyyy-mm-dd
    present: number;
    absent: number;
}

export interface IPaymentSummary {
    totalDue: number;
    dueCount: number;
}

export interface IAdminStats {
    counts: {
        totalWorkers: number;
        approvedWorkers: number;
        pendingWorkers: number;
        bannedWorkers: number;
        siteEngineers: number;
        chiefEngineers: number;
        totalSites: number;
        activeSites: number;
    };
    sitesByStatus: INamedCount[];
    workersByPosition: INamedCount[];
    payments: IPaymentSummary & {
        totalPaid: number;
        paidCount: number;
    };
    recentWorkers: {
        id: string;
        name: string;
        email: string;
        position?: WorkerPosition | null;
        approved: boolean;
        profilePhoto?: string | null;
        createdAt: string;
    }[];
}

export interface IChiefEngineerStats {
    counts: {
        totalSites: number;
        activeSites: number;
        totalWorkers: number;
        pendingApproval: number;
        totalAssignments: number;
        completedAssignments: number;
    };
    sitesByStatus: INamedCount[];
    assignmentsByStatus: INamedCount[];
    attendanceTrend: IAttendanceTrendPoint[];
    payments: IPaymentSummary;
    pendingWorkers: {
        id: string;
        name: string;
        email: string;
        position?: WorkerPosition | null;
        contactNumber: string;
        profilePhoto?: string | null;
        createdAt: string;
    }[];
}

export interface IMySite {
    id: string;
    name: string;
    location?: string | null;
    address: string;
    status: BackendSiteStatus;
    startDate: string;
    workerCount: number;
}

export interface ISiteEngineerStats {
    counts: {
        mySites: number;
        myWorkers: number;
        totalAssignments: number;
        pendingAssignments: number;
        completedAssignments: number;
        presentToday: number;
    };
    assignmentsByStatus: INamedCount[];
    attendanceTrend: IAttendanceTrendPoint[];
    payments: IPaymentSummary;
    mySites: IMySite[];
    recentAssignments: {
        id: string;
        title: string;
        status: BackendAssignmentStatus;
        dueDate?: string | null;
        assignedAt: string;
        site: { id: string; name: string; status: BackendSiteStatus };
        worker: {
            id: string;
            name: string;
            position?: WorkerPosition | null;
            profilePhoto?: string | null;
        };
    }[];
}

export interface IWorkerStats {
    profile: {
        id: string;
        name: string;
        email: string;
        position?: WorkerPosition | null;
        dailyRate?: number | null;
        halfDayRate?: number | null;
        companyName?: string | null;
        joiningDate?: string | null;
        approved: boolean;
        onleave: boolean;
        profilePhoto?: string | null;
    };
    counts: {
        totalAssignments: number;
        pendingAssignments: number;
        completedAssignments: number;
        presentThisMonth: number;
        absentThisMonth: number;
        halfDaysThisMonth: number;
    };
    assignmentsByStatus: INamedCount[];
    attendanceTrend: IAttendanceTrendPoint[];
    earnings: {
        totalDue: number;
        dueCount: number;
        totalPaid: number;
        paidCount: number;
    };
    upcomingAssignments: {
        id: string;
        title: string;
        description: string;
        status: BackendAssignmentStatus;
        dueDate?: string | null;
        workdate?: string | null;
        site: { id: string; name: string; location?: string | null; address: string };
        assignedBy: { id: string; name: string };
    }[];
    recentPayments: {
        id: string;
        totalAmountDue: number;
        amountPaid: number;
        status: BackendPaymentStatus;
        startDate: string;
        endDate: string;
        paymentDate?: string | null;
    }[];
}