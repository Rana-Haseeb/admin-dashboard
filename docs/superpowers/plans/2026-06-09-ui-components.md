# UI Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `Button` and `Card` reusable primitives to `src/components/ui/`, then use them to
build a `MetricCard` component backed by a `metricsData.js` constant that replaces the inline
`StatCard`/`STATS` in `DashboardPage.jsx`.

**Architecture:** CSS-var-first + Tailwind utilities — no new CSS classes added to `index.css`,
no new npm packages. `Card` wraps the existing `.card` CSS class with Header/Content/Footer
sub-components. `Button` drives hover/border states with `onMouseEnter`/`onMouseLeave` handlers
that assign CSS variable references (matching the pattern already used in `Sidebar.jsx` and
`ThemeToggle.jsx`).

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, Lucide React. No test runner is configured —
verification is done visually via the Vite dev server (`npm run dev`).

---

## File Map

| Status | Path | Action |
|--------|------|--------|
| Create | `src/data/metricsData.js` | Single source of truth for the 4 metric constants |
| Create | `src/components/ui/Button.jsx` | Reusable Button with 4 variants, 3 sizes, icon slots, loading state |
| Create | `src/components/ui/Card.jsx` | Card wrapper + Header / Content / Footer sub-components |
| Create | `src/components/dashboard/MetricCard.jsx` | Metric card built on `Card` + `metricsData` |
| Modify | `src/pages/DashboardPage.jsx` | Remove `STATS` + `StatCard`; import `MetricCard` + `METRICS` |

---

## Task 1 — `src/data/metricsData.js`

**Files:**
- Create: `src/data/metricsData.js`

- [ ] **Step 1: Create the file with exact content**

```js
// src/data/metricsData.js
import { DollarSign, Users, ShoppingCart, Wifi } from "lucide-react";

export const METRICS = [
  {
    id:         "revenue",
    label:      "Total Revenue",
    value:      "$84,291",
    change:     "+12.5%",
    changeType: "up",
    icon:       DollarSign,
    color:      "#7c3aed",
    bg:         "rgba(124,58,237,0.08)",
    border:     "rgba(124,58,237,0.18)",
    glow:       "stat-glow-violet",
  },
  {
    id:         "users",
    label:      "Active Users",
    value:      "12,847",
    change:     "+8.2%",
    changeType: "up",
    icon:       Users,
    color:      "#22d3ee",
    bg:         "rgba(34,211,238,0.07)",
    border:     "rgba(34,211,238,0.15)",
    glow:       "stat-glow-cyan",
  },
  {
    id:         "sales",
    label:      "Sales",
    value:      "3,284",
    change:     "+5.7%",
    changeType: "up",
    icon:       ShoppingCart,
    color:      "#10b981",
    bg:         "rgba(16,185,129,0.07)",
    border:     "rgba(16,185,129,0.15)",
    glow:       "stat-glow-emerald",
  },
  {
    id:         "sessions",
    label:      "Active Sessions",
    value:      "3,429",
    change:     "-2.4%",
    changeType: "down",
    icon:       Wifi,
    color:      "#f59e0b",
    bg:         "rgba(245,158,11,0.07)",
    border:     "rgba(245,158,11,0.15)",
    glow:       "stat-glow-amber",
  },
];
```

- [ ] **Step 2: Verify the file was saved**

Open `src/data/metricsData.js` and confirm all 4 entries are present with correct `id`, `label`,
`value`, `change`, `changeType`, `icon`, `color`, `bg`, `border`, and `glow` fields.

---

## Task 2 — `src/components/ui/Button.jsx`

**Files:**
- Create: `src/components/ui/Button.jsx`

Note: `src/components/ui/` does not exist yet — the file write will create it implicitly.

- [ ] **Step 1: Create the file with exact content**

