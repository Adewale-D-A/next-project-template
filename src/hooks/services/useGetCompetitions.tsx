import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store-hooks";
import queryParamsExtractor from "@/utils/api-query-params-extractor";
import {
  updateCompleted,
  updateInProgess,
  updateUpcoming,
} from "@/stores/features/services/competitions";
import competitions from "@/mock-up-data/competitions.json";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetCompetitions({
  page = 1,
  limit = 10,
  start_date,
  end_date,
  sort = "asc",
  search = "",
  usertype = "club",
  type = "in-progress",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  limit?: number;
  usertype?: "club" | "scout";
  type?: "in-progress" | "upcoming" | "completed";
}) {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { inPorgress, upcoming, completed } = useAppSelector(
    (state) => state.competitions.value
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getCompetitions = useCallback(
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
        // const response = await axios.get(`/competitions?${queryString}`);
        // const { admins } = response?.data?.data;
        if (type === "in-progress") {
          const data = competitions?.in_progress;
          dispatch(updateInProgess({ data }));
        }
        if (type === "upcoming") {
          const data = competitions?.upcoming;
          dispatch(updateUpcoming({ data }));
        }
        if (type === "completed") {
          const data = competitions?.completed;
          dispatch(updateCompleted({ data }));
        }
        // return data;
      } catch (error) {
        setIsFailed(true);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [page, start_date, end_date, sort, search, limit, usertype, type]
  );

  useEffect(() => {
    getCompetitions();
  }, [page, start_date, end_date, sort, search, limit, usertype, type]);

  return {
    data:
      type === "in-progress"
        ? inPorgress?.data
        : type === "upcoming"
        ? upcoming?.data
        : completed?.data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getCompetitions,
  };
}
