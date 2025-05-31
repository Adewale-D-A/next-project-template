"use client";

import { Ellipsis, Trophy, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/input/dropdown-menu";
import { cn } from "@/shared/_utils/cn";
import { Club } from "@/types/scout/clubs";

export function ClubCard({
  club,
  allowDetails = true,
  index = 1,
}: {
  club: Club;
  allowDetails?: boolean;
  index?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-xl  border border-gray-300  text-white",
        " bg-top bg-no-repeat bg-cover bg-black",
        index % 2 === 0 && "bg-[url('/images/bg-2.6.jpg')]",
        index % 2 === 1 && "bg-[url('/images/bg-1.6.jpg')]"
      )}
    >
      <div className="flex justify-between items-start  p-4 bg-black/60 rounded-xl ">
        <div className=" flex flex-col gap-3">
          <Image
            src={club?.logo || "/logo.jpg"}
            alt="Stadium"
            height={200}
            width={200}
            className=" h-16 w-16 rounded-lg"
          />
          <h6 className=" font-semibold text-lg">{club?.name}</h6>
          <div className=" flex items-center gap-2">
            <span className=" flex items-center gap-1.5 text-sm">
              <Trophy className="h-4 w-4" />
              {club?.wins} wins
            </span>
            <span className=" flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4" />
              {club?.players_count} players
            </span>
          </div>
        </div>
        {allowDetails && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-40"
                align="end"
                // forceMount
              >
                <DropdownMenuItem>
                  <Link
                    className=" w-full h-full"
                    href={`/dashboard/scout/clubs/${club?._id}`}
                  >
                    Open
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
