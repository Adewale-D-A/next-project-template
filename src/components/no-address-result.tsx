import { SearchIcon } from "lucide-react";

export default function NoAddressResult({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center p-3 py-5 dark:bg-dark-ash-500 bg-white">
      <div className=" p-1 shadow-sm shadow-primary-500 rounded-full h-12 w-12 text-primary-500 flex items-center justify-center bg-primary-500/30 ">
        <SearchIcon />
      </div>
      <h6 className=" font-semibold ">
        {title ? title : "Could not find your address"}
      </h6>
      <p className=" text-sm text-gray-500">
        {message
          ? message
          : "Refine your search by removing unnecessary address and using landmarks"}
      </p>
    </div>
  );
}
