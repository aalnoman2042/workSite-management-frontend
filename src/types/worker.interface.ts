/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "./user.interface";
// import { IWorkAssignment } from "./workAssignment.interface";
import { IAttendance } from "./attendance.interface";
import { IWorkAssignment } from "./wrokAssignment.interface";

export type WorkerPosition = 
  | "SENIOR_TECHNICIAN"
  | "JUNIOR_TECHNICIAN"
  | "SENIOR_HELPER"
  | "JUNIOR_HELPER"
  | "ELECTRICIAN"
  | "PLUMBER"
  | "CARPENTER"
  | "OTHER";

export interface IWorker {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
  isDeleted: boolean;
  contactNumber: string;
  user: IUser;
  userId: string;
  nidNumber: string;
  joiningDate?: string;
  banned: boolean;
  approved: boolean;
  onleave: boolean;
  createdAt: string;
  updatedAt: string;
  dailyRate?: number;
  halfDayRate?: number;
  companyName?: string;
  position?: WorkerPosition;

  workAssignments: IWorkAssignment[];
  payments?: any[];
  attendance: IAttendance[];
}

 export  const WorkerPositions: { label: string; value: WorkerPosition }[] = [
  { label: "Senior Technician", value: "SENIOR_TECHNICIAN" },
  { label: "Junior Technician", value: "JUNIOR_TECHNICIAN" },
  { label: "Senior Helper", value: "SENIOR_HELPER" },
  { label: "Junior Helper", value: "JUNIOR_HELPER" },
  { label: "Electrician", value: "ELECTRICIAN" },
  { label: "Plumber", value: "PLUMBER" },
  { label: "Carpenter", value: "CARPENTER" },
  { label: "Other", value: "OTHER" },
];