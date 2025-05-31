import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import { updatePlayersEvaluation } from "@/stores/features/services/scout/player-evaluations";
import players from "@/mock-up-data/player.json";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetPlayerEvaluations({
  page = 1,
  limit = 10,
  start_date,
  end_date,
  sort = "asc",
  search = "",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  limit?: number;
}) {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector(
    (state) => state.playersEvaluations.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getPlayersEvaluations = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      // const response = await axios.get(`/recent-players-evaluations?${queryString}`);
      // const { admins } = response?.data?.data;
      dispatch(
        updatePlayersEvaluation({ data: players?.multiple_players.slice(0, 4) })
      );
      return data;
    } catch (error) {
      setIsFailed(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!status) {
      getPlayersEvaluations();
    }
  }, [status]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getPlayersEvaluations,
  };
}
