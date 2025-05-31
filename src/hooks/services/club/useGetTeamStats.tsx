import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store-hooks";
import { updateTeamStats } from "@/stores/features/services/club/team-stats";
import stats from "@/mock-up-data/stats.json";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetTeamStats() {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((state) => state.teamStats.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getTeamStats = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      // const response = await axios.get(`/next-match?${queryString}`);
      // const { admins } = response?.data?.data;
      // const { data, current_page, last_page, per_page, total, from, to } =
      //   admins;
      // const paginationDataset = {
      //   current_page,
      //   last_page,
      //   per_page,
      //   total,
      //   from,
      //   to,
      //   length: data?.length,
      // };
      const data = stats?.team_stats;
      dispatch(updateTeamStats({ data }));
      return data;
    } catch (error) {
      setIsFailed(true);
      return {};
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!status) {
      getTeamStats();
    }
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getTeamStats,
  };
}
