import { MapPin } from "lucide-react";
import Image from "next/image";
import CompetitionsCard from "@/components/cards/competitions";
import PlayerCard from "@/components/cards/player";
import { DoughnutChart } from "@/components/charts/doughnut";
import Loader from "@/components/loader";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your scouting dashboard.",
};

export default function DashboardHome() {
  return (
    <div className=" w-full flex flex-col gap-5">
      {/* upcoming match and fixtures */}
      <section className=" w-full flex flex-col md:flex-row gap-4 items-stretch h-full">
        <div className=" w-full flex-3/5  flex flex-col gap-4">
          {" "}
          <div className=" w-full flex-3/5 min-h-96 text-center text-white bg-[url('/images/pitch_bg.jpg')] bg-center bg-no-repeat bg-cover bg-gray-200 rounded-xl p-4 lg:p-10 flex flex-col  items-center justify-center">
            <h5 className=" text-lg font-semibold text-shadow">NEXT</h5>
            <div className="w-full flex items-center flex-col lg:flex-row justify-between gap-5">
              <Image
                src={"/images/football_club_logo.png"}
                alt="my club"
                height={400}
                width={400}
                className=" w-52 lg:w-72 h-auto"
              />
              <div className=" flex flex-col gap-3">
                <h6 className=" text-2xl font-bold">
                  **** <span>V</span> ****
                </h6>
                <p>Wednesday 19, March 2025</p>
                <span className=" flex items-center justify-center">
                  <MapPin /> ****
                </span>
              </div>
              <Image
                src={"/images/kickers_club_logo.png"}
                alt="my club"
                height={400}
                width={400}
                className=" w-52 lg:w-72 h-auto"
              />
            </div>
          </div>
          {/* stats */}
          <div className=" min-h-96 h-full rounded-xl p-5 border border-gray-200 w-full flex justify-center">
            <DoughnutChart
              data={{
                labels: ["***", "****", "**", "*****"],
                datasets: [
                  {
                    label: "",
                    data: [4, 8, 10, 4],
                    backgroundColor: [
                      "#28B52D",
                      "#EF9B25",
                      "#4287EE",
                      "#E95338",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
        {/* Active competitions and Recent Player Evaluations */}
        <div className=" w-full flex-2/5 rounded-xl flex flex-col gap-4">
          <Loader className=" w-full flex-2/5 rounded-xl border border-gray-300 p-5 flex flex-col gap-3">
            <div className=" w-full flex-2/5 bg-yellow-100 rounded-xl p-5">
              <h6 className=" text-lg font-bold text-gray-400">*****</h6>
              <div className=" grid grid-col-1 gap-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className=" rounded-lg h-20 w-full bg-blue-100"
                  ></div>
                ))}
              </div>
            </div>
          </Loader>
          <Loader className=" w-full flex-2/5 rounded-xl border border-gray-300 p-5 flex flex-col gap-3">
            <div className=" w-full bg-green-100 rounded-xl flex flex-col gap-3 p-5">
              <h6 className=" text-lg font-bold text-gray-400">*****</h6>
              <div className=" grid grid-col-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className=" rounded-md h-28 w-full bg-amber-200"
                  ></div>
                ))}
              </div>
            </div>
          </Loader>
        </div>
      </section>
    </div>
  );
}
