"use client";
import CompetitionsCard from "@/components/cards/competitions";
import Loader from "@/components/loader";
import useGetActiveCompetitions from "@/hooks/services/useGetActiveCompetitions";

export default function ActiveCompetition({
  usertype = "club",
}: {
  usertype?: "club" | "scout";
}) {
  const { data, isLoading, isFailed, setIsFailed, retry } =
    useGetActiveCompetitions({});
  return (
    <Loader
      {...{
        isLoading,
        isFailed,
        setIsFailed,
        retry,
      }}
      className="flex flex-col gap-3"
    >
      <h6 className=" text-lg font-bold text-gray-400">ACTIVE COMPETITIONS</h6>
      <div className=" grid grid-col-1 gap-3">
        {data.map((item) => (
          <CompetitionsCard key={item?._id} {...item} usertype={usertype} />
        ))}
      </div>
    </Loader>
  );
}
