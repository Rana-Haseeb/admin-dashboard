import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  LogOut,
  Bell,
  HelpCircle,
} from "lucide-react";

/* ─── Navigation config ──────────────────────────────────────── */
const NAV_MAIN = [
  { id: "dashboard",   label: "Dashboard",    icon: LayoutDashboard, badge: null  },
  { id: "analytics",   label: "Analytics",    icon: BarChart3,       badge: "New" },
  { id: "users",       label: "Users",        icon: Users,           badge: "24"  },
  { id: "settings",    label: "Settings",     icon: Settings,        badge: null  },
];

const NAV_GENERAL = [
  { id: "notifications", label: "Notifications", icon: Bell,       badge: "3"  },
  { id: "help",          label: "Help & Docs",   icon: HelpCircle, badge: null },
];

/* ─── Tooltip (collapsed desktop mode) ──────────────────────── */
function Tooltip({ label }) {
  return (
    <span
      className="absolute left-full ml-3 px-2.5 py-1.5 text-xs font-medium rounded-lg
                 whitespace-nowrap pointer-events-none z-50
                 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      style={{
        background: "var(--tooltip-bg)",
        color: "var(--tooltip-text)",
        border: "1px solid var(--tooltip-bdr)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
      }}
    >
      {label}
    </span>
  );
}

/* ─── NavItem ────────────────────────────────────────────────── */
function NavItem({ item, isActive, collapsed, isMobile, onClick }) {
  const { label, icon: Icon, badge } = item;
  const showLabel = !collapsed || isMobile;

  return (
    <button
      onClick={onClick}
      title={collapsed && !isMobile ? label : undefined}
      className={`relative group w-full flex items-center rounded-xl text-sm font-medium
                  transition-colors duration-150
                  ${showLabel ? "gap-3 px-3 py-2.5" : "justify-center h-10 w-10 mx-auto"}
                  ${isActive
                    ? "nav-item-active"                    /* color set by CSS var */
                    : "dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/[0.04] text-slate-500 hover:text-slate-900 hover:bg-black/[0.04]"
                  }`}
    >
      {/* Icon */}
      <Icon
        size={17}
        className={`flex-shrink-0 transition-colors ${
          isActive
            ? "dark:text-violet-400 text-violet-600"
            : "dark:text-slate-500 dark:group-hover:text-slate-300 text-slate-400 group-hover:text-slate-700"
        }`}
      />

      {/* Label + badge */}
      {showLabel && (
        <>
          <span className="flex-1 text-left leading-none">{label}</span>
          {badge && (
            <span
              className={`text-[10px] leading-none px-1.5 py-0.5 rounded-md font-semibold
                ${isActive
                  ? "bg-violet-500/25 text-violet-300"
                  : "dark:bg-white/[0.06] dark:text-slate-400 bg-black/[0.06] text-slate-500"
                }`}
            >
              {badge}
            </span>
          )}
        </>
      )}

      {/* Collapsed badge dot */}
      {collapsed && !isMobile && badge && (
        <span
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
          style={{ background: "#7c3aed", boxShadow: "0 0 6px rgba(124,58,237,0.5)" }}
        />
      )}

      {/* Tooltip */}
      {collapsed && !isMobile && <Tooltip label={label} />}
    </button>
  );
}

/* ─── Section label / divider ────────────────────────────────── */
function SectionLabel({ text, collapsed, isMobile }) {
  if (collapsed && !isMobile) {
    return (
      <div
        className="mx-3 my-3"
        style={{ height: "1px", background: "var(--divider)" }}
      />
    );
  }
  return (
    <div className="px-3 pt-4 pb-2">
      <span
        className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: "var(--text-faint)" }}
      >
        {text}
      </span>
    </div>
  );
}

