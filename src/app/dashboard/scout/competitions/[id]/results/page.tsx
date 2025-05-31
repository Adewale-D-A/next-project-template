import { Metadata } from "next";
import CompetitionTab from "@/app/dashboard/competition-tab";
import CompetitionResultsTable from "@/app/dashboard/competition-results";
export const metadata: Metadata = {
  title: "Competiton Results",
  description: "Competition results.",
};

type Params = Promise<{ id: string }>;
export default async function CompetitionResults(props: { params: Params }) {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-3">
      <CompetitionTab usertype="scout" id={params?.id} />
      <h1 className=" text-2xl font-semibold">Competition Results</h1>
      <CompetitionResultsTable usertype="scout" competitionId={params?.id} />
    </div>
  );
}
