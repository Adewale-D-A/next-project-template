import { Metadata } from "next";
import MatchDataTab from "@/app/dashboard/match-data-tab";
import MatchInfo from "@/components/match-data/container/info";
export const metadata: Metadata = {
  title: "Info | Match Data",
  description: "Info, match data.",
};

type Params = Promise<{ id: string }>;
export default async function Info(props: { params: Params }) {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-3">
      <MatchDataTab usertype="scout" id={params?.id} />
      <MatchInfo fixtureId={params?.id} />
    </div>
  );
}
