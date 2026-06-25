import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const ALL_USERS = [
  { id: 1, name: "Sarah Chen",    email: "sarah.chen@email.com",    role: "Admin",  status: "active",   joined: "Jan 12, 2024", avatar: "SC", color: "#7c3aed", lastSeen: "2m ago"   },
  { id: 2, name: "Marcus Webb",   email: "marcus.webb@email.com",   role: "Editor", status: "active",   joined: "Feb 3, 2024",  avatar: "MW", color: "#22d3ee", lastSeen: "1h ago"   },
  { id: 3, name: "Priya Nair",    email: "priya.nair@email.com",    role: "Viewer", status: "inactive", joined: "Mar 8, 2024",  avatar: "PN", color: "#10b981", lastSeen: "3d ago"   },
  { id: 4, name: "Alex Kim",      email: "alex.kim@email.com",      role: "Editor", status: "active",   joined: "Mar 22, 2024", avatar: "AK", color: "#f59e0b", lastSeen: "5m ago"   },
  { id: 5, name: "Jordan Lee",    email: "jordan.lee@email.com",    role: "Viewer", status: "pending",  joined: "Apr 14, 2024", avatar: "JL", color: "#f43f5e", lastSeen: "1w ago"   },
  { id: 6, name: "Mei Zhang",     email: "mei.zhang@email.com",     role: "Admin",  status: "active",   joined: "Apr 30, 2024", avatar: "MZ", color: "#a855f7", lastSeen: "Just now" },
  { id: 7, name: "Tobias Müller", email: "tobias.m@email.com",      role: "Editor", status: "inactive", joined: "May 5, 2024",  avatar: "TM", color: "#06b6d4", lastSeen: "2w ago"   },
  { id: 8, name: "Aisha Diallo",  email: "aisha.d@email.com",       role: "Viewer", status: "active",   joined: "May 18, 2024", avatar: "AD", color: "#84cc16", lastSeen: "30m ago"  },
];

const ROLES  = ["All", "Admin", "Editor", "Viewer"];
const STATUS = ["All", "active", "inactive", "pending"];

const ROLE_STYLE = {
  Admin:  { bg: "rgba(124,58,237,0.12)",  color: "#a78bfa", border: "rgba(124,58,237,0.22)" },
  Editor: { bg: "rgba(34,211,238,0.10)",  color: "#67e8f9", border: "rgba(34,211,238,0.22)" },
  Viewer: { bg: "rgba(100,116,139,0.12)", color: "#94a3b8", border: "rgba(100,116,139,0.2)" },
};

const STATUS_STYLE = {
  active:   { dot: "#22c55e", cls: "badge-active",   label: "Active"   },
  inactive: { dot: "#64748b", cls: "badge-inactive", label: "Inactive" },
  pending:  { dot: "#f59e0b", cls: "badge-pending",  label: "Pending"  },
};

