import { Metadata } from "next";
import MatchDataTab from "@/app/dashboard/match-data-tab";
import MatchSummary from "@/components/match-data/container/summary";
export const metadata: Metadata = {
  title: "Summary | Match Data",
  description: "Summary, match data.",
};

type Params = Promise<{ id: string }>;
export default async function Summary(props: { params: Params }) {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-3">
      <MatchDataTab id={params?.id} />
      <MatchSummary fixtureId={params?.id} />
    </div>
  );
}
