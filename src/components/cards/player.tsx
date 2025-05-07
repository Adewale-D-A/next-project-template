import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PlayerCard({
  first_name,
  last_name,
  position,
  rating,
  profile_image,
}: {
  first_name: string;
  last_name: string;
  position: string;
  rating: string;
  profile_image: string;
}) {
  return (
    <div className=" rounded-lg bg-gray-100 p-4 flex justify-between items-start hover:scale-110 transition-all hover:cursor-pointer hover:bg-green-100">
      <div className=" flex items-center gap-2">
        <Image
          src={profile_image}
          alt="profile"
          height={200}
          width={200}
          className=" h-16 w-16 rounded-full aspect-square"
        />
        <div>
          <span className=" font-bold text-lg">
            {first_name} {last_name}
          </span>
          <div className=" text-gray-500">
            <span>{position}</span> <span>{rating}</span>
          </div>
        </div>
      </div>
      <ArrowUpRight />
    </div>
  );
}
