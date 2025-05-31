import TabVariant2 from "@/components/tab/variant-two";
export default async function MatchDataTab({
  id,
  usertype = "club",
}: {
  id: string;
  usertype?: "club" | "scout";
}) {
  return (
    <TabVariant2
      data={[
        {
          label: "Info",
          url: `/dashboard/${usertype}/match-data/${id}/info`,
        },
        {
          label: "Summary",
          url: `/dashboard/${usertype}/match-data/${id}/summary`,
        },
        {
          label: "Line-ups",
          url: `/dashboard/${usertype}/match-data/${id}/line-ups`,
        },
      ]}
    />
  );
}
