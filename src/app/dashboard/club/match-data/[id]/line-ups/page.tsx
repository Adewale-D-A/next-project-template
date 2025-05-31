import { Metadata } from "next";
import MatchDataTab from "@/app/dashboard/match-data-tab";
import MatchLineUps from "@/components/match-data/container/line-ups";

export const metadata: Metadata = {
  title: "Line Ups | Match Data",
  description: "Line ups, match data.",
};

type Params = Promise<{ id: string }>;
export default async function LineUps(props: { params: Params }) {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-3">
      <MatchDataTab id={params?.id} />
      <MatchLineUps fixtureId={params?.id} />
    </div>
  );
}
