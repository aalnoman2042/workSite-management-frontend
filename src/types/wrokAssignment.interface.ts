import { ISite } from "./site.interface";
import { ISiteEngineer } from "./siteEngineer.inteface";
import { IWorker } from "./worker.interface";
// import { ISiteEngineer } from "./siteEngineer.interface";

export type AssignmentStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface IWorkAssignment {
  id: string;
  title: string;
  description: string;
  status: AssignmentStatus;
  assignedAt: string;
  dueDate?: string;

  site: ISite;
  siteId: string;

  worker: IWorker;
  workerId: string;

  workdate?: string;
  assignedBy: ISiteEngineer;
  assignedByEngineerId: string;

  createdAt: string;
  updatedAt: string;
}
