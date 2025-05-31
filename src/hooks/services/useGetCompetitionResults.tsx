"use client";
import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import match from "@/mock-up-data/match.json";
import { Fixtures } from "@/types/match";
import { pagination } from "@/types/types";
import queryParamsExtractor from "@/utils/api-query-params-extractor";

export default function useGetCompetitionResults({
  id,
  page = 1,
  limit = 10,
  start_date,
  end_date,
  sort = "asc",
  search = "",
  usertype = "club",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  limit?: number;
  id?: string;
  usertype?: "club" | "scout";
}) {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<Fixtures[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [pagination, setPagination] = useState<pagination>({} as any);

  const getCompetitionResults = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const { queryString, remakeRequest } = queryParamsExtractor({
          dataset: {
            page: search ? 1 : page,
            start_date: start_date,
            end_date: end_date,
            sort: sort,
            search: search,
            limit: limitless ? 1000 : limit,
          },
        });
        // const response = await axios.get(`/competition-result/${id}`);
        // const player = response?.data?.data;
        const data = match.fixtures;
        const paginationDataset = {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 2,
          from: 1,
          to: 1,
        };
        setPagination(paginationDataset);
        setData(data);
      } catch (error) {
        setIsFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      getCompetitionResults();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getCompetitionResults,
    pagination,
  };
}
