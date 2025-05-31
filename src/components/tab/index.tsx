"use client";
import { cn } from "@/shared/_utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tab({
  data,
}: {
  data: { label: string; url: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-5 border-b border-primary flex-wrap">
      {data.map((option) => (
        <Link
          href={option?.url}
          key={option?.label}
          className={cn(
            pathname.startsWith(option?.url) &&
              " text-primary-dull border-b-2 border-primary-dull font-bold text-2xl",
            "px-4 text-center py-4 hover:border-b-2 hover:border-primary-dull transition-all"
          )}
        >
          {option?.label}
        </Link>
      ))}
    </div>
  );
}
