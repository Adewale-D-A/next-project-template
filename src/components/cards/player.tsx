"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ViewPlayer from "@/app/dashboard/club/players-management/view-player";
import { useState } from "react";
import { Button } from "../button";
import { Player } from "@/types/player";

export default function PlayerCard({
  player,
  usertype = "club",
}: {
  player: Player;
  usertype?: "club" | "scout";
}) {
  const [view, setView] = useState(false);
  const handleOpenView = () => {
    setView(true);
  };
  return (
    <>
      <Button
        variant={"unstyled"}
        onClick={() => handleOpenView()}
        className=" rounded-lg bg-gray-100 p-4 flex justify-between items-start hover:scale-105 transition-all hover:cursor-pointer hover:bg-green-100"
      >
        <div className=" flex items-center gap-2">
          <Image
            src={player?.profile_img || "/logo.jpg"}
            alt="profile"
            height={200}
            width={200}
            className=" h-16 w-16 rounded-full aspect-square"
          />
          <div>
            <span className=" font-bold text-lg">
              {player?.firstName} {player?.lastName}
            </span>
            <div className="text-left text-gray-500">
              <span>{player?.position}</span> <span>{player?.ability}</span>
            </div>
          </div>
        </div>
        <ArrowUpRight />
      </Button>
      {view && (
        <ViewPlayer
          open={view}
          onClose={setView}
          id={player?._id}
          usertype={usertype}
        />
      )}
    </>
  );
}
