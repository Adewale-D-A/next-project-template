"use client";
import { cn } from "@/shared/_utils/cn";
import { Volleyball } from "lucide-react";
import RefereeCard from "../icons/referee-card";
import { useState } from "react";
import ViewPlayerMatchStat from "@/app/dashboard/view-player-match-stat";
import { MatchSummaryActions } from "@/types/match";

export default function MatchDataSummaryItem({
  minute,
  team,
  team_id,
  player,
  action,
  score,
  team_a_id,
  team_b_id,
  usertype = "club",
}: {
  minute: string;
  team: string;
  team_id: string;
  player: string;
  action?: "score" | "red-card" | "yellow-card" | string;
  score: string;
  team_a_id: string;
  team_b_id: string;
  usertype?: "club" | "scout";
}) {
  const [view, setView] = useState(false);
  const handleOpenView = () => {
    // setId(id);
    setView(true);
  };
  return (
    <>
      <div
        className={cn(
          " grid grid-cols-6 gap-4 border border-gray-100 p-2 md:p-4 items-center rounded-md",
          (minute === "HT" || minute === "FT") && "bg-gray-100"
        )}
      >
        <span>{minute}</span>
        {team_a_id === team_id ? (
          <button
            onClick={() => handleOpenView()}
            className=" hover:scale-110 transition-all hover:font-bold cursor-pointer"
          >
            {player}
          </button>
        ) : (
          <span></span>
        )}
        <span>
          {team_a_id === team_id ? <ActionToIcon action={action} /> : ""}
        </span>
        <span>{score}</span>
        <span>
          {team_b_id === team_id ? <ActionToIcon action={action} /> : ""}
        </span>
        {team_b_id === team_id ? (
          <button
            onClick={() => handleOpenView()}
            className=" hover:scale-110 transition-all hover:font-bold cursor-pointer"
          >
            {player}
          </button>
        ) : (
          <span></span>
        )}
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

function ActionToIcon({ action }: { action?: MatchSummaryActions }) {
  return (
    <>
      {action === "score" && <Volleyball className=" h-4 w-4 md:h-6 md:w-6" />}
      {action === "red-card" && <RefereeCard className=" bg-red-500" />}
      {action === "yellow-card" && <RefereeCard className=" bg-yellow-400" />}
    </>
  );
}
