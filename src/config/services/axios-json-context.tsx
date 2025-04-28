"use client";
import { useEffect } from "react";
import { axiosInstance } from "./api-base";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
import { useAppDispatch } from "@/hooks/store-hooks";
import { usePathname } from "next/navigation";
import extractToken from "@/utils/auth/extract-token-client";
// import { updateToken } from "@/stores/features/auth/auth";
import signOut from "@/utils/auth/sign-out-client";
import extractErrMssg from "@/utils/extract-error-msg";

const useAxiosJson = ({
  disableSuccMssg = true,
  disableErrMssg = false,
}: {
  disableSuccMssg?: boolean;
  disableErrMssg?: boolean;
}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { token } = extractToken();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        // console.log({ token });
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;
        // ----log error message using snackbar---
        const errMssg = extractErrMssg(error?.response?.data);
        // ----log error message using snackbar---
        // if (
        //   error?.response?.status === 422 ||
        //   error?.response?.status === 400 ||
        //   error?.response?.status === 500
        // ) {
        const statusMessage = error?.response?.data?.status;
        const hadUnauthenticated =
          error?.response?.data?.message
            ?.toLowerCase()
            .includes("unauthenticated") ||
          statusMessage?.toLowerCase().includes("token") ||
          error?.response?.data?.debug?.toLowerCase().includes("token");
        if (hadUnauthenticated && !originalRequest._retry) {
          // If the request was already sent, we don't want to refresh the token
          // originalRequest._retry = true;
          // const { new_access_token } = await refreshToken({
          //   old_token: token,
          // });
          // dispatch(updateToken(new_access_token || token));
          // console.log({ new_access_token, token, originalRequest });
          // axiosInstance.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${new_access_token}`;
          // return axiosInstance(originalRequest);
        } else if (hadUnauthenticated) {
          signOut(pathname);
          return Promise.reject(error);
        } else if (!disableErrMssg) {
          dispatch(
            openInfobar({
              message: errMssg || "Please try again later",
              isError: true,
            })
          );
          // }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [token]);
  return axiosInstance;
};

export default useAxiosJson;
