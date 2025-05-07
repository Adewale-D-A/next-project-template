import { Metadata } from "next";
import ChangePasswordForm from "@/app/dashboard/change-password-form";
import DeleteMyAccount from "@/app/dashboard/delete-account";
import UpdateScoutProfileForm from "./update-profile-form";
export const metadata: Metadata = {
  title: "Account Settings",
  description: "Your account settings.",
};

export default function Settings() {
  return (
    <div className="w-full flex flex-col items-center gap-3 ">
      <div className="w-full max-w-3xl">
        <UpdateScoutProfileForm />
        <ChangePasswordForm />
        <DeleteMyAccount />
      </div>
    </div>
  );
}
