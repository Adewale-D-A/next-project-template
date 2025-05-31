"use client";
import { ClubCard } from "@/components/cards/club";
import SearchAndFilter from "@/components/filter/search-filter";
import Loader from "@/components/loader";
import Pagination from "@/components/pagination";
import useGetClubs from "@/hooks/services/scout/useGetClubs";

export default function Clubs() {
  const { data, isLoading, isFailed, setIsFailed, retry, pagination } =
    useGetClubs({});
  return (
    <div className=" flex flex-col gap-5">
      <SearchAndFilter />
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {data.map((item, index) => (
          <ClubCard key={item?._id} club={{ ...item }} index={index} />
        ))}
      </Loader>
      <Pagination pagination={pagination} />
    </div>
  );
}
