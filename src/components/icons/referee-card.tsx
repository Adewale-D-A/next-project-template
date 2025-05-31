import { cn } from "@/shared/_utils/cn";

export default function RefereeCard({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-4 rounded-xs", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <rect />
    </svg>
  );
}
