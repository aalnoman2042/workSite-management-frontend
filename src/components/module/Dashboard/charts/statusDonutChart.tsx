"use client";

import { formatEnumLabel } from "@/lib/formatters";
import { INamedCount } from "@/types/stats.interface";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS, tooltipStyle } from "./chartTheme";

const StatusDonutChart = ({ data }: { data: INamedCount[] }) => {
  // The backend pads every enum value with 0 so the legend is stable; drop the empty
  // slices before drawing, otherwise the donut renders zero-width wedges.
  const slices = data
    .filter((slice) => slice.count > 0)
    .map((slice) => ({ ...slice, label: formatEnumLabel(slice.name) }));

  if (!slices.length) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
        Nothing to show yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={slices}
          dataKey="count"
          nameKey="label"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
          stroke="var(--background)"
          strokeWidth={2}
        >
          {slices.map((slice, index) => (
            <Cell key={slice.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusDonutChart;