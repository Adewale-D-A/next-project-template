"use client";
import Loader from "@/components/loader";
import MatchDataSummaryItem from "@/components/match-data/match-summary";
import useGetMatchSummary from "@/hooks/services/useGetMatchSummary";
export default function MatchSummary({
  fixtureId,
  usertype = "club",
}: {
  fixtureId: string;
  usertype?: "club" | "scout";
}) {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetMatchSummary({
    fixtureId,
    usertype,
  });
  return (
    <Loader
      {...{ isLoading, isFailed, setIsFailed, retry }}
      className=" flex flex-col gap-3"
    >
      {data?.summary.map((item) => (
        <MatchDataSummaryItem
          key={item?._id}
          {...item}
          team_a_id={data?.team_a_id}
          team_b_id={data?.team_b_id}
          usertype={usertype}
        />
      ))}
    </Loader>
  );
}
