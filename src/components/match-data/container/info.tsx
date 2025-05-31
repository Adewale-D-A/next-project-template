"use client";
import Loader from "@/components/loader";
import useGetMatchInfo from "@/hooks/services/useGetMatchInfo";
import {
  Calendar,
  Clock10,
  Handshake,
  Hourglass,
  LocateIcon,
} from "lucide-react";
export default function MatchInfo({
  fixtureId,
  usertype = "club",
}: {
  fixtureId: string;
  usertype?: "club" | "scout";
}) {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetMatchInfo({
    fixtureId,
    usertype,
  });
  return (
    <Loader
      {...{ isLoading, isFailed, setIsFailed, retry }}
      className=" rounded-lg border border-gray-200 flex gap-10 flex-wrap p-5"
    >
      {[
        {
          id: 1,
          label: "Date",
          value: data?.date,
          icon: Calendar,
        },
        {
          id: 2,
          label: "Time",
          value: data?.time,
          icon: Clock10,
        },
        {
          id: 3,
          label: "Location",
          value: data?.location,
          icon: LocateIcon,
        },
        {
          id: 4,
          label: "Duration",
          value: `${data?.fulltime}'`,
          icon: Hourglass,
        },
        {
          id: 5,
          label: "Fulltime Scores",
          value: `${data?.club_1?.name} ${data?.club_1?.score} - ${data?.club_2?.score} ${data?.club_2?.name} `,
          icon: Handshake,
        },
      ].map((item) => (
        <div key={item?.id} className=" flex items-center gap-2">
          <item.icon /> {item?.value}
        </div>
      ))}
    </Loader>
  );
}
