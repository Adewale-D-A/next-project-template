"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/input/select";
import { ChartNoAxesGantt } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Sort({ applyTheme = true }: { applyTheme?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const onChange = useCallback(
    (value: string) => {
      router.push(pathname + "?" + createQueryString("sort", value));
    },
    [pathname, createQueryString]
  );

  return (
    <Select onValueChange={(e) => onChange(e)}>
      <SelectTrigger applyTheme={applyTheme}>
        <ChartNoAxesGantt />
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent
        className="max-h-[50vh]"
        position="popper"
        applyTheme={applyTheme}
      >
        <SelectGroup>
          {[
            {
              label: "Asc",
              value: "asc",
            },
            {
              label: "Desc",
              value: "desc",
            },
          ].map((option) => (
            <SelectItem value={option?.value} key={option?.value}>
              {option?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
