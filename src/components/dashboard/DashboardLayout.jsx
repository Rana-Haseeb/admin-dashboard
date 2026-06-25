import { useState } from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import { Menu, Bell, Search, Command, ChevronRight } from "lucide-react";

/* ─── Page metadata ──────────────────────────────────────────── */
const PAGE_META = {
  dashboard:     { title: "Dashboard",     subtitle: "Overview & key metrics" },
  analytics:     { title: "Analytics",     subtitle: "Traffic, conversions & trends" },
  users:         { title: "Users",         subtitle: "Manage team members & roles" },
  settings:      { title: "Settings",      subtitle: "Preferences & configuration" },
  notifications: { title: "Notifications", subtitle: "Activity & alerts" },
  help:          { title: "Help & Docs",   subtitle: "Guides, FAQs & support" },
};

/* ─── Breadcrumb ─────────────────────────────────────────────── */
function Breadcrumb({ page }) {
  return (
    <nav
      className="hidden sm:flex items-center gap-1 text-xs"
      style={{ color: "var(--text-faint)" }}
    >
      <span>Home</span>
      <ChevronRight size={10} style={{ color: "var(--text-faint)" }} />
      <span
        className="font-medium capitalize"
        style={{ color: "var(--text-secondary)" }}
      >
        {page}
      </span>
    </nav>
  );
}

/* ─── Search bar ─────────────────────────────────────────────── */
function SearchBar() {
  return (
    <div
      className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-text transition-colors duration-150"
      style={{
        width: "200px",
        background: "var(--input-bg)",
        border: "1px solid var(--input-bdr)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--input-bdr-h)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--input-bdr)")}
    >
      <Search size={13} style={{ color: "var(--text-faint)", flexShrink: 0 }} />
      <span
        className="text-[13px] flex-1 select-none"
        style={{ color: "var(--text-faint)" }}
      >
        Search...
      </span>
      <div
        className="hidden lg:flex items-center gap-0.5 px-1 py-0.5 rounded text-[10px] flex-shrink-0 font-mono"
        style={{
          background: "var(--overlay-sm)",
          border: "1px solid var(--border)",
          color: "var(--text-faint)",
        }}
      >
        <Command size={9} />K
      </div>
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */
function Header({ activePage, onHamburger }) {
  const meta = PAGE_META[activePage] || PAGE_META.dashboard;

  return (
    <header
      className="flex items-center gap-3 px-4 lg:px-5 flex-shrink-0"
      style={{
        height: "64px",
        background: "var(--header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--header-bdr)",
        position: "relative",
        zIndex: 10,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* Hamburger (mobile) */}
      <button
        onClick={onHamburger}
        className="lg:hidden p-2 -ml-1 rounded-lg transition-colors flex-shrink-0
                   dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-white/[0.06]
                   text-slate-500 hover:text-slate-800 hover:bg-black/[0.06]"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0 mr-2">
        <h2
          className="font-bold text-[15px] leading-tight font-display truncate
                     dark:text-white text-slate-900"
        >
          {meta.title}
        </h2>
        <Breadcrumb page={activePage} />
      </div>

      {/* Search */}
      <SearchBar />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Notification bell */}
      <button
        className="relative p-2 rounded-lg transition-colors flex-shrink-0
                   dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-white/[0.06]
                   text-slate-500 hover:text-slate-800 hover:bg-black/[0.06]"
        aria-label="Notifications"
      >
        <Bell size={17} />
        <span
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ background: "#7c3aed", boxShadow: "0 0 6px rgba(124,58,237,0.7)" }}
        />
      </button>

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center
                   text-white text-[11px] font-bold flex-shrink-0 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #f43f5e 0%, #db2777 100%)",
          boxShadow: "0 0 14px rgba(244,63,94,0.3)",
        }}
        title="Rana Haseeb — Super Admin"
      >
        RH
      </div>
    </header>
  );
}

/* ─── DashboardLayout ────────────────────────────────────────── */
export default function DashboardLayout({ children, activePage, setActivePage }) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="flex h-full overflow-hidden noise"
      style={{ background: "var(--bg-base)", transition: "background 0.25s ease" }}
    >
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activePage={activePage} onHamburger={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-mesh">
          <div className="mx-auto" style={{ padding: "24px", maxWidth: "1280px" }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
