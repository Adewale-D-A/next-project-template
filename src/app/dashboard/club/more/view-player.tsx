import player from "@/mock-up-data/player.json";
import playerCompetitions from "@/mock-up-data/player-competition-stats.json";

import Image from "next/image";
import { Shield } from "lucide-react";
import ModalTemplate from "@/components/dialog";
export default function ViewPlayer({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: string;
}) {
  return (
    <ModalTemplate
      open={open}
      onClose={setOpen}
      variant="alignRight"
      className=" max-w-4xl h-full"
      title="User details"
    >
      <div className=" px-0 md:p-4 text-dark-ash-900 dark:text-white flex flex-col gap-5">
        {/* Basic Info */}
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch border rounded-lg dark:border-dark-ash-700 border-gray-300 p-3">
          <div className=" dark:bg-dark-ash-700 bg-gray-100 p-3 rounded-lg h-full flex flex-col justify-center">
            <div>
              <Image
                src={"/logo.png"}
                alt="Logo"
                height={200}
                width={200}
                className=" w-16 h-16 aspect-square rounded-full"
              />
              <p className=" text-lg">
                {player?.first_name}{" "}
                <span className="font-bold">{player?.last_name}</span>
              </p>
              <p className="">{player?.position}</p>
            </div>
          </div>
          <div className=" flex flex-col gap-2 text-gray-600 dark:text-white">
            {[
              {
                label: "Position",
                value: "GK, CB",
              },
              {
                label: "Foot",
                value: "Both",
              },
              {
                label: "Height",
                value: "181M",
              },
              {
                label: "Weight",
                value: "78KG",
              },
              {
                label: "Jersey Number",
                value: "#1",
              },
              {
                label: "Added",
                value: "April 21, 2025",
              },
            ].map((item) => (
              <div
                key={item?.label}
                className=" w-full flex justify-between gap-2"
              >
                <span>{item?.label}</span>
                <span>{item?.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Season Summary */}
        <div className=" flex flex-col gap-2">
          <h6 className=" font-semibold text-lg">Season Summary</h6>
          <div className="border rounded-lg dark:border-dark-ash-700 border-gray-300 grid grid-cols-4 gap-2">
            {[
              {
                label: "Appearance",
                value: "55",
              },
              {
                label: "Cleansheets",
                value: "52",
              },
              {
                label: "Goals",
                value: "0",
              },
              {
                label: "Minutes",
                value: "4888'",
              },
            ].map((item) => (
              <div
                key={item?.label}
                className=" w-full flex flex-col gap-4 border-r dark:border-dark-ash-700 border-gray-300  p-3 "
              >
                <span className=" text-gray-500 dark:text-white">
                  {item?.label}
                </span>
                <span className=" font-bold text-xl">{item?.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* stats */}
        <div className=" flex flex-col gap-2">
          <h6 className=" font-semibold text-lg">Stats</h6>
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr className="dark:!bg-dark-ash-700 dark:!text-white">
                  {["COMPETITION", "APPS", "GS", "GC", "MINUTES"].map(
                    (head) => (
                      <th key={head}>{head}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(even)]:dark:!bg-dark-ash-700">
                {playerCompetitions.map((item) => {
                  return (
                    <tr key={item?.id} className="">
                      <td>
                        <span className=" flex items-center gap-2">
                          <Shield className=" h-4 w-4" /> {item?.club}
                        </span>
                      </td>
                      <td className=" text-gray-500">{item?.apps}</td>
                      <td>{item?.cs}</td>
                      <td>{item?.gc}</td>
                      <td>{item?.minutes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* comments */}
        <div className=" flex flex-col gap-2">
          <h6 className=" font-semibold text-lg">Comments</h6>
          <div className=" bg-gray-100 rounded-lg min-h-10 dark:bg-dark-ash-700"></div>
        </div>
      </div>
    </ModalTemplate>
  );
}
