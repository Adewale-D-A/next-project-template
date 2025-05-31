import { useCallback, useEffect, useState } from "react";
import useAxiosJson from "@/config/services/axios-json-context";
import { updateWatchlistStats } from "@/stores/features/services/scout/watchlist-stats";
import stats from "@/mock-up-data/stats.json";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { generateHexCode } from "@/lib/schema";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetWatchlistStats() {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.watchlistStats.value
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getWatchlistStats = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      // const response = await axios.get(`/scout-watchlist-stats`);
      // const { admins } = response?.data?.data;
      const hexCodes = stats?.watchlist_stats?.data.map((stat) =>
        generateHexCode()
      );
      const data = stats?.watchlist_stats;
      dispatch(updateWatchlistStats({ data: { ...data, hexCodes } }));
      // return data;
    } catch (error) {
      setIsFailed(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!status) {
      getWatchlistStats();
    }
  }, [status]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getWatchlistStats,
  };
}
