// Pulls straight from the --chart-* tokens already defined in globals.css, so charts
// follow the light/dark theme without any extra wiring.
export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export const PRESENT_COLOR = "var(--chart-2)";
export const ABSENT_COLOR = "var(--chart-5)";

export const tooltipStyle = {
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  fontSize: "12px",
};

export const axisStyle = {
  fill: "var(--muted-foreground)",
  fontSize: 12,
};