```jsx
// src/components/ui/Button.jsx
import { Loader2 } from "lucide-react";

/**
 * Size tokens — padding, font size, icon size.
 * Icon size is purely for the built-in Loader2 spinner;
 * leftIcon/rightIcon are passed as already-sized ReactNodes.
 */
const SIZES = {
  sm: { cls: "px-3 py-1.5 text-[12px] rounded-lg", loaderSize: 13 },
  md: { cls: "px-4 py-2   text-[13px] rounded-lg", loaderSize: 14 },
  lg: { cls: "px-5 py-2.5 text-[14px] rounded-xl", loaderSize: 16 },
};

/**
 * Variant config.
 * `style`      — applied as the initial inline style.
 * `hoverEnter` — object merged into element.style on mouseenter (CSS var refs resolve at runtime).
 * `hoverLeave` — object merged into element.style on mouseleave (restores initial state).
 * `cls`        — extra Tailwind classes (text color, brightness filter, etc.).
 */
const VARIANTS = {
  primary: {
    cls:   "text-white hover:brightness-110 active:scale-95",
    style: {
      background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
      boxShadow:  "0 0 16px rgba(124,58,237,0.28)",
    },
    hoverEnter: null,
    hoverLeave: null,
  },
  secondary: {
    cls:   "font-medium active:scale-95",
    style: {
      background: "var(--input-bg)",
      border:     "1px solid var(--input-bdr)",
      color:      "var(--text-secondary)",
    },
    hoverEnter: { background: "var(--overlay-sm)", borderColor: "var(--border-hover)" },
    hoverLeave: { background: "var(--input-bg)",   borderColor: "var(--input-bdr)"    },
  },
  outline: {
    cls:   "font-medium active:scale-95",
    style: {
      background: "transparent",
      border:     "1px solid var(--border)",
      color:      "var(--text-primary)",
    },
    hoverEnter: { background: "var(--overlay-sm)", borderColor: "var(--border-hover)" },
    hoverLeave: { background: "transparent",       borderColor: "var(--border)"       },
  },
  ghost: {
    cls:   "font-medium active:scale-95",
    style: {
      background: "transparent",
      color:      "var(--text-secondary)",
    },
    hoverEnter: { background: "var(--overlay-sm)" },
    hoverLeave: { background: "transparent"       },
  },
};

/**
 * Button
 *
 * @param {"primary"|"secondary"|"outline"|"ghost"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {React.ReactNode} leftIcon   — rendered before label (pass already-sized icon)
 * @param {React.ReactNode} rightIcon  — rendered after label (pass already-sized icon)
 * @param {boolean} loading            — shows spinner, disables button
 * @param {boolean} disabled
 * @param {string}  className          — merged onto root element
 */
export default function Button({
  variant   = "primary",
  size      = "md",
  leftIcon,
  rightIcon,
  loading   = false,
  disabled  = false,
  className = "",
  children,
  ...rest
}) {
  const { cls: sizeCls, loaderSize } = SIZES[size]    ?? SIZES.md;
  const { cls: varCls, style, hoverEnter, hoverLeave } = VARIANTS[variant] ?? VARIANTS.primary;
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-1.5",
        "font-semibold select-none transition-all duration-150",
        "focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        sizeCls,
        varCls,
        className,
      ].join(" ")}
      style={style}
      onMouseEnter={hoverEnter ? (e) => Object.assign(e.currentTarget.style, hoverEnter) : undefined}
      onMouseLeave={hoverLeave ? (e) => Object.assign(e.currentTarget.style, hoverLeave) : undefined}
      {...rest}
    >
      {loading ? (
        <Loader2 size={loaderSize} className="animate-spin flex-shrink-0" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}

      {children && <span>{children}</span>}

      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Visually verify Button in the browser**

Start the dev server if it isn't running:
```
cd admin-dashboard
npm run dev
```

Temporarily add a smoke-test block to `App.jsx` (remove after checking):

```jsx
// Temporary — add inside <ThemeProvider> before <AppShell />, then delete
import Button from "./components/ui/Button";
import { Plus, ArrowRight } from "lucide-react";

// Inside return:
<div style={{ display:"flex", gap:8, padding:16, flexWrap:"wrap" }}>
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button size="sm" leftIcon={<Plus size={13}/>}>Small</Button>
  <Button size="lg" rightIcon={<ArrowRight size={16}/>}>Large</Button>
  <Button loading>Loading</Button>
  <Button disabled>Disabled</Button>
</div>
```

Verify in browser (both dark and light mode via the toggle):
- Primary renders violet gradient with glow shadow
- Secondary renders with `var(--input-bg)` background; border/bg change on hover
- Outline renders transparent with border; border/bg change on hover
- Ghost renders transparent, bg appears on hover
- Icons render inline with correct `gap-1.5` spacing
- Loading shows spinner and disables click
- Disabled is faded and non-interactive
- Toggle to light mode — all variants still readable

Remove the smoke-test block from `App.jsx` after verification.

---

## Task 3 — `src/components/ui/Card.jsx`

**Files:**
- Create: `src/components/ui/Card.jsx`

- [ ] **Step 1: Create the file with exact content**

```jsx
// src/components/ui/Card.jsx

