import {
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Clock,
  ShoppingCart,
  UserPlus,
  Bug,
  GitPullRequest,
} from "lucide-react";
import MetricCard from "../components/dashboard/MetricCard";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import { METRICS } from "../data/metricsData";

const WEEKLY = [
  { day: "Mon", pct: 52, sessions: "2.1K" },
  { day: "Tue", pct: 76, sessions: "3.4K" },
  { day: "Wed", pct: 48, sessions: "1.9K" },
  { day: "Thu", pct: 91, sessions: "4.2K" },
  { day: "Fri", pct: 67, sessions: "3.0K" },
  { day: "Sat", pct: 38, sessions: "1.5K" },
  { day: "Sun", pct: 84, sessions: "3.8K", current: true },
];

const ACTIVITY = [
  { user: "Sarah Chen",  action: "uploaded a new dataset",           time: "2m ago",  avatar: "SC", color: "#7c3aed", icon: ShoppingCart },
  { user: "Marcus Webb", action: "added 3 members to Team Alpha",    time: "18m ago", avatar: "MW", color: "#22d3ee", icon: UserPlus     },
  { user: "Priya Nair",  action: "upgraded billing to Enterprise",   time: "45m ago", avatar: "PN", color: "#10b981", icon: ArrowUpRight  },
  { user: "Alex Kim",    action: "resolved 12 open support tickets", time: "1h ago",  avatar: "AK", color: "#f59e0b", icon: Bug           },
  { user: "Jordan Lee",  action: "merged PR #204 → main",            time: "2h ago",  avatar: "JL", color: "#f43f5e", icon: GitPullRequest},
];

const TOP_PAGES = [
  { path: "/dashboard", views: "18.2K", pct: 31 },
  { path: "/analytics", views: "14.7K", pct: 25 },
  { path: "/users",     views: "10.1K", pct: 17 },
  { path: "/settings",  views:  "6.8K", pct: 12 },
  { path: "/reports",   views:  "4.3K", pct:  7 },
];

