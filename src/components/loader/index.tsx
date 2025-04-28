"use client";
import { ReactNode, useCallback } from "react";
import { Button } from "../button";
import { cn } from "@/shared/_utils/cn";
import { RefreshCw } from "lucide-react";

export default function Loader({
  isLoading,
  isFailed,
  setIsFailed,
  retry,
  children,
  ...props
}: {
  isLoading?: boolean;
  isFailed?: boolean;
  setIsFailed?: (val: boolean) => void;
  retry?: () => void;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  const retryRequest = useCallback(() => {
    setIsFailed?.(false);
    retry?.();
  }, [retry]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full min-h-60 animate-pulse rounded-md bg-neutral-300 dark:bg-gray-500",
          className
        )}
        {...rest}
      />
    );
  }

  if (isFailed) {
    return (
      <div
        className={cn(
          "w-full min-h-60 rounded-md flex items-center justify-center bg-gray-100",
          className
        )}
        {...rest}
      >
        <p className=" italic text-gray-500">Failed</p>
        <div>
          <Button
            variant={"urgent"}
            onClick={() => retryRequest()}
            className=" flex items-center gap-2"
          >
            Retry <RefreshCw className=" h-5 w-6" />
          </Button>
        </div>
      </div>
    );
  }
  return <div {...props}>{children}</div>;
}
