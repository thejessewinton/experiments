import { useEffect, useMemo, useState } from "react";

export type ThemeMode = "system" | "dark" | "light";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<"system" | "dark" | "light">("dark");

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark" || theme === "light") {
      setTheme(theme);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (event) => {
      setTheme(event.matches ? "dark" : "light");
    });

    return () => {
      mediaQuery.removeEventListener("change", () => null);
    };
  }, []);

  useMemo(() => {
    if (typeof window === "undefined") return;
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else if (theme === "system") {
      localStorage.setItem("theme", "system");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
};
