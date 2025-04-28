import { cn } from "@/shared/_utils/cn";
import { MoveUpRight } from "lucide-react";

export default function StatsCard({
  title,
  label,
  value,
  valueLabel,
  showIcon,
  valueColorClassName = "text-green-500",
}: {
  title: string;
  label: string;
  value: string;
  valueLabel: string;
  showIcon?: boolean;
  valueColorClassName?: string;
}) {
  return (
    <div className=" rounded-md border border-gray-300 p-3 flex justify-between">
      <div>
        <h6 className=" font-semibold text-lg">{title}</h6>
        <p className=" text-gray-400">{label}</p>
      </div>
      <div>
        <div className=" flex items-end gap-2">
          {showIcon && (
            <div className=" aspect-square rounded-full bg-green-500/15 text-green-500 p-1">
              <MoveUpRight className=" h-4 w-4" />
            </div>
          )}
          <h6 className={cn("text-5xl font-bold", valueColorClassName)}>
            {value}
          </h6>
        </div>
        <p className=" text-gray-400">{valueLabel}</p>
      </div>
    </div>
  );
}
