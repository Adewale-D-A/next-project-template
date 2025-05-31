import { Metadata } from "next";
import CompetitionTab from "@/app/dashboard/competition-tab";
import CompetitionMatchesTable from "@/app/dashboard/competition-matches";
export const metadata: Metadata = {
  title: "Competiton Matches",
  description: "Competition matches.",
};

type Params = Promise<{ id: string }>;

export default async function CompetitionMatches(props: { params: Params }) {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-3">
      <CompetitionTab usertype="scout" id={params?.id} />
      <h1 className=" text-2xl font-semibold">Competition Matches</h1>
      <CompetitionMatchesTable competitionId={params?.id} usertype="scout" />
    </div>
  );
}
