import { Player } from "@/types/player";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PlayerStats({ player }: { player: Player }) {
  return (
    <div className=" flex flex-col gap-5">
      <div className=" flex items-stretch gap-3 w-full">
        <Image
          src={player?.profile_img || "/logo.jpg"}
          alt="player-profile"
          height={200}
          width={200}
          className=" aspect-square rounded-lg h-24 w-24 object-cover"
        />
        <div className=" flex flex-col justify-between">
          <p className=" text-2xl font-bold">
            {player?.first_name + " " + player?.last_name}
          </p>
          <span className=" text-gray-500">{player?.position}</span>
          <Link
            href="#"
            className=" font-semibold flex items-start gap-2.5 underline"
          >
            View Profile <MoveUpRight className=" h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="w-full border-t border-gray-200 py-3 flex justify-between flex-wrap gap-2 ">
        {[
          {
            label: "Goals",
            value: player?.goals,
          },
          {
            label: "Assits",
            value: player?.assist,
          },
          {
            label: "Distance",
            value: player?.distance + "km",
          },
          {
            label: "Top Speed",
            value: player?.speed + "km/h",
          },
        ].map((item) => (
          <div key={item?.label} className=" flex flex-col gap-2">
            <span className=" text-gray-500">{item?.label}</span>
            <span className=" text-2xl lg:text-4xl font-bold">
              {item?.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
