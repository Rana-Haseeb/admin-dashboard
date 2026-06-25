// src/components/ui/Button.jsx
import { Loader2 } from "lucide-react";

/**
 * Size tokens.
 * loaderSize is for the built-in Loader2 spinner only —
 * leftIcon / rightIcon are passed as already-sized ReactNodes.
 */
const SIZES = {
  sm: { cls: "px-3 py-1.5 text-[12px] rounded-lg", loaderSize: 13 },
  md: { cls: "px-4 py-2   text-[13px] rounded-lg", loaderSize: 14 },
  lg: { cls: "px-5 py-2.5 text-[14px] rounded-xl", loaderSize: 16 },
};

/**
 * Variant config.
 * `style`      — initial inline style (CSS var refs resolve at runtime).
 * `hoverEnter` — merged into element.style on mouseenter.
 * `hoverLeave` — merged into element.style on mouseleave (restores initial).
 * `cls`        — extra Tailwind classes (color utilities, brightness filter).
 */
const VARIANTS = {
  primary: {
    cls:        "text-white hover:brightness-110 active:scale-95",
    style:      {
      background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
      boxShadow:  "0 0 16px rgba(124,58,237,0.28)",
    },
    hoverEnter: null,
    hoverLeave: null,
  },
  secondary: {
    cls:        "font-medium active:scale-95",
    style:      {
      background: "var(--input-bg)",
      border:     "1px solid var(--input-bdr)",
      color:      "var(--text-secondary)",
    },
    hoverEnter: { background: "var(--overlay-sm)", borderColor: "var(--border-hover)" },
    hoverLeave: { background: "var(--input-bg)",   borderColor: "var(--input-bdr)"    },
  },
  outline: {
    cls:        "font-medium active:scale-95",
    style:      {
      background: "transparent",
      border:     "1px solid var(--border)",
      color:      "var(--text-primary)",
    },
    hoverEnter: { background: "var(--overlay-sm)", borderColor: "var(--border-hover)" },
    hoverLeave: { background: "transparent",       borderColor: "var(--border)"       },
  },
  ghost: {
    cls:        "font-medium active:scale-95",
    style:      {
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
 * @param {"primary"|"secondary"|"outline"|"ghost"} [variant="primary"]
 * @param {"sm"|"md"|"lg"} [size="md"]
 * @param {React.ReactNode} [leftIcon]   — rendered before label
 * @param {React.ReactNode} [rightIcon]  — rendered after label
 * @param {boolean} [loading=false]      — shows spinner, disables interaction
 * @param {boolean} [disabled=false]
 * @param {string}  [className=""]       — merged onto root element
 *
 * @example
 * <Button leftIcon={<Plus size={14} />}>Add User</Button>
 * <Button variant="outline" size="sm" rightIcon={<ArrowRight size={13} />}>Export</Button>
 * <Button loading>Saving…</Button>
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
  const { cls: sizeCls, loaderSize }             = SIZES[size]    ?? SIZES.md;
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
      {/* Left icon or spinner */}
      {loading ? (
        <Loader2 size={loaderSize} className="animate-spin flex-shrink-0" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}

      {/* Label */}
      {children && <span>{children}</span>}

      {/* Right icon (hidden during loading) */}
      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
