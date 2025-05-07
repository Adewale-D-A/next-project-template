import { Check, Minus, Rotate3d, X } from "lucide-react";

export default function Status({ status }: { status: string }) {
  return (
    <div className=" text-xs font-medium whitespace-nowrap">
      {status?.toLocaleLowerCase().includes("injured") ? (
        <span className=" p-1 px-3 bg-red-500/15 text-red-500 rounded-full">
          {status}
        </span>
      ) : status?.toLocaleLowerCase().includes("active") ? (
        <span className=" p-1 px-3 bg-green-500/15 text-green-500 rounded-full">
          {status}
        </span>
      ) : (
        <span className=" p-1 px-3 bg-yellow-500/15 text-yellow-500 rounded-full">
          {status}
        </span>
      )}
    </div>
  );
}
