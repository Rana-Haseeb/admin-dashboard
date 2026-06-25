// src/components/dashboard/AnalyticsCharts.jsx
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";
import Card from "../ui/Card";
import { MONTHLY_REVENUE, USER_GROWTH } from "../../data/chartData";

/* ─── Shared palette ─────────────────────────────────────────── */
const VIOLET = "#7c3aed";
const CYAN   = "#22d3ee";

/* ─── Theme-aware axis / grid tokens ─────────────────────────── */
function useChartTheme() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    tickColor:  dark ? "#475569" : "#94a3b8",
    gridColor:  dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
    tooltipBg:  dark ? "#1e293b" : "#1e293b",
    tooltipBdr: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)",
    tooltipTxt: "#e2e8f0",
    tooltipSub: "#94a3b8",
  };
}

/* ─── Custom tooltip ─────────────────────────────────────────── */
function ChartTooltip({ active, payload, label, formatter }) {
  const { tooltipBg, tooltipBdr, tooltipTxt, tooltipSub } = useChartTheme();

  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background:   tooltipBg,
        border:       `1px solid ${tooltipBdr}`,
        borderRadius: "8px",
        padding:      "8px 12px",
        boxShadow:    "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ color: tooltipSub, fontSize: "10px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: tooltipTxt, fontSize: "13px", fontWeight: 600, margin: 0 }}>
          {formatter ? formatter(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
}

/* ─── Monthly Revenue bar chart ──────────────────────────────── */
function RevenueChart() {
  const { tickColor, gridColor } = useChartTheme();

  return (
    <Card className="stagger-5 animate-fade-up">
      <Card.Header
        title="Monthly Revenue"
        subtitle="Full year · 2024"
      />
      <Card.Content>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={VIOLET} stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray="0"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: tickColor, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: tickColor, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}K`}
            />
            <Tooltip
              content={<ChartTooltip formatter={(v) => `$${(v / 1000).toFixed(0)}K`} />}
              cursor={{ fill: "rgba(124,58,237,0.06)" }}
            />
            <Bar
              dataKey="revenue"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
}

/* ─── User Growth area chart ──────────────────────────────────── */
function UserGrowthChart() {
  const { tickColor, gridColor } = useChartTheme();
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <Card className="stagger-6 animate-fade-up">
      <Card.Header
        title="User Growth"
        subtitle="Monthly active users · 2024"
      />
      <Card.Content>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={USER_GROWTH} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={CYAN} stopOpacity={dark ? 0.18 : 0.14} />
                <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray="0"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: tickColor, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: tickColor, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
            />
            <Tooltip
              content={
                <ChartTooltip
                  formatter={(v) => `${v.toLocaleString()} users`}
                />
              }
              cursor={{ stroke: CYAN, strokeWidth: 1, strokeOpacity: 0.3 }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke={CYAN}
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={false}
              activeDot={{ r: 4, fill: CYAN, stroke: dark ? "#07090f" : "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
}

/* ─── AnalyticsCharts ─────────────────────────────────────────── */
export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RevenueChart />
      <UserGrowthChart />
    </div>
  );
}
