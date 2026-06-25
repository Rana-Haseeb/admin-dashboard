// src/components/ui/Card.jsx

/* ─── Card.Header ────────────────────────────────────────────── */
/**
 * @param {string}          [title]    — Syne font, theme-aware text color
 * @param {string}          [subtitle] — muted label below the title
 * @param {React.ReactNode} [icon]     — rendered in a violet-tinted w-7 h-7 square
 * @param {React.ReactNode} [action]   — pushed to the far right via ml-auto
 * @param {React.ReactNode} [children] — alternative to title/subtitle for custom markup
 * @param {string}          [className]
 */
function CardHeader({ title, subtitle, icon, action, children, className = "" }) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 ${className}`}
      style={{ borderBottom: "1px solid var(--divider)" }}
    >
      {/* Optional icon square */}
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
        If children is provided it renders directly (fully custom header).
        Otherwise the structured title + subtitle layout is used.
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

      {/* Optional action element */}
      {action && <div className="ml-auto flex-shrink-0">{action}</div>}
    </div>
  );
}

/* ─── Card.Content ───────────────────────────────────────────── */
/**
 * @param {boolean} [noPadding=false] — remove padding for flush tables/charts
 * @param {string}  [className]
 */
function CardContent({ children, noPadding = false, className = "" }) {
  return (
    <div className={`${noPadding ? "" : "px-5 py-4"} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Card.Footer ────────────────────────────────────────────── */
/**
 * @param {"start"|"end"|"between"} [justify="end"] — flex justify alignment
 * @param {string} [className]
 */
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
 * Structural wrapper around the existing `.card` CSS class.
 *
 * @param {"none"|"sm"|"md"} [padding="none"] — quick padding when not using sub-components
 * @param {string} [className]                — merged alongside `.card`
 *
 * @example — with sub-components
 * <Card>
 *   <Card.Header title="Revenue" subtitle="Last 30 days" icon={<DollarSign size={14} />} />
 *   <Card.Content>…</Card.Content>
 *   <Card.Footer justify="between">
 *     <span>Updated 2m ago</span>
 *     <Button variant="outline" size="sm">Export</Button>
 *   </Card.Footer>
 * </Card>
 *
 * @example — flat with padding shorthand
 * <Card padding="md">
 *   <p>Simple content without sub-components</p>
 * </Card>
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
