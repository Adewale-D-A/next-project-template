import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Competiton Detail",
  description: "Competition details.",
};
type Params = Promise<{ id: string }>;
export default async function CompetitionDetails(props: { params: Params }) {
  const params = await props.params;
  redirect(`/dashboard/scout/competitions/${params?.id}/results`);
}
