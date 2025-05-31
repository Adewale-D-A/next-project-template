import Tab from "@/components/tab";
export default async function CompetitionTab({
  id,
  usertype = "club",
}: {
  id: string;
  usertype?: "club" | "scout";
}) {
  return (
    <Tab
      data={[
        {
          label: "Results",
          url: `/dashboard/${usertype}/competitions/${id}/results`,
        },
        {
          label: "Matches",
          url: `/dashboard/${usertype}/competitions/${id}/matches`,
        },
      ]}
    />
  );
}
