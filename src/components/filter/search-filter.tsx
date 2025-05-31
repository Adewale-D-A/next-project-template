"use client";
import { Suspense } from "react";
import Search from "../input/search";
import Sort from "../input/sort";
import Loader from "../loader";

export default function SearchAndFilter() {
  return (
    <Suspense
      fallback={
        <Loader isLoading={true} className=" max-h-5">
          ...Loading
        </Loader>
      }
    >
      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-2">
        <div className=" w-full max-w-lg">
          <Search applyTheme={false} />
        </div>
        <div className=" w-fit">
          <Sort applyTheme={false} />
        </div>
      </div>
    </Suspense>
  );
}