/* ─── Card.Header ────────────────────────────────────────────── */
function CardHeader({ title, subtitle, icon, action, children, className = "" }) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 ${className}`}
      style={{ borderBottom: "1px solid var(--divider)" }}
    >
      {/* Optional icon in a violet-tinted square */}
      {icon && (
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(124,58,237,0.15)",
            border:     "1px solid rgba(124,58,237,0.2)",
          }}
        >
          {icon}
        </div>
      )}

      {/*
        If `children` is provided, render it directly (custom header content).
        Otherwise fall back to the structured title/subtitle layout.
      */}
      {children ?? (
        <div className="flex-1 min-w-0">
          {title && (
            <h3
              className="dark:text-white text-slate-900
                         text-[13px] font-semibold font-display leading-tight"
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-slate-500 text-[11px] mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      {/* Optional action (Button, link, etc.) pushed to the right */}
      {action && <div className="ml-auto flex-shrink-0">{action}</div>}
    </div>
  );
}

/* ─── Card.Content ───────────────────────────────────────────── */
function CardContent({ children, noPadding = false, className = "" }) {
  return (
    <div className={`${noPadding ? "" : "px-5 py-4"} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Card.Footer ────────────────────────────────────────────── */
function CardFooter({ children, justify = "end", className = "" }) {
  const justifyCls =
    justify === "start"   ? "justify-start"   :
    justify === "between" ? "justify-between" :
    "justify-end";

  return (
    <div
      className={`flex items-center gap-2 px-5 py-3 ${justifyCls} ${className}`}
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      {children}
    </div>
  );
}

/* ─── Card (root) ────────────────────────────────────────────── */
/**
 * Wraps the existing `.card` CSS class with optional Header / Content / Footer slots.
 *
 * @param {"none"|"sm"|"md"} padding  — quick padding when not using sub-components
 * @param {string} className          — merged alongside `.card`
 */
function Card({ children, className = "", padding = "none", ...rest }) {
  const padCls =
    padding === "sm" ? "p-3" :
    padding === "md" ? "p-5" :
    "";

  return (
    <div className={`card ${padCls} ${className}`} {...rest}>
      {children}
    </div>
  );
}

Card.Header  = CardHeader;
Card.Content = CardContent;
Card.Footer  = CardFooter;

export default Card;
```

- [ ] **Step 2: Visually verify Card in the browser**

Add a temporary smoke-test to `App.jsx`:

```jsx
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import { BarChart3 } from "lucide-react";

// Inside return, below the Button row:
<div style={{ padding: 16, maxWidth: 400 }}>
  <Card>
    <Card.Header
      title="Monthly Revenue"
      subtitle="Last 30 days"
      icon={<BarChart3 size={14} className="text-violet-400" />}
      action={<Button variant="ghost" size="sm">View all</Button>}
    />
    <Card.Content>
      <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
        Chart placeholder
      </p>
    </Card.Content>
    <Card.Footer justify="between">
      <span style={{ color: "var(--text-faint)", fontSize: 12 }}>Updated 2m ago</span>
      <Button variant="outline" size="sm">Export</Button>
    </Card.Footer>
  </Card>
</div>
```

Verify:
- Card renders with correct `--bg-card` background and `--border` border
- Header shows icon square, title in Syne font, subtitle, action button pushed right
- Divider line between Header and Content, and between Content and Footer
- Footer renders with `justify-between` layout
- Toggle to light mode — card is white/near-white, text is dark, dividers visible

Remove the smoke-test block from `App.jsx` after verification.

---

## Task 4 — `src/components/dashboard/MetricCard.jsx`

**Files:**
- Create: `src/components/dashboard/MetricCard.jsx`

MetricCard uses `Card` as its root (for the `.card` class + overridable style) but has a
single-zone flat layout — no Header/Content/Footer sub-components.

- [ ] **Step 1: Create the file with exact content**

```jsx
// src/components/dashboard/MetricCard.jsx
import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "../ui/Card";

/**
 * MetricCard — renders one entry from METRICS (src/data/metricsData.js).
 *
 * @param {{ id, label, value, change, changeType, icon, color, bg, border, glow }} metric
 * @param {number} index — used for stagger animation class (0-based)
 */
