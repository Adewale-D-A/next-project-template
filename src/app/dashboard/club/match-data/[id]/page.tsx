import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Match Data",
  description: "Match data.",
};

type Params = Promise<{ id: string }>;
export default async function MatchData(props: { params: Params }) {
  const params = await props.params;
  redirect(`/dashboard/club/match-data/${params?.id}/info`);
}
