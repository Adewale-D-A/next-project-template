"use client";

import { Eye, Pencil } from "lucide-react";
import { Button } from "@/components/button";
import players from "@/mock-up-data/players.json";
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
import AddEditPlayer from "@/app/dashboard/club/more/add-edit-modal";
import ViewPlayer from "@/app/dashboard/club/more/view-player";

export default function PlayersTable() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [id, setId] = useState("");

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
      <div className=" w-full overflow-x-auto">
        <table className=" w-full">
          <thead>
            <tr>
              {[
                "NAME",
                "POSITION",
                "JERSEY NO",
                "ABILITY",
                "STATUS",
                "ADDED",
                "LAST ACTIVITY",
                "ACTIONS",
              ].map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {players.map((item) => {
              return (
                <tr key={item?.id} className="">
                  <td className=" flex gap-2 items-center min-w-36">
                    <Image
                      height={100}
                      width={100}
                      src={item?.profile_img || "/logo.jpg"}
                      alt={item?.first_name}
                      className=" h-10 w-10 rounded aspect-square"
                    />
                    <span className=" flex flex-col gap-1">
                      <span className=" font-medium">
                        {item?.first_name} {item?.last_name}
                      </span>
                    </span>
                  </td>
                  <td>{item?.position}</td>
                  <td>{item?.jersey}</td>
                  <td>
                    <RatingStars rating={item?.ability} />
                  </td>
                  <td>
                    <Status status={item?.status} />
                  </td>
                  <td>{formatDate(item?.added)}</td>
                  <td>{formatDate(item?.last_activity)}</td>
                  <td>
                    <div className=" flex items-center gap-2">
                      <Button
                        variant={"unstyled"}
                        type="button"
                        onClick={() => handleOpenEdit(item?.id)}
                        className=" text-dark-ash-900 dark:text-dark-ash-900 border border-gray-300 rounded-lg p-2 px-4 flex items-center gap-2"
                      >
                        <Pencil className=" h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant={"unstyled"}
                        type="button"
                        onClick={() => handleOpenView(item?.id)}
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AddEditPlayer open={open} setOpen={setOpen} id={id} />
        <ViewPlayer open={view} setOpen={setView} id={id} />
      </div>
    </>
  );
}
