"use client";
import PlayerStats from "@/components/cards/player-stat";
import SearchAndFilter from "@/components/filter/search-filter";
import Loader from "@/components/loader";
import useGetWatchlist from "@/hooks/services/scout/useGetWatchlist";

export default function Watchlist() {
  const { data, isLoading, isFailed, setIsFailed, retry, pagination } =
    useGetWatchlist({});
  return (
    <div className=" flex flex-col gap-5">
      <SearchAndFilter />
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className=" grid grid-col-1 gap-5"
      >
        {data.map((item) => (
          <div key={item?._id} className=" border border-gray-100 p-5 shadow">
            <PlayerStats player={item} usertype="scout" variant={2} />
          </div>
        ))}
      </Loader>
    </div>
  );
}
