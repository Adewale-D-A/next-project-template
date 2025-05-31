"use client";
import { cn } from "@/shared/_utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabVariant2({
  data,
}: {
  data: { label: string; url: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-start gap-5 border-b border-primary flex-wrap">
      {data.map((option) => (
        <Link
          href={option?.url}
          key={option?.label}
          className={cn(
            pathname.startsWith(option?.url) &&
              " text-amber-600 border-b-2 border-primary-dull font-bold",
            "px-4 text-center py-4 hover:border-b-2 hover:border-amber-600 transition-all"
          )}
        >
          {option?.label}
        </Link>
      ))}
    </div>
  );
}
