import { Metadata } from "next";
import ScoutProfileForm from "./form";
export const metadata: Metadata = {
  title: "My Scout Profile",
  description: "Setup your scouting profile.",
};

export default function ScoutProfile() {
  return (
    <div className=" w-full h-full flex justify-center items-center lg:justify-end lg:py-4 lg:pr-4 ">
      <ScoutProfileForm />
    </div>
  );
}
