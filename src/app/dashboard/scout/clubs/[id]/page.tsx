import { Metadata } from "next";
import Search from "@/components/input/search";
import Sort from "@/components/input/sort";
import PlayersTable from "@/app/dashboard/club/players-management/players-table";
import SingleClub from "./single-club";

export const metadata: Metadata = {
  title: "Club Detail",
  description: "Club details.",
};
type Params = Promise<{ id: string }>;
export default async function ClubDetails(props: { params: Params }) {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-5">
      <SingleClub id={params?.id} />
      <div className=" w-full border border-gray-200 rounded-3xl">
        <div className=" w-full flex justify-between flex-col lg:flex-row p-3 items-center gap-2">
          <h1 className=" text-2xl font-semibold">Players</h1>
          <div className="w-full max-w-xl flex flex-col lg:flex-row items-center gap-2">
            <div className=" w-full">
              <Search applyTheme={false} />
            </div>
            <div className=" w-fit">
              <Sort applyTheme={false} />
            </div>
          </div>
        </div>

        {/* table */}
        <PlayersTable usertype="scout" clubId={params?.id} />
      </div>
    </div>
  );
}
