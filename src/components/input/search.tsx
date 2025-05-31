"use client";

import { Input, InputProps } from "@/components/input/text-input";
import { cn } from "@/shared/_utils/cn";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SyntheticEvent, useCallback, useState } from "react";

export default function Search({
  applyTheme = true,
  ...props
}: {
  props?: InputProps;
  applyTheme?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      router.push(pathname + "?" + createQueryString("search", search));
    },
    [search, pathname, createQueryString]
  );
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        {...props}
        applyTheme={applyTheme}
        leftIcon={
          <SearchIcon
            className={cn(
              " text-dark-ash-900",
              applyTheme && "dark:text-white"
            )}
          />
        }
      />
    </form>
  );
}