/* ─── Weekly bar chart ───────────────────────────────────────── */
function WeeklyChart() {
  return (
    <div className="card stagger-7 animate-fade-up" style={{ padding: "20px 20px 16px" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="dark:text-white text-slate-900 text-[14px] font-semibold font-display">
            Weekly Traffic
          </h3>
          <p className="text-slate-500 text-[11px] mt-0.5">Sessions this week</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#7c3aed" }} />
            Current
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "var(--bar-empty)" }} />
            Previous
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-2 h-28">
        {WEEKLY.map((bar, i) => (
          <div key={bar.day} className="flex flex-col items-center gap-1.5 flex-1 group">
            <div className="relative w-full flex flex-col justify-end" style={{ height: "96px" }}>
              {/* Tooltip */}
              <div
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px]
                           font-mono whitespace-nowrap opacity-0 group-hover:opacity-100
                           transition-opacity pointer-events-none z-10"
                style={{
                  background: "var(--tooltip-bg)",
                  color: "var(--tooltip-text)",
                  border: "1px solid var(--tooltip-bdr)",
                }}
              >
                {bar.sessions}
              </div>
              {/* Bar */}
              <div
                className={`w-full rounded-t-md bar-chart-bar bar-delay-${i + 1}`}
                style={{
                  height: `${bar.pct}%`,
                  background: bar.current
                    ? "linear-gradient(180deg, #7c3aed 0%, #4c1d95 100%)"
                    : "var(--bar-empty)",
                  boxShadow: bar.current ? "0 0 14px rgba(124,58,237,0.35)" : "none",
                }}
              />
            </div>
            <span className={`text-[10px] font-medium ${bar.current ? "text-violet-500" : "text-slate-500"}`}>
              {bar.day}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-4 pt-4 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <span className="text-slate-500 text-[11px]">Total this week</span>
        <div className="flex items-center gap-2">
          <span className="dark:text-white text-slate-900 text-[13px] font-bold font-mono">19.9K</span>
          <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-0.5">
            <TrendingUp size={9} /> +14.3%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Activity feed ──────────────────────────────────────────── */
function ActivityFeed() {
  return (
    <div className="card stagger-8 animate-fade-up" style={{ padding: "20px" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="dark:text-white text-slate-900 text-[14px] font-semibold font-display">
          Recent Activity
        </h3>
        <button className="text-[11px] text-violet-500 hover:text-violet-400 transition-colors font-medium">
          View all
        </button>
      </div>
      <div className="space-y-0">
        {ACTIVITY.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-3"
            style={{ borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--divider)" : "none" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5"
              style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}88 100%)` }}
            >
              {item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {item.user}
                </span>{" "}
                {item.action}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Clock size={9} style={{ color: "var(--text-faint)" }} />
                <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>{item.time}</span>
              </div>
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 opacity-60"
              style={{ background: item.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Top pages ──────────────────────────────────────────────── */
function TopPages() {
  return (
    <div className="card stagger-9 animate-fade-up" style={{ padding: "20px" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="dark:text-white text-slate-900 text-[14px] font-semibold font-display">Top Pages</h3>
        <button
          className="p-1 rounded-lg transition-colors
                     dark:text-slate-600 dark:hover:text-slate-300 dark:hover:bg-white/5
                     text-slate-400 hover:text-slate-700 hover:bg-black/[0.06]"
        >
          <MoreHorizontal size={15} />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-2 mb-2 px-1">
        {["Page", "", "Views", "Traffic"].map((h, i) => (
          <span
            key={i}
            className={`text-[10px] font-semibold uppercase tracking-wider text-slate-500
              ${i === 0 ? "col-span-5" : i === 1 ? "hidden" : i === 2 ? "col-span-3 text-right" : "col-span-4"}`}
          >
            {h}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        {TOP_PAGES.map((page, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-2 items-center py-2 px-1 rounded-lg transition-colors
                       dark:hover:bg-white/[0.03] hover:bg-black/[0.03]"
          >
            <div className="col-span-5 flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[12px] font-mono truncate dark:text-slate-300 text-slate-600">
                {page.path}
              </span>
            </div>
            <span className="col-span-3 text-[12px] font-mono text-slate-500 text-right">
              {page.views}
            </span>
            <div className="col-span-4 flex items-center gap-2">
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ background: "var(--bar-empty)" }}
              >
                <div
                  className="h-full rounded-full progress-fill"
                  style={{ width: `${page.pct}%`, background: "linear-gradient(90deg, #7c3aed, #22d3ee)" }}
                />
              </div>
              <span className="text-[10px] text-slate-500 font-mono w-6 text-right flex-shrink-0">
                {page.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Summary row ────────────────────────────────────────────── */
function SummaryRow() {
  const items = [
    { label: "Bounce Rate",  value: "38.2%",  sub: "−3.1% vs last week", good: true  },
    { label: "Avg. Session", value: "4m 22s", sub: "+0:42 vs last week",  good: true  },
    { label: "Conversion",   value: "5.74%",  sub: "+0.8% vs last week",  good: true  },
    { label: "Error Rate",   value: "0.12%",  sub: "+0.02% vs last week", good: false },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger-10 animate-fade-up">
      {items.map((item, i) => (
        <div key={i} className="card px-4 py-3">
          <p className="text-slate-500 text-[11px] mb-1">{item.label}</p>
          <p className="dark:text-white text-slate-900 text-[18px] font-bold font-display leading-none mb-1">
            {item.value}
          </p>
          <p className={`text-[11px] font-medium ${item.good ? "text-emerald-400" : "text-rose-400"}`}>
            {item.sub}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((metric, i) => (
          <MetricCard key={metric.id} metric={metric} index={i} />
        ))}
      </div>
      <AnalyticsCharts />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3"><WeeklyChart /></div>
        <div className="lg:col-span-2"><ActivityFeed /></div>
      </div>
      <TopPages />
      <SummaryRow />
    </div>
  );
}