export default function MetricCard({ metric, index }) {
  const {
    label, value, change, changeType,
    icon: Icon, color, bg, border, glow,
  } = metric;

  const isUp = changeType === "up";

  return (
    <Card
      className={`card-lift ${glow} stagger-${index + 1} animate-fade-up p-5 relative overflow-hidden`}
      style={{ background: bg, borderColor: border }}
    >
      {/* Colored blur blob — decorative, top-right */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20 blur-2xl pointer-events-none"
        style={{ background: color }}
      />

      {/* Icon square */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${color}22`,
          border:     `1px solid ${color}33`,
        }}
      >
        <Icon size={17} style={{ color }} />
      </div>

      {/* Value */}
      <p className="dark:text-white text-slate-900 text-2xl font-bold font-display leading-none mb-1">
        {value}
      </p>

      {/* Label */}
      <p className="text-slate-500 text-[12px] mb-3">{label}</p>

      {/* Change badge */}
      <div
        className={[
          "inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-md",
          isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400",
        ].join(" ")}
      >
        {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {change} vs last month
      </div>
    </Card>
  );
}
```

- [ ] **Step 2: Verify the file was saved**

Check `src/components/dashboard/MetricCard.jsx` exists and imports both `Card` and
`TrendingUp`/`TrendingDown` from the correct paths.

---

## Task 5 — Migrate `DashboardPage.jsx`

**Files:**
- Modify: `src/pages/DashboardPage.jsx`

Replace the inline `STATS` constant and `StatCard` function with `METRICS` + `MetricCard`.
All other parts of `DashboardPage.jsx` (WeeklyChart, ActivityFeed, TopPages, SummaryRow)
remain **unchanged**.

- [ ] **Step 1: Remove old imports and add new ones**

At the top of `DashboardPage.jsx`, the current import block is:

```jsx
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Wifi,
  Eye,
  ArrowUpRight,
  MoreHorizontal,
  Clock,
  ShoppingCart,
  UserPlus,
  Bug,
  GitPullRequest,
} from "lucide-react";
```

Replace it with (keep only what the remaining components use):

```jsx
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
import { METRICS } from "../data/metricsData";
```

`DollarSign`, `Users`, `Wifi`, `Eye`, and `TrendingDown` are now owned by `metricsData.js` and
`MetricCard.jsx` — removing them from `DashboardPage` avoids the unused-import warning.

- [ ] **Step 2: Remove the `STATS` constant**

Delete the entire `STATS` block (lines starting with `const STATS = [` through the closing `];`):

```jsx
// DELETE THIS ENTIRE BLOCK:
const STATS = [
  { label: "Total Revenue", value: "$84,291", change: "+12.5%", up: true,  icon: DollarSign, color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.18)", glow: "stat-glow-violet" },
  { label: "Active Users",  value: "12,847",  change: "+8.2%",  up: true,  icon: Users,      color: "#22d3ee", bg: "rgba(34,211,238,0.07)",  border: "rgba(34,211,238,0.15)",  glow: "stat-glow-cyan"   },
  { label: "Live Sessions", value: "3,429",   change: "-2.4%",  up: false, icon: Wifi,       color: "#f59e0b", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.15)",  glow: "stat-glow-amber"  },
  { label: "Page Views",    value: "98.2K",   change: "+18.1%", up: true,  icon: Eye,        color: "#10b981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.15)",  glow: "stat-glow-emerald"},
];
```

- [ ] **Step 3: Remove the `StatCard` function**

Delete the entire `StatCard` component (everything from `/* ─── Stat card ───` through the
closing `}` of the function, inclusive of the JSDoc comment block).

- [ ] **Step 4: Replace the stats grid in the `DashboardPage` return**

Find:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
  {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
</div>
```

Replace with:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
  {METRICS.map((metric, i) => (
    <MetricCard key={metric.id} metric={metric} index={i} />
  ))}
</div>
```

- [ ] **Step 5: Verify in the browser**

With the dev server running (`npm run dev`), navigate to the Dashboard page.

Checklist:
- 4 metric cards appear: Total Revenue, Active Users, Sales, Active Sessions
- Each has a colored icon square, large value, label, and change badge
- Emerald badge on Revenue/Users/Sales (+), rose badge on Sessions (−)
- Hover lifts the card (`card-lift` transform)
- Stagger animation plays on page load (cards fade up sequentially)
- Toggle to light mode — all 4 cards readable with dark text on light tinted backgrounds
- No console errors or missing-import warnings in the browser dev tools

---

## Self-Review

**Spec coverage:**
- ✅ `metricsData.js` — Task 1
- ✅ `Button.jsx` (4 variants, 3 sizes, leftIcon/rightIcon, loading, disabled, focus ring) — Task 2
- ✅ `Card.jsx` (Header with icon/title/subtitle/action, Content with noPadding, Footer with justify) — Task 3
- ✅ `MetricCard.jsx` (uses Card, glow blob, icon square, value, label, change badge) — Task 4
- ✅ `DashboardPage.jsx` migration (remove STATS/StatCard, import METRICS/MetricCard) — Task 5
- ✅ No new CSS classes added — all styling via CSS vars + Tailwind

**Placeholder scan:** No TBD/TODO/fill-in language. All code blocks are complete.

**Type consistency:**
- `METRICS[].changeType` is `"up"|"down"` — `MetricCard` checks `changeType === "up"` ✓
- `METRICS[].icon` is a Lucide component — called as `<Icon size={17} />` ✓
- `Card` accepts `className` + `...rest` — `MetricCard` passes `style` via `...rest` ✓
- `Button` `SIZES[size].loaderSize` used only for `<Loader2>` — not for user-passed icons ✓
