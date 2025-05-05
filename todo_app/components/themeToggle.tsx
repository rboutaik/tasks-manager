"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const {theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} >
      <Sun className="hidden dark:block "></Sun>
      <Moon className="block dark:hidden"></Moon>
    </button>
  );
}