/* ─── Sub-components ─────────────────────────────────────────── */
function RoleBadge({ role }) {
  const s = ROLE_STYLE[role] || ROLE_STYLE.Viewer;
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {role === "Admin" && <Shield size={10} />}
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.inactive;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md ${s.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function UsersPage() {
  const [query,        setQuery]        = useState("");
  const [roleFilter,   setRoleFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage,  setCurrentPage]  = useState(1);
  const PER_PAGE = 6;

  const filtered = ALL_USERS.filter((u) => {
    const q = query.toLowerCase();
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchR = roleFilter   === "All" || u.role   === roleFilter;
    const matchS = statusFilter === "All" || u.status === statusFilter;
    return matchQ && matchR && matchS;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible    = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const handleFilter = (setter) => (e) => { setter(e.target.value); setCurrentPage(1); };

  const counts = STATUS.slice(1).reduce((acc, s) => {
    acc[s] = ALL_USERS.filter((u) => u.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-4">

      {/* ── Summary chips ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 stagger-1 animate-fade-up">
        {[
          { label: "Total Users", value: ALL_USERS.length, dot: "#7c3aed" },
          { label: "Active",      value: counts.active,    dot: "#22c55e" },
          { label: "Inactive",    value: counts.inactive,  dot: "#64748b" },
          { label: "Pending",     value: counts.pending,   dot: "#f59e0b" },
        ].map((chip) => (
          <div key={chip.label} className="card flex items-center gap-2.5 px-4 py-2.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: chip.dot, boxShadow: `0 0 6px ${chip.dot}88` }}
            />
            <span className="text-slate-500 text-[12px]">{chip.label}</span>
            <span className="dark:text-white text-slate-900 text-[15px] font-bold font-display ml-0.5">
              {chip.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Main table card ────────────────────────────────────── */}
      <div className="card stagger-2 animate-fade-up overflow-hidden">

        {/* Toolbar */}
        <div
          className="flex flex-wrap items-center gap-2.5 p-4"
          style={{ borderBottom: "1px solid var(--divider)" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1"
            style={{
              minWidth: "160px",
              maxWidth: "260px",
              background: "var(--input-bg)",
              border: "1px solid var(--input-bdr)",
            }}
          >
            <Search size={13} style={{ color: "var(--text-faint)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search users…"
              value={query}
              onChange={handleFilter(setQuery)}
              className="bg-transparent text-[13px] outline-none flex-1 min-w-0
                         dark:text-slate-200 text-slate-800
                         dark:placeholder-slate-600 placeholder-slate-400"
            />
          </div>

          {/* Role select */}
          <select
            value={roleFilter}
            onChange={handleFilter(setRoleFilter)}
            className="px-3 py-1.5 rounded-lg text-[12px] outline-none cursor-pointer
                       dark:text-slate-300 text-slate-700"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-bdr)",
            }}
          >
            {ROLES.map((r) => <option key={r} value={r}>{r === "All" ? "All Roles" : r}</option>)}
          </select>

          {/* Status select */}
          <select
            value={statusFilter}
            onChange={handleFilter(setStatusFilter)}
            className="px-3 py-1.5 rounded-lg text-[12px] outline-none cursor-pointer
                       dark:text-slate-300 text-slate-700"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-bdr)",
            }}
          >
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex-1" />

          {/* Add user */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white
                       transition-all hover:brightness-110 active:scale-95 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              boxShadow: "0 0 16px rgba(124,58,237,0.28)",
            }}
          >
            <Plus size={13} />
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold tracking-widest text-slate-500 uppercase">User</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold tracking-widest text-slate-500 uppercase hidden sm:table-cell">Role</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold tracking-widest text-slate-500 uppercase hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold tracking-widest text-slate-500 uppercase hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold tracking-widest text-slate-500 uppercase hidden lg:table-cell">Last Seen</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {visible.length > 0 ? visible.map((user) => (
                <tr
                  key={user.id}
                  className="group transition-colors dark:hover:bg-white/[0.02] hover:bg-black/[0.02]"
                  style={{ borderBottom: "1px solid var(--divider)" }}
                >
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${user.color} 0%, ${user.color}88 100%)` }}
                      >
                        {user.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="dark:text-slate-200 text-slate-800 text-[13px] font-medium leading-tight truncate">
                          {user.name}
                        </p>
                        <p className="text-slate-500 text-[11px] truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 hidden sm:table-cell">
                    <RoleBadge role={user.role} />
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-slate-500 text-[12px]">{user.joined}</span>
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-slate-500 text-[12px] font-mono">{user.lastSeen}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded-lg transition-colors
                                   dark:text-slate-600 dark:hover:text-slate-200 dark:hover:bg-white/[0.06]
                                   text-slate-400 hover:text-slate-800 hover:bg-black/[0.06]"
                        title="View"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg transition-colors
                                   dark:text-slate-600 dark:hover:text-slate-200 dark:hover:bg-white/[0.06]
                                   text-slate-400 hover:text-slate-800 hover:bg-black/[0.06]"
                        title="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-14 text-center text-slate-500 text-sm">
                    No users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid var(--divider)" }}
        >
          <span className="text-slate-500 text-[12px]">
            {filtered.length === 0
              ? "No results"
              : `${(currentPage - 1) * PER_PAGE + 1}–${Math.min(currentPage * PER_PAGE, filtered.length)} of ${filtered.length}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg transition-colors disabled:opacity-25 disabled:cursor-not-allowed
                         dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-white/[0.06]
                         text-slate-400 hover:text-slate-800 hover:bg-black/[0.06]"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className="w-7 h-7 rounded-lg text-[12px] font-medium transition-colors"
                style={
                  p === currentPage
                    ? { background: "#7c3aed", color: "#fff" }
                    : { color: "var(--text-secondary)" }
                }
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg transition-colors disabled:opacity-25 disabled:cursor-not-allowed
                         dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-white/[0.06]
                         text-slate-400 hover:text-slate-800 hover:bg-black/[0.06]"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
