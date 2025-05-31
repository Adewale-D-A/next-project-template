import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import { pagination } from "@/types/types";
import queryParamsExtractor from "@/utils/api-query-params-extractor";
import {
  updateClubs,
  addToPaginationHistory,
} from "@/stores/features/services/scout/clubs";
import club from "@/mock-up-data/clubs.json";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetClubs({
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
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.clubs.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getClubs = useCallback(
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
        //check store if this requested data has been saved previously and retirve it
        //if not, make a new request and save into store
        const foundPage = store_pagination.find(
          (item) => item?.pagination_data?.current_page === page
        );
        if (foundPage && !remakeRequest && !skipCache) {
          setPagination(foundPage?.pagination_data);
          dispatch(updateClubs({ data: foundPage?.data }));
        } else {
          // const response = await axios.get(`/players?${queryString}`);
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
          const data = club?.clubs_list;
          const paginationDataset = {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 2,
            from: 1,
            to: 1,
          };
          dispatch(updateClubs({ data }));
          if (!remakeRequest) {
            dispatch(
              addToPaginationHistory({
                pagination_data: paginationDataset,
                data: data,
              })
            );
          }
          setPagination(paginationDataset);
        }
        setIsLoading(false);
        return data;
      } catch (error) {
        setIsFailed(true);
        return [];
      }
    },
    [page, start_date, end_date, sort, search, limit]
  );

  useEffect(() => {
    getClubs();
  }, [page, start_date, end_date, sort, search, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getClubs,
    pagination,
  };
}
