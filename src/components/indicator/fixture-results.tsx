import { Check, Minus, Rotate3d, X } from "lucide-react";

export default function FixtureResultStatus({ status }: { status: string }) {
  return (
    <div className=" text-xs font-medium whitespace-nowrap">
      {status?.toLocaleLowerCase().includes("not") ? (
        <div className=" p-1 h-5 w-5 flex items-center justify-center  text-white bg-red-500 rounded-full aspect-square">
          <X className=" h-4 w-4" strokeWidth={4} />
        </div>
      ) : status?.toLocaleLowerCase().includes("in-progress") ? (
        <div className=" p-1 h-5 w-5 flex items-center justify-center  bg-gray-400 text-white rounded-full">
          <Minus className=" h-4 w-4" strokeWidth={4} />
        </div>
      ) : status?.toLocaleLowerCase().includes("completed") ? (
        <div className=" p-1 h-5 w-5 flex items-center justify-center  text-white bg-green-500 rounded-full">
          <Check className=" h-4 w-4" strokeWidth={4} />
        </div>
      ) : (
        <div className=" p-1 h-5 w-5 flex items-center justify-center  bg-yellow-500 text-white rounded-full">
          <Rotate3d className=" h-4 w-4" strokeWidth={4} />
        </div>
      )}
    </div>
  );
}
