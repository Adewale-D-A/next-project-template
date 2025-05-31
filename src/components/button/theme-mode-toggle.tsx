"use client";

import { cn } from "@/shared/_utils/cn";
import { Moon, SunMoon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function ThemeModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // automatically the operating system's theme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const state = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.classList.toggle("dark", state);
      setDarkMode(state);
    }
  }, []);

  // toggle between themes
  const darkModeHandler = useCallback(() => {
    setDarkMode((prev) => !prev);
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark");
    }
  }, []);

  return (
    <div className=" relative w-[30px] h-[17px] text-[16px]">
      <label htmlFor="theme-mode relative">
        <Moon
          className={cn(
            darkMode && "z-50 absolute top-[3px] left-[4px]",
            !darkMode && " hidden",
            "text-amber-200 transition-all h-[12px] w-[12px]"
          )}
          strokeWidth={3}
        />
        <SunMoon
          className={cn(
            darkMode && " hidden",
            !darkMode && "z-50 absolute top-[3px] right-0 left-[23px]",
            "text-dark-ash-500  transition-all h-[12px] w-[12px]"
          )}
          strokeWidth={3}
        />
        <label className="relative inline-block w-[40px] h-[19.5px]">
          <input
            type="checkbox"
            onChange={() => darkModeHandler()}
            checked={darkMode}
            title="toggle-button"
            id={"theme-mode"}
            className="hidden toggle-input"
          />
          <span className="slider before:w-[13px] before:h-[13px] border-[2px] border-dark-ash-900 dark:border-amber-200 before:absolute before:left-[2px] dark:before:left-[10px]  before:bottom-[1px] dark:before:bg-amber-200 before:bg-dark-ash-500 before:rounded-full absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-amber-200 transition-all rounded-full"></span>
        </label>
      </label>
    </div>
  );
}
