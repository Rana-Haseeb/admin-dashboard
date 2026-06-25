import { Globe, Monitor, Smartphone, Tablet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

/* ─── Data ───────────────────────────────────────────────────── */
const MONTHLY = [
  { month: "Jan", revenue: 42, users: 58 },
  { month: "Feb", revenue: 55, users: 64 },
  { month: "Mar", revenue: 48, users: 72 },
  { month: "Apr", revenue: 70, users: 68 },
  { month: "May", revenue: 63, users: 81 },
  { month: "Jun", revenue: 82, users: 90 },
  { month: "Jul", revenue: 74, users: 76 },
  { month: "Aug", revenue: 91, users: 95 },
  { month: "Sep", revenue: 85, users: 88 },
  { month: "Oct", revenue: 78, users: 83 },
  { month: "Nov", revenue: 94, users: 97 },
  { month: "Dec", revenue: 100, users: 100 },
];

const DEVICES = [
  { label: "Desktop", icon: Monitor,    pct: 54, color: "#7c3aed", offset: 0  },
  { label: "Mobile",  icon: Smartphone, pct: 32, color: "#22d3ee", offset: 54 },
  { label: "Tablet",  icon: Tablet,     pct: 14, color: "#f59e0b", offset: 86 },
];

const TRAFFIC_SOURCES = [
  { source: "Organic Search", visits: "28,413", pct: 48, color: "#7c3aed" },
  { source: "Direct",         visits: "14,200", pct: 24, color: "#22d3ee" },
  { source: "Social Media",   visits:  "8,050", pct: 14, color: "#10b981" },
  { source: "Referral",       visits:  "5,900", pct: 10, color: "#f59e0b" },
  { source: "Email",          visits:  "2,350", pct:  4, color: "#f43f5e" },
];

const GEO_DATA = [
  { country: "United States", flag: "🇺🇸", pct: 36, users: "4,621" },
  { country: "United Kingdom", flag: "🇬🇧", pct: 18, users: "2,310" },
  { country: "Germany",        flag: "🇩🇪", pct: 12, users: "1,540" },
  { country: "Canada",         flag: "🇨🇦", pct: 9,  users: "1,155" },
  { country: "Australia",      flag: "🇦🇺", pct: 7,  users:   "897" },
  { country: "Other",          flag: "🌍", pct: 18, users: "2,310" },
];

const KPI_CARDS = [
  { label: "Avg. Session Duration", value: "4m 22s", change: "+0:42",  up: true },
  { label: "Pages / Session",       value: "3.84",   change: "+0.3",   up: true },
  { label: "Bounce Rate",           value: "38.2%",  change: "−3.1%",  up: true },
  { label: "Goal Completions",      value: "1,204",  change: "+17.2%", up: true },
];

/* ─── Custom tooltip ─────────────────────────────────────────── */
function AnalyticsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1e293b",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      padding: "8px 12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    }}>
      <p style={{ color: "#94a3b8", fontSize: "10px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color, fontSize: "12px", fontWeight: 600, margin: "2px 0" }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

/* ─── Dual bar chart ─────────────────────────────────────────── */
function DualBarChart() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const tickColor = dark ? "#475569" : "#94a3b8";
  const gridColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";

  return (
    <div className="card stagger-1 animate-fade-up" style={{ padding: "20px" }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="dark:text-white text-slate-900 text-[14px] font-semibold font-display">
            Revenue vs Users
          </h3>
          <p className="text-slate-500 text-[11px] mt-0.5">Full-year comparison · indexed to 100</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={MONTHLY} margin={{ top: 2, right: 4, left: -20, bottom: 0 }} barCategoryGap="30%" barGap={3}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#7c3aed" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#22d3ee" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0e7490" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="0" />
          <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: tickColor, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
          <Tooltip content={<AnalyticsTooltip />} cursor={{ fill: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }} />
          <Legend
            iconType="square"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", color: tickColor, paddingTop: "10px" }}
          />
          <Bar dataKey="revenue" name="Revenue" fill="url(#revenueGrad)" radius={[3, 3, 0, 0]} maxBarSize={20} />
          <Bar dataKey="users"   name="Users"   fill="url(#usersGrad)"   radius={[3, 3, 0, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Donut device chart ─────────────────────────────────────── */
function DeviceBreakdown() {
  const gradient = DEVICES.reduce((acc, d) => {
    const start = acc.pos;
    const end = start + d.pct * 3.6;
    acc.pos = end;
    acc.parts.push(`${d.color} ${start}deg ${end}deg`);
    return acc;
  }, { pos: 0, parts: [] }).parts.join(", ");

  return (
    <div className="card stagger-2 animate-fade-up" style={{ padding: "20px" }}>
      <h3 className="dark:text-white text-slate-900 text-[14px] font-semibold font-display mb-4">
        Device Breakdown
      </h3>

      <div className="flex items-center gap-5">
        {/* Donut */}
        <div className="relative flex-shrink-0" style={{ width: "90px", height: "90px" }}>
          <div
            className="w-full h-full rounded-full"
            style={{ background: `conic-gradient(${gradient})` }}
          />
          {/* Center hole — matches card background */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: "58px",
              height: "58px",
              background: "var(--bg-base)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Globe size={16} className="text-slate-400" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {DEVICES.map((d) => (
            <div key={d.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="dark:text-slate-400 text-slate-600 text-[12px]">{d.label}</span>
              </div>
              <span className="dark:text-white text-slate-900 text-[12px] font-semibold font-mono">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Traffic sources ────────────────────────────────────────── */
function TrafficSources() {
  return (
    <div className="card stagger-3 animate-fade-up" style={{ padding: "20px" }}>
      <h3 className="dark:text-white text-slate-900 text-[14px] font-semibold font-display mb-4">
        Traffic Sources
      </h3>
      <div className="space-y-3">
        {TRAFFIC_SOURCES.map((src, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="dark:text-slate-400 text-slate-600 text-[12px]">{src.source}</span>
              <div className="flex items-center gap-2">
                <span className="dark:text-slate-300 text-slate-700 text-[12px] font-mono">{src.visits}</span>
                <span className="text-[10px] text-slate-500 font-mono">{src.pct}%</span>
              </div>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "var(--bar-empty)" }}
            >
              <div
                className="h-full rounded-full progress-fill"
                style={{ width: `${src.pct}%`, background: src.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Geo table ──────────────────────────────────────────────── */
function GeoTable() {
  return (
    <div className="card stagger-4 animate-fade-up" style={{ padding: "20px" }}>
      <h3 className="dark:text-white text-slate-900 text-[14px] font-semibold font-display mb-4">
        Top Countries
      </h3>
      <div className="space-y-2">
        {GEO_DATA.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-1.5 px-1 rounded-lg transition-colors
                       dark:hover:bg-white/[0.03] hover:bg-black/[0.03]"
          >
            <span className="text-base flex-shrink-0">{row.flag}</span>
            <span className="dark:text-slate-300 text-slate-700 text-[12px] flex-1">{row.country}</span>
            <div className="flex items-center gap-3">
              <div
                className="hidden sm:block h-1.5 rounded-full overflow-hidden"
                style={{ width: "60px", background: "var(--bar-empty)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.pct}%`,
                    background: "linear-gradient(90deg, #7c3aed, #22d3ee)",
                  }}
                />
              </div>
              <span className="dark:text-slate-400 text-slate-600 text-[12px] font-mono w-10 text-right">
                {row.users}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── KPI row ────────────────────────────────────────────────── */
function KpiRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger-5 animate-fade-up">
      {KPI_CARDS.map((k, i) => (
        <div key={i} className="card px-4 py-3">
          <p className="text-slate-500 text-[11px] mb-1">{k.label}</p>
          <p className="dark:text-white text-slate-900 text-[20px] font-bold font-display leading-none mb-1">
            {k.value}
          </p>
          <div
            className={`flex items-center gap-1 text-[11px] font-semibold
              ${k.up ? "text-emerald-400" : "text-rose-400"}`}
          >
            {k.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
            {k.change}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <KpiRow />
      <DualBarChart />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DeviceBreakdown />
        <TrafficSources />
        <GeoTable />
      </div>
    </div>
  );
}
