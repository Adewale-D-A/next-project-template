import useAxiosJson from "@/config/services/axios-json-context";
import { Player } from "@/types/player";
import { useCallback, useEffect, useState } from "react";
import player from "@/mock-up-data/player.json";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetPlayer({ id }: { id?: string }) {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<Player>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getPlayer = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      // const response = await axios.get(`/player/${id}`);
      // const player = response?.data?.data;
      const player_found = player.multiple_players.find((p) => p._id === id);
      if (!player_found) {
        throw new Error("No player found");
      }
      setData(player_found);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getPlayer();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getPlayer,
  };
}
