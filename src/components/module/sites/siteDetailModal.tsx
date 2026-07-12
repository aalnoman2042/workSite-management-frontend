"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate, formatEnumLabel, getInitials } from "@/lib/formatters";
import { ISite } from "@/types/site.interface";
import { CalendarDays, Coins, MapPin, Users } from "lucide-react";
import React from "react";
import SiteStatusBadge from "./siteStatusBadge";
import { getSiteStats } from "./siteStats";

interface SiteDetailsModalProps {
  site: ISite | null;
  open: boolean;
  onClose: () => void;
}

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium break-words">{value}</p>
    </div>
  </div>
);

export default function SiteDetailsModal({ site, open, onClose }: SiteDetailsModalProps) {
  if (!site) return null;

  const assignments = site.assignments ?? [];
  const attendance = site.attendance ?? [];
  const stats = getSiteStats(site);

  // Roll assignments up per worker — someone with three tasks is still one worker.
  const workers = new Map<
    string,
    { id: string; name: string; position?: string | null; tasks: number; done: number }
  >();

  for (const assignment of assignments) {
    const worker = assignment.worker;
    if (!worker) continue;

    const entry = workers.get(worker.id) ?? {
      id: worker.id,
      name: worker.name,
      position: worker.position,
      tasks: 0,
      done: 0,
    };
    entry.tasks += 1;
    if (assignment.status === "COMPLETED") entry.done += 1;
    workers.set(worker.id, entry);
  }

  const recentAttendance = [...attendance]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-3">
            <DialogTitle className="text-xl">{site.name}</DialogTitle>
            <SiteStatusBadge status={site.status} />
          </div>
          <DialogDescription>{site.location || site.address}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow icon={MapPin} label="Address" value={site.address} />
            <InfoRow
              icon={CalendarDays}
              label="Schedule"
              value={`${formatDate(site.startDate)} → ${
                site.endDate ? formatDate(site.endDate) : "ongoing"
              }`}
            />
            <InfoRow
              icon={Coins}
              label="Total cost"
              value={site.totalCost ? formatCurrency(site.totalCost) : "Not set"}
            />
            <InfoRow
              icon={Users}
              label="Workforce"
              value={`${stats.workerCount} worker(s) · ${stats.presentToday} present today`}
            />
          </div>

          {stats.progress !== null && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Schedule progress</span>
                <span className="font-medium">{stats.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Running for {stats.daysRunning} day(s).
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Workers", value: stats.workerCount },
              { label: "Tasks", value: stats.totalAssignments },
              { label: "Pending", value: stats.pendingAssignments },
              { label: "Completed", value: stats.completedAssignments },
            ].map((tile) => (
              <div key={tile.label} className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">{tile.label}</p>
                <p className="text-lg font-bold">{tile.value}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-1">
            <h3 className="mb-2 text-sm font-semibold">Workers on this site</h3>
            {workers.size === 0 ? (
              <p className="py-3 text-sm text-muted-foreground">No workers assigned yet.</p>
            ) : (
              [...workers.values()].map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {getInitials(worker.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{worker.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {formatEnumLabel(worker.position)}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {worker.done}/{worker.tasks} done
                  </Badge>
                </div>
              ))
            )}
          </div>

          <Separator />

          <div className="space-y-1">
            <h3 className="mb-2 text-sm font-semibold">Tasks</h3>
            {assignments.length === 0 ? (
              <p className="py-3 text-sm text-muted-foreground">No tasks yet.</p>
            ) : (
              // Keyed by assignment id. The old modal keyed these by worker id, so a worker
              // with several tasks produced duplicate React keys.
              assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{assignment.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {assignment.worker?.name}
                      {assignment.dueDate && ` · due ${formatDate(assignment.dueDate)}`}
                    </p>
                  </div>
                  <Badge variant={assignment.status === "COMPLETED" ? "secondary" : "outline"}>
                    {formatEnumLabel(assignment.status)}
                  </Badge>
                </div>
              ))
            )}
          </div>

          <Separator />

          <div className="space-y-1">
            <h3 className="mb-2 text-sm font-semibold">
              Recent attendance{" "}
              <span className="font-normal text-muted-foreground">
                ({stats.attendanceRecords} record(s))
              </span>
            </h3>
            {recentAttendance.length === 0 ? (
              <p className="py-3 text-sm text-muted-foreground">No attendance recorded.</p>
            ) : (
              recentAttendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{record.worker?.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(record.date)}</p>
                  </div>
                  {record.isHalfDay && <Badge variant="outline">Half day</Badge>}
                  <Badge variant={record.status === "PRESENT" ? "secondary" : "destructive"}>
                    {formatEnumLabel(record.status)}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}