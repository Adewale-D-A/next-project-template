"use client";

import { Eye, Pencil } from "lucide-react";
import { Button } from "@/components/button";
import Image from "next/image";
import RatingStars from "@/components/rating";
import formatDate from "@/utils/dates/isoDateConverter";
import Status from "@/components/indicator/status";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/input/dropdown-menu";
import { useCallback, useState } from "react";
import AddEditPlayer from "@/app/dashboard/club/players-management/add-edit-modal";
import ViewPlayer from "@/app/dashboard/club/players-management/view-player";
import TableTemplate from "@/components/tables/table-template";
import useGetAllPlayers from "@/hooks/services/useGetAllAdmins";
import { Player } from "@/types/player";

export default function PlayersTable() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [id, setId] = useState("");

  const { data, isLoading, isFailed, setIsFailed, retry, pagination } =
    useGetAllPlayers({
      page,
      limit,
    });
  const handleOpenEdit = useCallback((id: string) => {
    setId(id);
    setOpen(true);
  }, []);

  const handleOpenView = (id: string) => {
    setId(id);
    setView(true);
  };

  return (
    <>
      <TableTemplate
        data={data}
        isLoading={isLoading}
        columns={[
          {
            header: "NAME",
            key: "name",
            render: (row: Player) => (
              <div className=" flex gap-2 items-center min-w-36">
                <Image
                  height={100}
                  width={100}
                  src={row?.profile_img || "/logo.jpg"}
                  alt={row?.first_name}
                  className=" h-10 w-10 rounded aspect-square"
                />
                <span className=" flex flex-col gap-1">
                  <span className=" font-medium">
                    {row?.first_name} {row?.last_name}
                  </span>
                </span>
              </div>
            ),
          },
          {
            header: "POSITION",
            key: "position",
            render: (row: Player) => <span>{row?.position}</span>,
          },
          {
            header: "JERSEY NO",
            key: "jersey_no",
            render: (row: Player) => <span>{row?.jersey}</span>,
          },
          {
            header: "ABILITY",
            key: "ability",
            render: (row: Player) => <RatingStars rating={row?.ability} />,
          },
          {
            header: "STATUS",
            key: "status",
            render: (row: Player) => <Status status={row?.status} />,
          },
          {
            header: "ADDED",
            key: "added",
            render: (row: Player) => <span>{formatDate(row?.added)}</span>,
          },
          {
            header: "LAST ACTIVITY",
            key: "last_activity",
            render: (row: Player) => (
              <span>{formatDate(row?.last_activity)}</span>
            ),
          },
          {
            header: "ACTION",
            key: "action",
            render: (row: Player) => (
              <div className=" flex items-center gap-2">
                <Button
                  variant={"unstyled"}
                  type="button"
                  onClick={() => handleOpenEdit(row?.id)}
                  className=" text-dark-ash-900 dark:text-dark-ash-900 border border-gray-300 rounded-lg p-2 px-4 flex items-center gap-2"
                >
                  <Pencil className=" h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant={"unstyled"}
                  type="button"
                  onClick={() => handleOpenView(row?.id)}
                  className=" text-dark-ash-900 dark:text-dark-ash-900 border border-gray-300 rounded-lg p-2 px-4 flex items-center gap-2"
                >
                  <Eye className=" h-4 w-4" />
                </Button>
                {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-40"
                        align="end"
                        // forceMount
                      >
                        <DropdownMenuItem
                          onClick={() => handleOpenView(item?.id)}
                        >
                          Open
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
              </div>
            ),
          },
        ]}
        showPaginator={true}
        pagination={pagination}
        onCurrentPageChange={(val) => setPage(val)}
        onPageSizeChange={(val) => setLimit(val)}
      />
      <AddEditPlayer open={open} setOpen={setOpen} id={id} />
      <ViewPlayer open={view} setOpen={setView} id={id} />
    </>
  );
}
