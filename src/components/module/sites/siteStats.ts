import { ISite } from "@/types/site.interface";

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export interface ISiteStats {
  workerCount: number;
  totalAssignments: number;
  pendingAssignments: number;
  completedAssignments: number;
  attendanceRecords: number;
  presentToday: number;
  daysRunning: number;
  progress: number | null; // 0-100 through the planned schedule, null when no end date
}

export const getSiteStats = (site: ISite): ISiteStats => {
  const assignments = site.assignments ?? [];
  const attendance = site.attendance ?? [];

  // A worker with three tasks is still one worker. The old card showed assignments.length
  // under the label "workers assigned", which triple-counted them.
  const workerIds = new Set<string>([
    ...assignments.map((a) => a.workerId),
    ...attendance.map((a) => a.workerId),
  ]);

  const today = new Date();
  const start = new Date(site.startDate);
  const end = site.endDate ? new Date(site.endDate) : null;

  const daysRunning = Math.max(
    0,
    Math.floor((today.getTime() - start.getTime()) / 86_400_000)
  );

  let progress: number | null = null;
  if (end) {
    const total = end.getTime() - start.getTime();
    progress =
      total <= 0
        ? 100
        : Math.min(100, Math.max(0, Math.round(((today.getTime() - start.getTime()) / total) * 100)));
  }

  return {
    workerCount: workerIds.size,
    totalAssignments: assignments.length,
    pendingAssignments: assignments.filter((a) => a.status === "PENDING").length,
    completedAssignments: assignments.filter((a) => a.status === "COMPLETED").length,
    attendanceRecords: attendance.length,
    presentToday: attendance.filter(
      (a) => a.status === "PRESENT" && isSameDay(new Date(a.date), today)
    ).length,
    daysRunning,
    progress,
  };
};