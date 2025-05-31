import MatchLineupData from "@/components/match-data/match-line-up";
import SubstitutionLineup from "@/components/match-data/substition-line-up";

export default async function MatchLineUps({
  fixtureId,
  usertype = "club",
}: {
  fixtureId: string;
  usertype?: "club" | "scout";
}) {
  return (
    <div className=" flex gap-3 flex-col lg:flex-row">
      <div className="relative w-full max-w-2xl rounded-lg h-full">
        <MatchLineupData usertype={usertype} fixtureId={fixtureId} />
      </div>
      <SubstitutionLineup usertype={usertype} fixtureId={fixtureId} />
    </div>
  );
}
