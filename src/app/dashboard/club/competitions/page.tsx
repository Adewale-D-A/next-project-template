import { CompetitionsCardV2 } from "@/components/cards/competitions";
import Search from "@/components/input/search";
import Sort from "@/components/input/sort";
import { Check, DownloadCloud, RotateCw } from "lucide-react";

export default function Competitions() {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" w-full flex justify-between flex-col lg:flex-row p-3 items-center gap-2">
        <div className="w-full max-w-xl flex flex-col lg:flex-row items-center gap-2">
          <div className=" w-full">
            <Search />
          </div>
          <div className=" w-fit">
            <Sort />
          </div>
        </div>
      </div>
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
        {/* in progress */}
        <div className=" bg-gray-100 p-3 rounded-2xl border border-gray-300 flex flex-col gap-2">
          <div className=" flex items-center gap-2">
            <RotateCw className=" text-[#9747FF]" />{" "}
            <h6 className=" font-bold text-lg">In progress</h6>{" "}
            <span className=" aspect-square font-bold p-1 px-2 rounded-md bg-white border border-gray-300">
              3
            </span>
          </div>
          <div className=" flex flex-col gap-4">
            {[
              {
                id: 1,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
              {
                id: 2,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
              {
                id: 3,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
            ].map((item) => (
              <CompetitionsCardV2 key={item?.id} {...item} />
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className=" bg-gray-100 p-3 rounded-2xl border border-gray-300 flex flex-col gap-2">
          <div className=" flex items-center gap-2">
            <DownloadCloud className=" text-[#0EC21A]" />{" "}
            <h6 className=" font-bold text-lg">In Upcoming</h6>{" "}
            <span className=" aspect-square font-bold p-1 px-2 rounded-md bg-white border border-gray-300">
              4
            </span>
          </div>
          <div className=" flex flex-col gap-4">
            {[
              {
                id: 1,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
              {
                id: 2,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
              {
                id: 3,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
              {
                id: 4,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
            ].map((item) => (
              <CompetitionsCardV2 key={item?.id} {...item} />
            ))}
          </div>
        </div>
        <div className=" bg-gray-100 p-3 rounded-2xl border border-gray-300 flex flex-col gap-2">
          <div className=" flex items-center gap-2">
            <Check className=" text-[#23A4F3]" />{" "}
            <h6 className=" font-bold text-lg">Completed</h6>{" "}
            <span className=" aspect-square font-bold p-1 px-2 rounded-md bg-white border border-gray-300">
              2
            </span>
          </div>
          <div className=" flex flex-col gap-4">
            {[
              {
                id: 1,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
              {
                id: 2,
                title: "Regional Youth League",
                category: "Senior - 16 Teams",
                date: "Apr 17 - Jun 20",
                status: "active" as const,
                img: "/logo.jpg",
                location: "Saheed Balogun Stadium",
              },
            ].map((item) => (
              <CompetitionsCardV2 key={item?.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
