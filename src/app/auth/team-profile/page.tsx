import { Metadata } from "next";
import TeamProfileForm from "./form";
export const metadata: Metadata = {
  title: "My Team",
  description: "Setup your team profile.",
};

export default function TeamProfile() {
  return (
    <div className=" w-full h-screen flex justify-center items-center lg:justify-end lg:py-4 lg:pr-4 ">
      <TeamProfileForm />
    </div>
  );
}
