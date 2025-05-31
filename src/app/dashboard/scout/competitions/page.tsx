import SearchAndFilter from "@/components/filter/search-filter";
import {
  CompletedCompetitions,
  InprogressCompetions,
  UpcomingCompetitions,
} from "../../competitions";
export default function ScoutCompetitions() {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" w-full flex justify-between flex-col lg:flex-row p-3 items-center gap-2">
        <SearchAndFilter />
      </div>
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
        {/* In progress */}
        <InprogressCompetions usertype="scout" />

        {/* Upcoming */}
        <UpcomingCompetitions usertype="scout" />

        {/* Completed */}
        <CompletedCompetitions usertype="scout" />
      </div>
    </div>
  );
}
