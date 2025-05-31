"use client";
import PlayerCard from "@/components/cards/player";
import { DoughnutChart } from "@/components/charts/doughnut";
import Loader from "@/components/loader";

import NextMatch from "../next-match";
import ActiveCompetition from "../active-competitions";
import useGetWatchlistStats from "@/hooks/services/scout/useGetWatchlistStats";
import useGetPlayerEvaluations from "@/hooks/services/scout/useGetPlayerEvaluations";

export default function DashboardHome() {
  const {
    data: watchlistStats,
    isLoading: isWatchlistStatLoading,
    isFailed: isWatchlistFailed,
    setIsFailed: setIsWatchlistFailed,
    retry: retryWatchlistStat,
  } = useGetWatchlistStats();
  const {
    data: playerEvaluations,
    isLoading: isPlayerEvaluationsLoading,
    isFailed: isPlayerEvaluationsFailed,
    setIsFailed: playerEvaluationSetFailed,
    retry: playerEvaluationRetry,
  } = useGetPlayerEvaluations({});
  return (
    <div className=" w-full flex flex-col gap-5">
      {/* upcoming match and fixtures */}
      <section className=" w-full flex flex-col lg:flex-row gap-4 items-stretch h-full">
        <div className=" w-full flex-3/5  flex flex-col gap-4">
          <NextMatch />
          {/* stats */}
          <Loader
            isLoading={isWatchlistStatLoading}
            isFailed={isWatchlistFailed}
            setIsFailed={setIsWatchlistFailed}
            retry={retryWatchlistStat}
            className=" min-h-96 h-full rounded-xl p-5 border border-gray-200 w-full flex justify-center"
          >
            <DoughnutChart
              data={{
                labels: watchlistStats?.labels,
                datasets: [
                  {
                    label: "",
                    data: watchlistStats?.data,
                    backgroundColor: watchlistStats.hexCodes,
                  },
                ],
              }}
            />
          </Loader>
        </div>
        {/* Active competitions and Recent Player Evaluations */}
        <div className=" w-full flex-2/5 rounded-xl flex flex-col gap-4">
          <div className=" w-full flex-2/5 rounded-xl border border-gray-300 p-5">
            <ActiveCompetition usertype="scout" />
          </div>
          <div className=" w-full flex-2/5 rounded-xl border border-gray-300 p-5 flex flex-col gap-3">
            <h6 className=" text-lg font-bold text-gray-400">
              RECENT PLAYER EVALUATIONS
            </h6>
            <Loader
              isLoading={isPlayerEvaluationsLoading}
              isFailed={isPlayerEvaluationsFailed}
              setIsFailed={playerEvaluationSetFailed}
              retry={playerEvaluationRetry}
              className=" grid grid-col-1 gap-3"
            >
              {playerEvaluations.map((item) => (
                <PlayerCard
                  key={item?.firstName}
                  player={{ ...item }}
                  usertype="scout"
                />
              ))}
            </Loader>
          </div>
        </div>
      </section>
    </div>
  );
}
