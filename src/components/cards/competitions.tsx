"use client";

import { Calendar, Users } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../button";

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
