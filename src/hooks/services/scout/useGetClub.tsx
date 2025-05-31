import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import clubs from "@/mock-up-data/clubs.json";
import { Club } from "@/types/scout/clubs";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetClub({ id }: { id?: string }) {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<Club>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getClub = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      // const response = await axios.get(`/player/${id}`);
      // const player = response?.data?.data;
      const club_found = clubs.clubs_list.find((p) => p._id === id);
      // if (!club_found) {
      //   throw new Error("No player found");
      // }
      setData(club_found || clubs?.clubs_list[0]);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getClub();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getClub,
  };
}
