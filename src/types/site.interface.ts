// import { IWorkAssignment } from "./workAssignment.interface";
import { IAttendance } from "./attendance.interface";
import { IWorkAssignment } from "./wrokAssignment.interface";

export type SiteStatus = "ACTIVE" | "INACTIVE" | "COMPLETED";

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
