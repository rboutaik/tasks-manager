"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const {theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} >
      <Sun className="block dark:hidden"></Sun>
      <Moon className=""></Moon>
    </button>
  );
}
