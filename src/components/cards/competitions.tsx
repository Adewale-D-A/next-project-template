"use client";

import { Calendar, Ellipsis, Eye, MapPin, Users, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "../button";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/input/dropdown-menu";
import Link from "next/link";
import { cn } from "@/shared/_utils/cn";
import CompetitionParticipationForm from "../competitions/competition-participation-form";
export default function CompetitionsCard({
  _id,
  title,
  category,
  date,
  status,
  usertype = "club",
}: {
  _id: string;
  title: string;
  category: string;
  date: string;
  status: "active" | "available" | "request-sent";
  usertype?: "club" | "scout";
}) {
  const [openParticipation, setOpenParticipation] = useState(false);

  const participate = useCallback(() => {
    setOpenParticipation(true);
  }, []);
  return (
    <>
      <div className=" rounded-lg bg-gray-100 p-4 flex justify-between items-center">
        <div className=" flex flex-col gap-1">
          <h6 className=" font-semibold text-lg">{title}</h6>
          <div className=" flex items-center gap-2">
            <span className=" flex items-center gap-1.5 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              {category}
            </span>
            <span className=" flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
          </div>
        </div>
        <div>
          {(status === "active" || usertype === "scout") && (
            <Link
              href={`/dashboard/${usertype}/competitions/${_id}`}
              className=" flex items-center gap-2 p-2 border border-primary rounded-lg bg-primary/30 hover:scale-110 transition-all"
            >
              View <Eye />
            </Link>
          )}
          {status === "available" && usertype === "club" && (
            <Button
              onClick={() => participate()}
              type="button"
              className=" px-4"
            >
              Participate
            </Button>
          )}
          {status === "request-sent" && usertype === "club" && (
            <span>Request Sent</span>
          )}
        </div>
      </div>
      {openParticipation && (
        <CompetitionParticipationForm
          competitionId={_id}
          open={openParticipation}
          onClose={setOpenParticipation}
        />
      )}
    </>
  );
}

export function CompetitionsCardV2({
  _id,
  title,
  category,
  date,
  img,
  location,
  usertype = "club",
  index = 1,
}: {
  _id: string;
  title: string;
  category: string;
  date: string;
  img: string;
  location: string;
  usertype?: "club" | "scout";
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
        <div className=" flex flex-col gap-3 ">
          <Image
            src={img}
            alt="Stadium"
            height={200}
            width={200}
            className=" h-16 w-16 rounded-lg object-cover"
          />
          <Link
            href={`/dashboard/${usertype}/competitions/${_id}`}
            className=" font-semibold text-lg"
          >
            {title}
          </Link>
          <span className=" flex items-center gap-2 ">
            <MapPin />
            {location}
          </span>
          <div className=" flex items-center gap-2">
            <span className=" flex items-center gap-1.5 text-sm ">
              <Users className="h-4 w-4" />
              {category}
            </span>
            <span className=" flex items-center gap-1.5 text-sm ">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
          </div>
        </div>
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
                  href={`/dashboard/${usertype}/competitions/${_id}`}
                >
                  Open
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
