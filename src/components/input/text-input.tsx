"use client";

import { cn } from "@/shared/_utils/cn";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  applyTheme?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, leftIcon, rightIcon, applyTheme = true, ...props },
    ref
  ) => {
    const [showPwd, setShowPwd] = React.useState(false);
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {leftIcon}
          </div>
        )}
        {type === "password" ? (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-4"
            onClick={() =>
              type === "password" ? setShowPwd(!showPwd) : undefined
            }
          >
            {showPwd ? <EyeOff color="#858C95" /> : <Eye color="#858C95" />}
          </div>
        ) : rightIcon ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {rightIcon}
          </div>
        ) : null}
        <input
          type={showPwd ? "text" : type}
          className={cn(
            "flex h-10 w-full shadow-none rounded-md border border-gray-200  placeholder:text-gray-300  bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            applyTheme &&
              "dark:bg-dark-ash-700 dark:border-none dark:text-white dark:placeholder:text-dark-ash-500",
            className,
            leftIcon && "pl-12",
            rightIcon && "pr-12"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
