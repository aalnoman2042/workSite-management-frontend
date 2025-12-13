import { IWorker } from "./worker.interface";
import { ISite } from "./site.interface";
import { ISiteEngineer } from "./siteEngineer.inteface";
// import { ISiteEngineer } from "./siteEngineer.interface";

export type AttendanceStatus = "PRESENT" | "ABSENT";

export interface IAttendance {
  id: string;

  worker: IWorker;
  workerId: string;

  site: ISite;
  siteId: string;

  siteEngineer: ISiteEngineer;
  siteEngineerId: string;

  date: string;
  status: AttendanceStatus;

  hoursWorked?: number;
  isHalfDay: boolean;
  ispaid: boolean;

  verifiedBy?: string;
  verifiedAt?: string;

  createdAt: string;
  updatedAt: string;
}
