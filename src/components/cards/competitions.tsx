"use client";

import { Calendar, Ellipsis, MapPin, Users } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../button";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/input/dropdown-menu";
export default function CompetitionsCard({
  id,
  title,
  category,
  date,
  status,
}: {
  id: number;
  title: string;
  category: string;
  date: string;
  status: "active" | "available" | "request-sent";
}) {
  const participateInCompetition = useCallback((id: number) => {}, []);

  return (
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
        {status === "active" && (
          <Button type="button" className=" px-4">
            View
          </Button>
        )}
        {status === "available" && (
          <Button
            onClick={() => participateInCompetition(id)}
            type="button"
            className=" px-4"
          >
            Participate
          </Button>
        )}
        {status === "request-sent" && <span>Request Sent</span>}
      </div>
    </div>
  );
}

export function CompetitionsCardV2({
  id,
  title,
  category,
  date,
  img,
  location,
}: {
  id: number;
  title: string;
  category: string;
  date: string;
  img: string;
  location: string;
}) {
  return (
    <div className=" rounded-xl bg-white border border-gray-300 p-4 flex justify-between items-start">
      <div className=" flex flex-col gap-3">
        <Image
          src={img}
          alt="Stadium"
          height={200}
          width={200}
          className=" h-16 w-16 rounded-lg"
        />
        <h6 className=" font-semibold text-lg">{title}</h6>
        <span className=" flex items-center gap-2 text-gray-500">
          <MapPin />
          {location}
        </span>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40"
            align="end"
            // forceMount
          >
            <DropdownMenuItem>Open</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
