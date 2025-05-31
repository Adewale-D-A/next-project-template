"use client";
import useGetClub from "@/hooks/services/scout/useGetClub";
import { ClubCard } from "@/components/cards/club";
import Loader from "@/components/loader";

export default function SingleClub({ id }: { id: string }) {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetClub({ id });
  return (
    <Loader {...{ isLoading, isFailed, setIsFailed, retry }} className="w-full">
      <ClubCard club={{ ...data }} allowDetails={false} />
    </Loader>
  );
}
