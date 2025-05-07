import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
  description: "Your personal profile.",
};

export default function Profile() {
  return <div className=" w-full flex flex-col gap-5"></div>;
}
