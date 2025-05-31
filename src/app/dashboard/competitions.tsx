"use client";
import { Check, DownloadCloud, RotateCw } from "lucide-react";
import { CompetitionsCardV2 } from "@/components/cards/competitions";
import useGetCompetitions from "@/hooks/services/useGetCompetitions";
import Loader from "@/components/loader";

export function InprogressCompetions({
  usertype = "club",
}: {
  usertype?: "club" | "scout";
}) {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetCompetitions({
    usertype,
    type: "in-progress",
  });
  return (
    <div className=" bg-gray-100 p-3 rounded-2xl border border-gray-300 flex flex-col gap-2">
      <div className=" flex items-center gap-2">
        <RotateCw className=" text-[#9747FF]" />{" "}
        <h6 className=" font-bold text-lg">In progress</h6>{" "}
        <span className=" aspect-square font-bold p-1 px-2 rounded-md bg-white border border-gray-300">
          {data?.length || 0}
        </span>
      </div>
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className=" flex flex-col gap-4"
      >
        {data.map((item, index) => (
          <CompetitionsCardV2
            key={item?._id}
            index={index}
            {...item}
            usertype={usertype}
          />
        ))}
      </Loader>
    </div>
  );
}

export function UpcomingCompetitions({
  usertype = "club",
}: {
  usertype?: "club" | "scout";
}) {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetCompetitions({
    usertype,
    type: "upcoming",
  });
  return (
    <div className=" bg-gray-100 p-3 rounded-2xl border border-gray-300 flex flex-col gap-2">
      <div className=" flex items-center gap-2">
        <DownloadCloud className=" text-[#0EC21A]" />{" "}
        <h6 className=" font-bold text-lg">Upcoming</h6>{" "}
        <span className=" aspect-square font-bold p-1 px-2 rounded-md bg-white border border-gray-300">
          {data?.length || 0}
        </span>
      </div>
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className=" flex flex-col gap-4"
      >
        {data.map((item, index) => (
          <CompetitionsCardV2
            key={item?._id}
            index={index}
            {...item}
            usertype={usertype}
          />
        ))}
      </Loader>
    </div>
  );
}

export function CompletedCompetitions({
  usertype = "club",
}: {
  usertype?: "club" | "scout";
}) {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetCompetitions({
    usertype,
    type: "completed",
  });
  return (
    <div className=" bg-gray-100 p-3 rounded-2xl border border-gray-300 flex flex-col gap-2">
      <div className=" flex items-center gap-2">
        <Check className=" text-[#23A4F3]" />{" "}
        <h6 className=" font-bold text-lg">Completed</h6>{" "}
        <span className=" aspect-square font-bold p-1 px-2 rounded-md bg-white border border-gray-300">
          {data?.length || 0}
        </span>
      </div>
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className=" flex flex-col gap-4"
      >
        {data.map((item, index) => (
          <CompetitionsCardV2
            key={item?._id}
            {...item}
            index={index}
            usertype={usertype}
          />
        ))}
      </Loader>
    </div>
  );
}
