"use client";

// import { Button } from "@/components/button";
import CompetitionsCard from "@/components/cards/competitions";
import StatsCard from "@/components/cards/stats";
import Loader from "@/components/loader";
// import { useAppDispatch } from "@/hooks/store-hooks";
// import { openInfobar } from "@/stores/features/app-native-features/info-modal";
// import { useCallback } from "react";

export default function DashboardHome() {
  // const dispatch = useAppDispatch();
  // const openInfoBar = useCallback(() => {
  //   dispatch(
  //     openInfobar({
  //       message: "Please try again later",
  //       isError: true,
  //     })
  //   );
  // }, []);

  return (
    <div className=" w-full flex flex-col gap-5">
      {/* upcoming match and fixtures */}
      <section className=" w-full flex flex-col md:flex-row gap-4 items-stretch h-full">
        <div className=" w-full flex-3/5 min-h-96 bg-gray-200 rounded-xl">
          {/* <Button onClick={() => openInfoBar()}>Open Message</Button> */}
        </div>
        <div className=" w-full flex-2/5 min-h-32  bg-gray-300 rounded-xl"></div>
      </section>

      {/* team stats, active competitions and player of the week */}
      <section className=" w-full flex flex-col md:flex-row gap-4 items-stretch h-full">
        <Loader className="w-full flex-3/5 flex flex-col gap-4">
          <>
            <div className=" w-full rounded-xl border border-gray-300 flex flex-col gap-3 p-5">
              <h6 className=" text-lg font-bold text-gray-400">TEAM STATS</h6>
              <div className=" grid grid-col-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: 1,
                    title: "Goals Scored",
                    label: "Last 5 games",
                    value: "4.1",
                    valueLabel: "Comp avg 2.4",
                    showIcon: true,
                  },
                  {
                    id: 2,
                    title: "Goals Conceeded",
                    label: "Last 5 games",
                    value: "1.8",
                    valueLabel: "Comp avg 2.4",
                    showIcon: true,
                  },
                  {
                    id: 3,
                    title: "Wins",
                    label: "Competition",
                    value: "45%",
                    valueLabel: "Total: 8 wins",
                    showIcon: false,
                    valueColorClassName: "text-[#DDAC0B]",
                  },
                  {
                    id: 4,
                    title: "Injuries",
                    label: "",
                    value: "4",
                    valueLabel: "avg: 3 weeks",
                    showIcon: false,
                    valueColorClassName: "text-black",
                  },
                ].map((item) => (
                  <StatsCard key={item?.id} {...item} />
                ))}
              </div>
            </div>
            <div className=" w-full h-60 bg-purple-100 rounded-xl"></div>
          </>
        </Loader>
        <Loader className=" w-full flex-2/5 rounded-xl border border-gray-300 p-5 flex flex-col gap-3">
          <>
            <h6 className=" text-lg font-bold text-gray-400">
              ACTIVE COMPETITIONS
            </h6>
            <div className=" grid grid-col-1 gap-3">
              {[
                {
                  id: 1,
                  title: "Regional Youth League",
                  category: "Senior - 16 Teams",
                  date: "Apr 17 - Jun 20",
                  status: "active" as const,
                },
                {
                  id: 2,
                  title: "Regional Youth League",
                  category: "Senior - 16 Teams",
                  date: "Apr 17 - Jun 20",
                  status: "active" as const,
                },
                {
                  id: 3,
                  title: "Nations Cup",
                  category: "u-17 - 16 Teams",
                  date: "Apr 17 - Jun 20",
                  status: "active" as const,
                },
                {
                  id: 4,
                  title: "Regional Youth League",
                  category: "Senior - 16 Teams",
                  date: "May 17 - Jun 20",
                  status: "available" as const,
                },
                {
                  id: 5,
                  title: "National Championship",
                  category: "Senior - 36 Teams",
                  date: "Mar 5 - May 25",
                  status: "request-sent" as const,
                },
              ].map((item) => (
                <CompetitionsCard key={item?.id} {...item} />
              ))}
            </div>
          </>
        </Loader>
      </section>
    </div>
  );
}
