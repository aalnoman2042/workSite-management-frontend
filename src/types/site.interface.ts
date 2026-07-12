// import { IWorkAssignment } from "./workAssignment.interface";
import { IAttendance } from "./attendance.interface";
import { IWorkAssignment } from "./wrokAssignment.interface";

// Matches the backend SiteStatus enum. This previously read
// "ACTIVE" | "INACTIVE" | "COMPLETED" — COMPLETED does not exist in the database and
// UNDER_MAINTENANCE / CLOSED were missing, so status handling could never work.
export type SiteStatus = "ACTIVE" | "INACTIVE" | "UNDER_MAINTENANCE" | "CLOSED";

// "Running" sites first, then the rest. Used to order every site list.
export const SITE_STATUS_ORDER: Record<SiteStatus, number> = {
  ACTIVE: 0,
  UNDER_MAINTENANCE: 1,
  INACTIVE: 2,
  CLOSED: 3,
};

export const SiteStatuses: { label: string; value: SiteStatus }[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Under Maintenance", value: "UNDER_MAINTENANCE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Closed", value: "CLOSED" },
];

export interface ISite {
  id: string;
  name: string;
  location?: string;
  address: string;
  startDate: string;
  endDate?: string;
  totalCost?: number;
  status: SiteStatus;
  createdAt: string;
  updatedAt: string;

  assignments: IWorkAssignment[];
  attendance: IAttendance[];
}

export const sortSitesRunningFirst = (sites: ISite[]): ISite[] =>
  [...sites].sort((a, b) => {
    const byStatus = SITE_STATUS_ORDER[a.status] - SITE_STATUS_ORDER[b.status];
    if (byStatus !== 0) return byStatus;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });