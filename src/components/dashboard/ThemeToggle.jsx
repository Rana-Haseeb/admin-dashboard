import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * ThemeToggle — animated sun/moon button.
 * Reads from ThemeContext; toggling applies/removes .dark on <html>.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex-shrink-0 p-2 rounded-lg transition-colors duration-150"
      style={{
        background: "var(--overlay-sm)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.background  = "var(--overlay-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background  = "var(--overlay-sm)";
      }}
    >
      {/*
        key={theme} forces React to unmount/remount the span on each toggle,
        re-triggering the CSS animation.
      */}
      <span key={theme} className="theme-icon-in">
        {isDark ? (
          <Sun  size={16} style={{ color: "#fbbf24", display: "block" }} />
        ) : (
          <Moon size={16} style={{ color: "#7c3aed", display: "block" }} />
        )}
      </span>
    </button>
  );
}
