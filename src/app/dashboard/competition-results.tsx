"use client";
import TableTemplate from "@/components/tables/table-template";
import { Eye, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/_utils/cn";
import useGetCompetitionResults from "@/hooks/services/useGetCompetitionResults";

export default function CompetitionResultsTable({
  usertype = "club",
  competitionId,
}: {
  usertype?: "club" | "scout";
  competitionId: string;
}) {
  const { data, isLoading, pagination } = useGetCompetitionResults({
    id: competitionId,
    usertype,
  });
  return (
    <TableTemplate
      data={data}
      isLoading={isLoading}
      columns={[
        {
          header: "DATE",
          key: "date",
          render: (row) => <span>{row?.date}</span>,
        },
        {
          header: "CLUB",
          key: "club",
          render: (row) => (
            <div className=" flex items-center gap-2">
              <Link
                href={
                  usertype === "scout"
                    ? `/dashboard/scout/clubs/${row?.club_2?._id}`
                    : "#"
                }
                className={cn(
                  " flex items-center gap-1 ",
                  usertype === "scout" &&
                    "underline hover:cursor-pointer hover:scale-110 transition-all hover:font-bold"
                )}
              >
                <Shield className=" h-4 w-4" /> {row?.club_1?.name}
              </Link>
              <span className=" font-bold italic">VS</span>
              <Link
                href={
                  usertype === "scout"
                    ? `/dashboard/scout/clubs/${row?.club_2?._id}`
                    : "#"
                }
                className={cn(
                  " flex items-center gap-1 ",
                  usertype === "scout" &&
                    "underline hover:cursor-pointer hover:scale-110 transition-all hover:font-bold"
                )}
              >
                <Shield className=" h-4 w-4" /> {row?.club_2?.name}
              </Link>
            </div>
          ),
        },
        {
          header: "Match Data",
          key: "match_data",
          render: (row) => (
            <Link
              href={`/dashboard/${usertype}/match-data/${row?._id}`}
              className=" italic underline"
            >
              <Eye />
            </Link>
          ),
        },
        {
          header: "SCORE",
          key: "score",
          render: (row) => (
            <span>
              {row?.score?.club_1} {row?.score?.club_1}
            </span>
          ),
        },
      ]}
      pagination={pagination}
      showPaginator={true}
    />
  );
}
