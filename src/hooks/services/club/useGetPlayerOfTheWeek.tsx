import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store-hooks";
import { updatePlayerOfTheWeek } from "@/stores/features/services/club/player-of-the-week";
import player from "@/mock-up-data/player.json";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetPlayerOfTheWeek() {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector(
    (state) => state.playerOfTheWeek.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getNextMatch = useCallback(async () => {
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
      const data = player?.single_player;
      dispatch(updatePlayerOfTheWeek({ data }));
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
      getNextMatch();
    }
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getNextMatch,
  };
}