/* ─── Inner sidebar content ──────────────────────────────────── */
function SidebarContent({ activePage, setActivePage, collapsed, isMobile, setMobileOpen }) {
  const handleNav = (id) => {
    setActivePage(id);
    if (isMobile) setMobileOpen(false);
  };

  const showLabel = !collapsed || isMobile;

  return (
    <div className="flex flex-col h-full select-none">

      {/* ── Logo ─────────────────────────────────────────────── */}
      <div
        className={`flex items-center flex-shrink-0 h-16 px-4 gap-3
                    ${!showLabel ? "justify-center px-0" : ""}`}
        style={{ borderBottom: "1px solid var(--divider)" }}
      >
        {/* Logo mark */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
            boxShadow: "0 0 20px rgba(124,58,237,0.4)",
          }}
        >
          <Zap size={14} className="text-white" strokeWidth={2.5} />
        </div>

        {showLabel && (
          <div className="min-w-0 flex-1">
            <h1
              className="text-[15px] font-bold leading-tight tracking-tight font-display
                         dark:text-white text-slate-900"
            >
              AdminPro
            </h1>
            <p
              className="text-[9px] font-semibold tracking-[0.15em] uppercase"
              style={{ color: "var(--text-faint)" }}
            >
              Control Panel
            </p>
          </div>
        )}

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1.5 rounded-lg transition-colors
                       dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-white/5
                       text-slate-400 hover:text-slate-700 hover:bg-black/[0.06]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ── Nav ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-2">
        <SectionLabel text="Main Menu" collapsed={collapsed} isMobile={isMobile} />

        <div className="space-y-0.5">
          {NAV_MAIN.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activePage === item.id}
              collapsed={collapsed}
              isMobile={isMobile}
              onClick={() => handleNav(item.id)}
            />
          ))}
        </div>

        <SectionLabel text="General" collapsed={collapsed} isMobile={isMobile} />

        <div className="space-y-0.5">
          {NAV_GENERAL.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activePage === item.id}
              collapsed={collapsed}
              isMobile={isMobile}
              onClick={() => handleNav(item.id)}
            />
          ))}
        </div>
      </div>

      {/* ── User profile ─────────────────────────────────────── */}
      <div
        className="flex-shrink-0 p-2"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div
          className={`flex items-center rounded-xl p-2 cursor-pointer group transition-colors
                      dark:hover:bg-white/[0.04] hover:bg-black/[0.04]
                      ${showLabel ? "gap-3" : "justify-center"}`}
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center
                         text-white text-[11px] font-bold"
              style={{ background: "linear-gradient(135deg, #f43f5e 0%, #db2777 100%)" }}
            >
              RH
            </div>
            {/* Online dot — border matches sidebar bg */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full pulse-dot"
              style={{
                background: "#22c55e",
                border: "2px solid var(--bg-base)",
              }}
            />
          </div>

          {showLabel && (
            <>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[13px] font-medium truncate leading-tight
                             dark:text-slate-200 text-slate-800"
                >
                  Rana Haseeb
                </p>
                <p
                  className="text-[11px] truncate"
                  style={{ color: "var(--text-faint)" }}
                >
                  Super Admin
                </p>
              </div>
              <LogOut
                size={14}
                className="flex-shrink-0 transition-colors
                           dark:text-slate-600 dark:group-hover:text-rose-400
                           text-slate-400 group-hover:text-rose-500"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Sidebar export ────────────────────────────────────── */
export default function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const sharedProps = { activePage, setActivePage, setMobileOpen };

  return (
    <>
      {/* ── Desktop sidebar ────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col sidebar-bg flex-shrink-0 relative transition-all duration-300 ease-in-out"
        style={{ width: collapsed ? "64px" : "220px" }}
      >
        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
          className="absolute -right-3 top-[19px] z-20 w-6 h-6 rounded-full
                     flex items-center justify-center transition-colors"
          style={{
            background: "var(--collapse-bg)",
            border: "1px solid var(--collapse-bdr)",
            color: "var(--collapse-color)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color       = "var(--text-primary)";
            e.currentTarget.style.borderColor = "var(--border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color       = "var(--collapse-color)";
            e.currentTarget.style.borderColor = "var(--collapse-bdr)";
          }}
        >
          {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>

        <SidebarContent {...sharedProps} collapsed={collapsed} isMobile={false} />
      </aside>

      {/* ── Mobile sidebar ─────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[220px] flex flex-col lg:hidden sidebar-bg
                    transform transition-transform duration-300 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent {...sharedProps} collapsed={false} isMobile={true} />
      </aside>
    </>
  );
}
