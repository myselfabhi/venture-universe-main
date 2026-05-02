"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeCtx = createContext({ theme: "dark", toggle: () => {}, setTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("vu:theme") : null;
    const initial = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const apply = useCallback((next) => {
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("vu:theme", next);
      document.documentElement.dataset.theme = next;
    }
  }, []);

  const toggle = useCallback(() => apply(theme === "dark" ? "light" : "dark"), [theme, apply]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle, setTheme: apply }}>
      {children}
    </ThemeCtx.Provider>
  );
};

export const useTheme = () => useContext(ThemeCtx);
