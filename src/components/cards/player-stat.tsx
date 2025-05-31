"use client";

import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import ViewPlayer from "@/app/dashboard/club/players-management/view-player";
import { Player } from "@/types/player";
import { cn } from "@/shared/_utils/cn";

export default function PlayerStats({
  player,
  usertype = "club",
  variant = 1,
}: {
  player: Player;
  usertype?: "club" | "scout";
  variant?: 1 | 2;
}) {
  const [view, setView] = useState(false);
  const [id, setId] = useState("");
  const handleOpenView = (id: string) => {
    setId(id);
    setView(true);
  };
  return (
    <>
      <div
        className={cn(" flex flex-col gap-5", variant === 2 && "md:flex-row")}
      >
        <div className=" flex  gap-3 w-full">
          <Image
            src={player?.profile_img || "/logo.jpg"}
            alt="player-profile"
            height={200}
            width={200}
            className=" aspect-square rounded-lg h-24 w-24 object-cover"
          />
          <div className=" flex flex-col gap-x-20">
            <p className=" text-2xl font-bold">
              {player?.firstName + " " + player?.lastName}
            </p>
            <span className=" text-gray-500">{player?.position}</span>
            <Button
              variant={"unstyled"}
              onClick={() => handleOpenView(player?._id)}
              className=" font-semibold flex items-start gap-2.5 underline px-0 w-fit"
            >
              View Profile <MoveUpRight className=" h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full border-t md:border-t-0 border-gray-200 py-3 flex justify-between flex-wrap gap-2 ">
          {[
            {
              label: "Goals",
              value: player?.goals,
            },
            {
              label: "Assits",
              value: player?.assist,
            },
            {
              label: "Appearances",
              value: player?.appearance,
            },
            {
              label: "Distance",
              value: player?.distance + "km",
            },
            {
              label: "Top Speed",
              value: player?.speed + "km/h",
            },
          ].map((item) => (
            <div key={item?.label} className=" flex flex-col gap-2">
              <span className=" text-gray-500">{item?.label}</span>
              <span className=" text-xl lg:text-2xl font-bold">
                {item?.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ViewPlayer open={view} onClose={setView} id={id} usertype={usertype} />
    </>
  );
}
