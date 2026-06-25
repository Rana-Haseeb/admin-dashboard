import { createContext, useContext, useEffect, useState } from "react";

/* ─── Context ────────────────────────────────────────────────── */
const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

/* ─── Provider ───────────────────────────────────────────────── */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("adminpro-theme");
      if (saved === "light" || saved === "dark") return saved;
      // Fall back to system preference, default dark if unsupported
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "dark";
    }
  });

  /* Apply / remove the `.dark` class on <html> whenever theme changes */
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("adminpro-theme", theme);
    } catch {
      /* storage blocked in some sandboxes — silently ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────────────── */
export const useTheme = () => useContext(ThemeContext);
