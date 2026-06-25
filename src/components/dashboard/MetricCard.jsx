// src/components/dashboard/MetricCard.jsx
import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "../ui/Card";

/**
 * MetricCard — renders one entry from METRICS (src/data/metricsData.js).
 * Uses Card as the root so it inherits `.card` base styles (border-radius,
 * transition, shadow), while overriding background and border with the
 * metric's tinted color via inline style passed through Card's ...rest.
 *
 * @param {{ id, label, value, change, changeType, icon, color, bg, border, glow }} metric
 * @param {number} index — 0-based, drives the stagger-N animation class
 */
export default function MetricCard({ metric, index }) {
  const {
    label,
    value,
    change,
    changeType,
    icon: Icon,
    color,
    bg,
    border,
    glow,
  } = metric;

  const isUp = changeType === "up";

  return (
    <Card
      className={`card-lift ${glow} stagger-${index + 1} animate-fade-up p-5 relative overflow-hidden`}
      style={{ background: bg, borderColor: border }}
    >
      {/* Decorative blur blob — top-right corner */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20 blur-2xl pointer-events-none"
        style={{ background: color }}
      />

      {/* Icon in a tinted rounded square */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${color}22`,
          border:     `1px solid ${color}33`,
        }}
      >
        <Icon size={17} style={{ color }} />
      </div>

      {/* Metric value */}
      <p className="dark:text-white text-slate-900 text-2xl font-bold font-display leading-none mb-1">
        {value}
      </p>

      {/* Metric label */}
      <p className="text-slate-500 text-[12px] mb-3">{label}</p>

      {/* Change badge — emerald for up, rose for down */}
      <div
        className={[
          "inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-md",
          isUp
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-rose-500/10 text-rose-400",
        ].join(" ")}
      >
        {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {change} vs last month
      </div>
    </Card>
  );
}
