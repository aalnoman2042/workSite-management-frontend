"use client";

import React from "react";
// import { ISite, IAssignment, IAttendance } from "@/types/site.interface";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ISite } from "@/types/site.interface";
import { IWorkAssignment } from "@/types/wrokAssignment.interface";
import { IAttendance } from "@/types/attendance.interface";

interface SiteDetailsModalProps {
  site: ISite;
  open: boolean;
  onClose: () => void;
}

export default function SiteDetailsModal({ site, open, onClose }: SiteDetailsModalProps) {
  const assignments = site.assignments ?? [];
  const attendance = site.attendance ?? [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{site.name} Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p><strong>Location:</strong> {site.location || "N/A"}</p>
          <p><strong>Address:</strong> {site.address}</p>
          <p><strong>Start Date:</strong> {new Date(site.startDate).toLocaleDateString()}</p>
          <p><strong>Total Cost:</strong> {site.totalCost ? `$${site.totalCost}` : "N/A"}</p>

          <div>
            <h3 className="font-semibold mt-2">Assigned Workers</h3>
            {assignments.length === 0 ? (
              <p>No workers assigned</p>
            ) : (
              <ul className="list-disc list-inside">
                {assignments.map((a: IWorkAssignment) => (
                  <li key={a.worker.id}>
                    {a.worker.name} {a.worker.position ? `(${a.worker.position})` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="font-semibold mt-2">Attendance</h3>
            {attendance.length === 0 ? (
              <p>No attendance records</p>
            ) : (
              <ul className="list-disc list-inside">
                {attendance.map((a: IAttendance) => (
                  <li key={a.worker.id}>
                    {a.worker.name}: {a.status} on {new Date(a.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
