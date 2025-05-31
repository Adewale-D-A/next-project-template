"use client";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store-hooks";
import extractProfileClient from "@/utils/auth/extract-profile-client";
import { updateAuthUser, updateUser } from "@/stores/features/auth/auth";
import extractTokenClient from "@/utils/auth/extract-token-client";

//axios instace interceptor for access token integration and refresh tokens
export default function useExtractProfile() {
  const dispatch = useAppDispatch();
  const { status, isLoggedIn, user, token } = useAppSelector(
    (state) => state.auth.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getExtractProfile = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const user = extractProfileClient();
      const token = extractTokenClient()?.token;
      dispatch(updateAuthUser({ user, token }));
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (!status) {
      getExtractProfile();
    }
  }, [status]);

  return {
    data: user,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getExtractProfile,
  };
}
