/* eslint-disable @typescript-eslint/no-explicit-any */
// siteEngineer.interface.ts
// import { IUser } from "./user.interface";
import { IWorker } from "./worker.interface";
// import { IWorkAssignment } from "./workAssignment.interface";
import { IAttendance } from "./attendance.interface";
import { IWorkAssignment } from "./wrokAssignment.interface";
import { IUser } from "./user.interface";

export interface ISiteEngineer {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
  isDeleted: boolean;
  approved: boolean;
  contactNumber: string;
  user: IUser;
  userId: string;
  companyName?: string;

  workAssignments: IWorkAssignment[];
  payments?: any[];
  salaryRecords?: any[];
  attendance: IAttendance[];

  createdAt: string;
  updatedAt: string;
}
