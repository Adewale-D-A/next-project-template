"use client";
import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import match from "@/mock-up-data/match.json";
import { MatchSummary } from "@/types/match";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetMatchSummary({
  usertype = "club",
  fixtureId,
}: {
  usertype?: "club" | "scout";
  fixtureId: string;
}) {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<{
    team_a_id: string;
    team_b_id: string;
    summary: MatchSummary[];
  }>({ team_a_id: "", team_b_id: "", summary: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getMatchSummary = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      // const response = await axios.get(`/match-info?${queryString}`);
      // const { admins } = response?.data?.data;
      const data = match?.match_summary;
      setData({ team_a_id: "team_a", team_b_id: "team_b", summary: data });
      return data;
    } catch (error) {
      setIsFailed(true);
      return {};
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getMatchSummary();
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getMatchSummary,
  };
}
