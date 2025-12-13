"use client";

import { Column } from "@/components/shared/managementTable";
import { IWorker } from "@/types/worker.interface";
import { UserInfoCell } from "@/components/shared/cell/userInfoCell";
import { StatusBadgeCell } from "@/components/shared/cell/statusBadgeCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { DollarSign, Briefcase, User } from "lucide-react";

export const workersColumns: Column<IWorker>[] = [
  {
    header: "Worker",
    accessor: (worker) => (
      <UserInfoCell
        name={worker.name}
        email={worker.email}
        photo={worker.profilePhoto}
      />
    ),
  },
  {
    header: "Position",
    accessor: (worker) => (
      <div className="flex items-center gap-2 text-sm font-medium">
        <Briefcase className="h-4 w-4 text-muted-foreground" />
        {worker.position || "Not specified"}
      </div>
    ),
  },
  {
    header: "Contact",
    accessor: (worker) => (
      <div className="flex flex-col text-sm">
        <span>{worker.contactNumber}</span>
        <span className="text-gray-500">{worker.email}</span>
      </div>
    ),
  },
  {
    header: "Daily Rate",
    accessor: (worker) => (
      <div className="flex items-center gap-1 text-sm font-medium text-green-600">
        <DollarSign className="h-4 w-4" />
        {worker.dailyRate ? `$${worker.dailyRate}` : "N/A"}
      </div>
    ),
  },
  {
    header: "Approved",
    accessor: (worker) => (
      <div className="flex items-center gap-1 text-sm font-medium text-green-600">
        {/* <DollarSign className="h-4 w-4" /> */}
        {worker.approved ? "Approved" : "Unapproved"}
      </div>
    ),
  },
  {
    header: "Company",
    accessor: (worker) => (
      <span className="text-sm">{worker.companyName || "N/A"}</span>
    ),
  },
  {
    header: "NID Number",
    accessor: (worker) => (
      <span className="text-sm font-medium">{worker.nidNumber}</span>
    ),
  },
  {
    header: "Status",
    accessor: (worker) => (
      <StatusBadgeCell
        isDeleted={worker.isDeleted}
        // onLeave={worker.onleave}
        // isBanned={worker.banned}
      />
    ),
  },
  {
    header: "Joined",
    accessor: (worker) => <DateCell date={worker.joiningDate || worker.createdAt} />,
  },
];
