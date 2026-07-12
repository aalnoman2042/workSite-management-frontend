"use client";

import { formatEnumLabel } from "@/lib/formatters";
import { INamedCount } from "@/types/stats.interface";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS, axisStyle, tooltipStyle } from "./chartTheme";

// Horizontal bars — position/status names are long, and they stay readable this way.
const CountBarChart = ({ data, height = 280 }: { data: INamedCount[]; height?: number }) => {
  const bars = data
    .filter((bar) => bar.count > 0)
    .map((bar) => ({ ...bar, label: formatEnumLabel(bar.name) }));

  if (!bars.length) {
    return (
      <div
        className="flex items-center justify-center text-sm text-muted-foreground"
        style={{ height }}
      >
        Nothing to show yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={bars} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} tick={axisStyle} />
        <YAxis
          type="category"
          dataKey="label"
          width={110}
          tickLine={false}
          axisLine={false}
          tick={axisStyle}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey="count" name="Workers" radius={[0, 4, 4, 0]} barSize={18}>
          {bars.map((bar, index) => (
            <Cell key={bar.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CountBarChart;