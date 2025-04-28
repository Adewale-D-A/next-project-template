import { Metadata } from "next";
import RoleForm from "./form";
export const metadata: Metadata = {
  title: "My Role",
  description: "Select your role.",
};

export default function UserRole() {
  return (
    <div className=" w-full h-screen flex justify-center items-center lg:justify-end lg:py-4 lg:pr-4 ">
      <RoleForm />
    </div>
  );
}
