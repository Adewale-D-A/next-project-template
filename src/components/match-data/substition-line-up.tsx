"use client";
import { cn } from "@/shared/_utils/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tables/table";
import ViewPlayerMatchStat from "@/app/dashboard/view-player-match-stat";
import { useState } from "react";
import useGetMatchLineupSubstitutions from "@/hooks/services/useGetMatchLineupSubstitutions";
import Loader from "../loader";

export default function SubstitutionLineup({
  fixtureId,
  usertype = "club",
}: {
  fixtureId: string;
  usertype?: "club" | "scout";
}) {
  const [view, setView] = useState(false);
  const { data, isLoading, isFailed, setIsFailed, retry } =
    useGetMatchLineupSubstitutions({
      fixtureId,
      usertype,
    });
  const handleOpenView = () => {
    // setId(id);
    setView(true);
  };
  return (
    <>
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className={cn(
          " w-full rounded-lg p-3 md:p-10 ",
          "bg-center bg-no-repeat bg-cover bg-black bg-[url('/images/bg-2.jpg')]"
        )}
      >
        <div className=" w-full h-full bg-black/60 rounded-xl relative min-h-96  flex flex-col justify-between gap-10">
          <div className=" w-full overflow-x-auto">
            <Table className=" w-full text-white">
              <TableHeader>
                <TableRow className="dark:bg-dark-ash-700 dark:text-white">
                  {["MINUTE", "OUTGOING", "INCOMING"].map((head) => (
                    <TableHead key={head}>{head}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="[&>*:nth-child(even)]:dark:!bg-dark-ash-700 [&>*:nth-child(even)]:text-dark-ash-700 [&>*:nth-child(even)]:dark:text-white">
                {data?.team_1?.substitutions?.map((item, index) => {
                  return (
                    <TableRow key={index} className="">
                      <TableCell>
                        <span>{item?.minute}</span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleOpenView()}
                          className=" hover:scale-110 transition-all hover:font-bold hover:cursor-pointer"
                        >
                          {item?.outgoing}
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleOpenView()}
                          className=" hover:scale-110 transition-all hover:font-bold hover:cursor-pointer"
                        >
                          {item?.incoming}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className=" w-full h-5 bg-white"></div>
          <div className=" w-full overflow-x-auto">
            <Table className=" w-full text-white">
              <TableHeader>
                <TableRow className="dark:bg-primary dark:text-black">
                  {["MINUTE", "OUTGOING", "INCOMING"].map((head) => (
                    <TableHead key={head}>{head}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className=" [&>*:nth-child(even)]:!bg-primary-dull [&>*:nth-child(even)]:text-white [&>*:nth-child(even)]:dark:text-white">
                {data?.team_2?.substitutions?.map((item, index) => {
                  return (
                    <TableRow key={index} className="">
                      <TableCell>
                        <span>{item?.minute}</span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleOpenView()}
                          className=" hover:scale-110 transition-all hover:font-bold hover:cursor-pointer"
                        >
                          {item?.outgoing}
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleOpenView()}
                          className=" hover:scale-110 transition-all hover:font-bold hover:cursor-pointer"
                        >
                          {item?.incoming}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Loader>
      <ViewPlayerMatchStat
        open={view}
        onClose={setView}
        id={"id"}
        usertype={usertype}
      />
    </>
  );
}
