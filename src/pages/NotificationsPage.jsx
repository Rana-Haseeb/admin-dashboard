// src/pages/NotificationsPage.jsx
import { useState } from "react";
import {
  Bell, ShoppingCart, UserPlus, Shield, CreditCard,
  GitMerge, AlertTriangle, CheckCircle, Info, X, Check,
} from "lucide-react";

/* ─── Mock data ──────────────────────────────────────────────── */
const NOTIFICATIONS = [
  // Today
  {
    id: 1, group: "Today", type: "alert", read: false,
    icon: AlertTriangle, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.12)",
    title: "High CPU usage detected",
    body: "Server load exceeded 90% for more than 5 minutes on node-03.",
    time: "2m ago",
  },
  {
    id: 2, group: "Today", type: "user", read: false,
    icon: UserPlus, iconColor: "#22d3ee", iconBg: "rgba(34,211,238,0.10)",
    title: "New user registered",
    body: "Aisha Diallo joined the workspace and has been assigned the Viewer role.",
    time: "18m ago",
  },
  {
    id: 3, group: "Today", type: "system", read: false,
    icon: CheckCircle, iconColor: "#10b981", iconBg: "rgba(16,185,129,0.10)",
    title: "Deployment successful",
    body: "v2.4.1 was deployed to production with zero downtime.",
    time: "1h ago",
  },
  {
    id: 4, group: "Today", type: "billing", read: true,
    icon: CreditCard, iconColor: "#7c3aed", iconBg: "rgba(124,58,237,0.10)",
    title: "Invoice paid",
    body: "Your $249 Enterprise invoice for June 2024 has been processed.",
    time: "3h ago",
  },
  {
    id: 5, group: "Today", type: "user", read: true,
    icon: ShoppingCart, iconColor: "#10b981", iconBg: "rgba(16,185,129,0.10)",
    title: "New sale completed",
    body: "Order #10482 for $1,200 was confirmed by Priya Nair.",
    time: "5h ago",
  },

  // Yesterday
  {
    id: 6, group: "Yesterday", type: "alert", read: true,
    icon: AlertTriangle, iconColor: "#f43f5e", iconBg: "rgba(244,63,94,0.10)",
    title: "Login from new device",
    body: "A sign-in was detected from Chrome on Windows · Berlin, DE.",
    time: "Yesterday 9:14 PM",
  },
  {
    id: 7, group: "Yesterday", type: "system", read: true,
    icon: GitMerge, iconColor: "#7c3aed", iconBg: "rgba(124,58,237,0.10)",
    title: "PR merged to main",
    body: "Jordan Lee merged PR #204 — \"Refactor auth middleware\" into main.",
    time: "Yesterday 4:30 PM",
  },
  {
    id: 8, group: "Yesterday", type: "system", read: true,
    icon: Shield, iconColor: "#22d3ee", iconBg: "rgba(34,211,238,0.10)",
    title: "Security scan completed",
    body: "Automated vulnerability scan finished. No critical issues found.",
    time: "Yesterday 11:00 AM",
  },
  {
    id: 9, group: "Yesterday", type: "billing", read: true,
    icon: Info, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.10)",
    title: "Usage limit at 80%",
    body: "Your team has used 80% of the monthly API quota (40K / 50K calls).",
    time: "Yesterday 8:45 AM",
  },

  // Last week
  {
    id: 10, group: "Last week", type: "user", read: true,
    icon: UserPlus, iconColor: "#a855f7", iconBg: "rgba(168,85,247,0.10)",
    title: "Team member upgraded",
    body: "Marcus Webb was promoted from Editor to Admin by Rana Haseeb.",
    time: "Mon 2:10 PM",
  },
  {
    id: 11, group: "Last week", type: "system", read: true,
    icon: CheckCircle, iconColor: "#10b981", iconBg: "rgba(16,185,129,0.10)",
    title: "Backup completed",
    body: "Weekly database backup completed successfully. 4.2 GB archived.",
    time: "Sun 3:00 AM",
  },
  {
    id: 12, group: "Last week", type: "alert", read: true,
    icon: AlertTriangle, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.10)",
    title: "SSL certificate expiring",
    body: "Certificate for api.adminpro.io expires in 14 days. Renew soon.",
    time: "Sat 10:22 AM",
  },
];

const FILTERS = ["All", "Unread", "Alerts", "System", "Billing"];

const TYPE_MAP = {
  Alerts:  ["alert"],
  System:  ["system"],
  Billing: ["billing"],
  User:    ["user"],
};

