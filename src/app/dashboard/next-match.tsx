"use client";
import Loader from "@/components/loader";
import useGetNextMatch from "@/hooks/services/useGetNetxMatch";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function NextMatch() {
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetNextMatch();
  return (
    <Loader
      isLoading={isLoading}
      isFailed={isFailed}
      setIsFailed={setIsFailed}
      retry={retry}
    >
      <div className=" w-full text-center text-white bg-[url('/images/pitch_bg.jpg')] bg-center bg-no-repeat bg-cover bg-gray-200 rounded-xl p-4 lg:p-10 flex flex-col  items-center justify-center">
        <h5 className=" text-lg font-semibold text-shadow">NEXT MATCH</h5>
        <div className="w-full flex items-center flex-col xl:flex-row justify-between gap-5">
          <Image
            src={data?.club_1?.logo || "/logo.jpg"}
            alt={data?.club_1?.name || "club logo"}
            height={400}
            width={400}
            className=" w-[200px] lg:w-[250px] h-auto"
          />
          <div className=" flex flex-col gap-3">
            <h6 className=" text-2xl font-bold">
              {data?.club_1?.name} <span>V</span> {data?.club_2?.name}
            </h6>
            <p>{data?.date}</p>
            <span className=" flex items-center justify-center">
              <MapPin /> {data?.location}
            </span>
          </div>
          <Image
            src={data?.club_2?.logo || "/logo.jpg"}
            alt={data?.club_2?.name || "club logo"}
            height={400}
            width={400}
            className=" w-[200px] lg:w-[250px] h-auto"
          />
        </div>
      </div>
    </Loader>
  );
}
