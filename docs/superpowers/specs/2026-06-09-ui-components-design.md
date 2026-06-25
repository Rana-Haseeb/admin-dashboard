# UI Components Design Spec
**Date:** 2026-06-09
**Scope:** `Button`, `Card`, `MetricCard`, `metricsData`
**Approach:** CSS-var-first + Tailwind utilities (Option A)

---

## 1. Context

The admin-dashboard (React 18 + Vite + Tailwind v3) has a complete CSS-variable token system
(`--bg-card`, `--border`, `--divider`, `--text-primary`, etc.) covering both light and dark themes.
Existing components use CSS vars for color/border tokens and Tailwind for layout/spacing.
This spec adds reusable primitives that match that pattern exactly — no new CSS classes, no new
dependencies.

---

## 2. File Structure

```
src/
  components/
    ui/
      Button.jsx       ← new
      Card.jsx         ← new
    dashboard/
      MetricCard.jsx   ← replaces inline StatCard in DashboardPage.jsx
  data/
    metricsData.js     ← replaces inline STATS array in DashboardPage.jsx
```

---

## 3. Button component

**File:** `src/components/ui/Button.jsx`

### Props

| Prop        | Type                                              | Default     |
|-------------|---------------------------------------------------|-------------|
| `variant`   | `"primary" \| "secondary" \| "outline" \| "ghost"` | `"primary"` |
| `size`      | `"sm" \| "md" \| "lg"`                            | `"md"`      |
| `leftIcon`  | `ReactNode`                                       | —           |
| `rightIcon` | `ReactNode`                                       | —           |
| `loading`   | `boolean`                                         | `false`     |
| `disabled`  | `boolean`                                         | `false`     |
| `className` | `string`                                          | —           |
| `...rest`   | native `<button>` attrs                           | —           |

### Variant styles

- **primary** — `linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)` bg, white text,
  `0 0 16px rgba(124,58,237,0.28)` box-shadow, `hover:brightness-110 active:scale-95`.
- **secondary** — `var(--input-bg)` bg, `var(--input-bdr)` border, `var(--text-secondary)` text,
  `var(--border-hover)` border on hover, `var(--overlay-sm)` bg on hover.
- **outline** — transparent bg, `var(--border)` border, `var(--text-primary)` text,
  `var(--overlay-sm)` bg on hover, `var(--border-hover)` border on hover.
- **ghost** — no border, no bg, `var(--text-secondary)` text, `var(--overlay-sm)` bg on hover.

### Size tokens

| Size | Padding      | Font size   | Icon size |
|------|-------------|-------------|-----------|
| `sm` | `px-3 py-1.5` | `text-[12px]` | 13 |
| `md` | `px-4 py-2`   | `text-[13px]` | 14 |
| `lg` | `px-5 py-2.5` | `text-[14px]` | 16 |

### Icon slots

`leftIcon` / `rightIcon` accept any ReactNode. Rendered inside a `flex items-center gap-1.5`
wrapper alongside the label. When `loading=true`, `leftIcon` is replaced with an inline SVG
spinner; interaction is disabled and opacity drops to 70%.

### Focus ring

`focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:outline-none`

---

## 4. Card component

**File:** `src/components/ui/Card.jsx`

Wraps the existing `.card` CSS class with structured Header / Content / Footer slots.

### Root `Card`

Props: `className`, `padding` (`"none"|"sm"|"md"`, default `"none"`), `...rest`.
Applies `.card` + optional padding utility.

### `Card.Header`

Bottom border via `var(--divider)`. Padding `px-5 py-4`. Props:

| Prop       | Type        | Notes                                                         |
|------------|-------------|---------------------------------------------------------------|
| `title`    | `string`    | Syne font, `dark:text-white text-slate-900`, `text-[13px] font-semibold` |
| `subtitle` | `string`    | Optional. `text-slate-500 text-[11px] mt-0.5`                |
| `icon`     | `ReactNode` | Optional. Rendered in `w-7 h-7` violet-tinted rounded square |
| `action`   | `ReactNode` | Optional. Pushed right via `ml-auto`                         |
| `children` | `ReactNode` | Alternative to `title`/`subtitle` for custom header content  |

### `Card.Content`

Padding `px-5 py-4`. Prop: `noPadding` boolean (for flush tables/charts).

### `Card.Footer`

Top border via `var(--divider)`. Padding `px-5 py-3`.
Prop: `justify` (`"start"|"end"|"between"`, default `"end"`).

---

## 5. MetricCard component

**File:** `src/components/dashboard/MetricCard.jsx`

Thin composition of `Card` + metric data. Single-zone layout (no sub-components).

### Layout (top-to-bottom)

1. Colored blur blob — absolute, top-right, `w-20 h-20`, `blur-2xl`, `opacity-20`
2. Icon square — `w-9 h-9` rounded-lg, tinted bg/border from metric color
3. Value — `text-2xl font-bold font-display dark:text-white text-slate-900`
4. Label — `text-slate-500 text-[12px]`
5. Change badge — emerald pill (`TrendingUp`) or rose pill (`TrendingDown`), `text-[11px]`

### Grid

`grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4` — rendered directly in `DashboardPage.jsx`.

### Migration

Replaces the existing inline `StatCard` component and `STATS` constant in `DashboardPage.jsx`.

---

## 6. metricsData.js

**File:** `src/data/metricsData.js`

```js
// shape
{
  id:         string,          // "revenue" | "users" | "sales" | "sessions"
  label:      string,          // "Total Revenue"
  value:      string,          // "$84,291"
  change:     string,          // "+12.5%"
  changeType: "up" | "down",
  icon:       LucideComponent, // DollarSign | Users | ShoppingCart | Wifi
  color:      string,          // "#7c3aed"
  bg:         string,          // "rgba(124,58,237,0.08)"
  border:     string,          // "rgba(124,58,237,0.18)"
  glow:       string,          // "stat-glow-violet"
}
```

Four entries: **Total Revenue** (violet, DollarSign), **Active Users** (cyan, Users),
**Sales** (emerald, ShoppingCart), **Active Sessions** (amber, Wifi).

---

## 7. DashboardPage migration

- Remove `STATS` constant and `StatCard` function.
- Import `MetricCard` and `METRICS` from `metricsData.js`.
- Replace the existing stats grid with `METRICS.map(m => <MetricCard key={m.id} metric={m} index={i} />)`.

---

## 8. Out of scope

- No shadcn/ui installation.
- No changes to `index.css` or `tailwind.config.js`.
- No other pages modified.
- `Button` and `Card` are not yet wired into other existing pages (that's a separate migration task).
