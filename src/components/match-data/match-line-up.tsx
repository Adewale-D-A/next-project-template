"use client";
import Image from "next/image";
import { ArrowDown, Volleyball } from "lucide-react";
import RefereeCard from "@/components/icons/referee-card";
import { useState } from "react";
import ViewPlayerMatchStat from "@/app/dashboard/view-player-match-stat";
import { cn } from "@/shared/_utils/cn";
import { PlayerLinupRepresentation } from "@/types/player";
import useGetMatchLineup from "@/hooks/services/useGetMatchLineup";
import Loader from "../loader";

export default function MatchLineupData({
  fixtureId,
  usertype = "club",
}: {
  fixtureId: string;
  usertype?: "club" | "scout";
}) {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetMatchLineup({
    fixtureId,
    usertype,
  });
  return (
    <Loader
      {...{ isLoading, isFailed, setIsFailed, retry }}
      className=" w-full"
    >
      <div className=" w-full">
        <Image
          src={"/images/football_pitch_layout.jpg"}
          width={400}
          height={600}
          alt="football-pitch"
          className=" w-full h-auto"
        />
      </div>
      {/* TOP HALF */}
      <div className=" w-full h-full absolute top-0 left-0 z-10px-[10px] pt-[10px]  md:px-[30px] md:pt-[30px]  lg:px-[50px] lg:pt-[50px] flex flex-col gap-2 md:gap-4 items-center">
        {/* keeper */}
        <PlayerRepresentation
          player={data?.team_1?.keeper?.details?.[0]}
          teamLabel={1}
          usertype={usertype}
        />
        {/* defenders */}
        <PlayerRepresentationCollection
          count={data?.team_1?.defenders.count}
          player={data?.team_1?.defenders.details}
          usertype={usertype}
        />
        {/* midfielders */}
        <PlayerRepresentationCollection
          count={data?.team_1?.mid_fielders.count}
          player={data?.team_1?.mid_fielders.details}
          usertype={usertype}
        />
        {/* forwards  */}
        <PlayerRepresentationCollection
          count={data?.team_1?.forwards.count}
          player={data?.team_1?.forwards.details}
          usertype={usertype}
        />
      </div>
      {/* BOTTOM HALF */}
      <div className=" w-full absolute bottom-0 left-0 z-10 px-[10px] pb-[10px]  md:px-[30px] md:pb-[30px]  lg:px-[50px] lg:pb-[50px]  flex flex-col  gap-2 md:gap-4 items-center">
        {/* forwards  */}
        <PlayerRepresentationCollection
          count={data?.team_2?.forwards.count}
          player={data?.team_2?.forwards.details}
          teamLabel={2}
          usertype={usertype}
        />
        {/* midfielders */}
        <PlayerRepresentationCollection
          count={data?.team_2?.mid_fielders.count}
          player={data?.team_2?.mid_fielders.details}
          teamLabel={2}
          usertype={usertype}
        />
        {/* defenders */}
        <PlayerRepresentationCollection
          count={data?.team_2?.defenders.count}
          player={data?.team_2?.defenders.details}
          teamLabel={2}
          usertype={usertype}
        />
        {/* keeper */}
        <PlayerRepresentation
          player={data?.team_2?.keeper?.details?.[0]}
          teamLabel={2}
          usertype={usertype}
        />
      </div>
    </Loader>
  );
}

function PlayerRepresentation({
  player,
  teamLabel = 1,
  usertype = "club",
}: {
  player: PlayerLinupRepresentation;
  teamLabel?: 1 | 2;
  usertype?: "club" | "scout";
}) {
  const [view, setView] = useState(false);
  const handleOpenView = () => {
    // setId(id);
    setView(true);
  };
  return (
    <>
      <div className="w-fit flex flex-col gap-1 lg:gap-2 items-center font-bold text-white">
        <div className=" relative">
          <button
            onClick={() => handleOpenView()}
            className={cn(
              " aspect-square h-6 lg:h-10 text-xs md:text-md  rounded-full hover:scale-110 transition-all cursor-pointer",
              teamLabel === 1 && "bg-dark-ash-900 text-white",
              teamLabel === 2 && "bg-white text-dark-ash-900"
            )}
          >
            {player?.jerseyNumber}
          </button>
          {player?.isGoal && (
            <Volleyball className=" absolute top-[-14px] right-5 md:right-5 lg:right-7 size-4 md:size-5" />
          )}
          {player?.isYellowCard && (
            <RefereeCard className=" bg-yellow-400 absolute top-[-14px] right-1 h-4 w-3  lg:right-3 lg:h-5 lg:w-3 " />
          )}
          {player?.isRedCard && (
            <RefereeCard className="  bg-red-400 absolute top-[-14px] right-[-6px] lg:right-[-3px] h-4 w-3 lg:h-5 lg:w-3 " />
          )}
          {player?.isSubstituted && (
            <ArrowDown className=" text-red-500 absolute bottom-[-14px] right-[-5px] lg:right-10 size-4 md:size-5 lg:size-6" />
          )}
        </div>
        <span className="text-[10px] md:text-sm lg:text-md">
          {player?.name}
        </span>
      </div>
      <ViewPlayerMatchStat
        open={view}
        onClose={setView}
        id={"id"}
        usertype={usertype}
      />
    </>
  );
}

function PlayerRepresentationCollection({
  count,
  player,
  teamLabel = 1,
  usertype = "club",
}: {
  count: number;
  player: PlayerLinupRepresentation[];
  teamLabel?: 1 | 2;
  usertype?: "club" | "scout";
}) {
  return (
    <div
      className={cn(
        " grid gap-2 lg:gap-4",
        count === 1 && "grid-cols-1",
        count === 2 && "grid-cols-2",
        count === 3 && "grid-cols-3",
        count === 4 && "grid-cols-4",
        count === 5 && "grid-cols-5",
        count === 6 && "grid-cols-6"
      )}
    >
      {player?.map((item, index) => (
        <PlayerRepresentation
          key={item?.name}
          player={item}
          teamLabel={teamLabel}
          usertype={usertype}
        />
      ))}
    </div>
  );
}
