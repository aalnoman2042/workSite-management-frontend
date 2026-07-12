"use client";

import { IAttendanceTrendPoint } from "@/types/stats.interface";
import { format, parseISO } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ABSENT_COLOR, PRESENT_COLOR, axisStyle, tooltipStyle } from "./chartTheme";

const AttendanceTrendChart = ({ data }: { data: IAttendanceTrendPoint[] }) => {
  const hasData = data.some((point) => point.present > 0 || point.absent > 0);

  if (!hasData) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
        No attendance recorded in the last 7 days.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="presentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={PRESENT_COLOR} stopOpacity={0.5} />
            <stop offset="95%" stopColor={PRESENT_COLOR} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="absentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={ABSENT_COLOR} stopOpacity={0.5} />
            <stop offset="95%" stopColor={ABSENT_COLOR} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={axisStyle}
          tickFormatter={(value: string) => format(parseISO(value), "EEE")}
        />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={axisStyle} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelFormatter={(value) => format(parseISO(String(value)), "EEE, dd MMM")}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />

        <Area
          type="monotone"
          dataKey="present"
          name="Present"
          stroke={PRESENT_COLOR}
          fill="url(#presentFill)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="absent"
          name="Absent"
          stroke={ABSENT_COLOR}
          fill="url(#absentFill)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AttendanceTrendChart;