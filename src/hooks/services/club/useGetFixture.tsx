import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store-hooks";
import { updateFixtures } from "@/stores/features/services/club/fixtures";
import match from "@/mock-up-data/match.json";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetFixtures() {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((state) => state.fixtures.value);
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
      const data = match?.fixtures;
      dispatch(updateFixtures({ data }));
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
