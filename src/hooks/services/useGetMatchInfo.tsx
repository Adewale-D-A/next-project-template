"use client";
import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import match from "@/mock-up-data/match.json";
import { MatchInfo } from "@/types/match";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetMatchInfo({
  usertype = "club",
  fixtureId,
}: {
  usertype?: "club" | "scout";
  fixtureId: string;
}) {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<MatchInfo>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getMatchInfo = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      // const response = await axios.get(`/match-info?${queryString}`);
      // const { admins } = response?.data?.data;
      const data = match?.match_info;
      setData(data);
      return data;
    } catch (error) {
      setIsFailed(true);
      return {};
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getMatchInfo();
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getMatchInfo,
  };
}