/* ─── NotificationItem ───────────────────────────────────────── */
function NotificationItem({ notif, onRead, onDismiss }) {
  const { icon: Icon, iconColor, iconBg, title, body, time, read } = notif;

  return (
    <div
      className={`flex items-start gap-3.5 px-5 py-4 transition-colors relative
                  dark:hover:bg-white/[0.02] hover:bg-black/[0.02] group`}
      style={{ borderBottom: "1px solid var(--divider)" }}
    >
      {/* Unread indicator */}
      {!read && (
        <span
          className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "#7c3aed", boxShadow: "0 0 6px rgba(124,58,237,0.5)" }}
        />
      )}

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: iconBg, border: `1px solid ${iconColor}22` }}
      >
        <Icon size={16} style={{ color: iconColor }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[13px] font-medium leading-snug mb-0.5
            ${read ? "dark:text-slate-400 text-slate-600" : "dark:text-slate-100 text-slate-800"}`}
        >
          {title}
        </p>
        <p className="text-[12px] text-slate-500 leading-snug line-clamp-2">{body}</p>
        <p className="text-[11px] mt-1.5" style={{ color: "var(--text-faint)" }}>{time}</p>
      </div>

      {/* Actions (shown on hover) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
        {!read && (
          <button
            onClick={() => onRead(notif.id)}
            title="Mark as read"
            className="p-1.5 rounded-lg transition-colors
                       dark:text-slate-600 dark:hover:text-slate-200 dark:hover:bg-white/[0.06]
                       text-slate-400 hover:text-slate-700 hover:bg-black/[0.06]"
          >
            <Check size={13} />
          </button>
        )}
        <button
          onClick={() => onDismiss(notif.id)}
          title="Dismiss"
          className="p-1.5 rounded-lg transition-colors
                     dark:text-slate-600 dark:hover:text-rose-400 dark:hover:bg-rose-500/10
                     text-slate-400 hover:text-rose-500 hover:bg-rose-500/10"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function NotificationsPage() {
  const [filter,         setFilter]        = useState("All");
  const [notifications,  setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filter === "All")    return true;
    if (filter === "Unread") return !n.read;
    return TYPE_MAP[filter]?.includes(n.type) ?? true;
  });

  // Group filtered notifications preserving order
  const groups = ["Today", "Yesterday", "Last week"].reduce((acc, g) => {
    const items = filtered.filter((n) => n.group === g);
    if (items.length) acc.push({ label: g, items });
    return acc;
  }, []);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const dismiss = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="space-y-4 max-w-2xl">

      {/* ── Header row ────────────────────────────────────────── */}
      <div className="flex items-center justify-between stagger-1 animate-fade-up">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            <Bell size={15} className="text-violet-400" />
          </div>
          <div>
            <h2 className="dark:text-white text-slate-900 text-[15px] font-bold font-display leading-tight">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <p className="text-slate-500 text-[11px]">{unreadCount} unread</p>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors
                       dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/[0.05]
                       text-slate-500 hover:text-slate-800 hover:bg-black/[0.05]"
            style={{ border: "1px solid var(--divider)" }}
          >
            <Check size={12} />
            Mark all read
          </button>
        )}
      </div>

      {/* ── Filter tabs ───────────────────────────────────────── */}
      <div className="flex items-center gap-1 p-1 rounded-xl stagger-2 animate-fade-up"
           style={{ background: "var(--input-bg)", border: "1px solid var(--divider)", width: "fit-content" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
            style={
              filter === f
                ? { background: "#7c3aed", color: "#fff", boxShadow: "0 0 12px rgba(124,58,237,0.25)" }
                : { color: "var(--text-secondary)" }
            }
          >
            {f}
            {f === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-violet-500/20 text-violet-300">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Notification groups ───────────────────────────────── */}
      {groups.length > 0 ? (
        <div className="card overflow-hidden stagger-3 animate-fade-up">
          {groups.map((group, gi) => (
            <div key={group.label}>
              {/* Group label */}
              <div
                className="px-5 py-2.5"
                style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--divider)" }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                  {group.label}
                </span>
              </div>
              {/* Items */}
              {group.items.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notif={notif}
                  onRead={markRead}
                  onDismiss={dismiss}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="card flex flex-col items-center justify-center py-20 stagger-3 animate-fade-up">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.15)" }}
          >
            <Bell size={22} className="text-violet-400 opacity-60" />
          </div>
          <p className="dark:text-slate-300 text-slate-700 text-[14px] font-medium mb-1">
            All caught up
          </p>
          <p className="text-slate-500 text-[12px]">No notifications match this filter.</p>
        </div>
      )}
    </div>
  );
}
