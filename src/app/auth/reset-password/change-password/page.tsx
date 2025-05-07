import { Metadata } from "next";
import ChangePasswordForm from "./form";
import { Suspense } from "react";
import Loader from "@/components/loader";
export const metadata: Metadata = {
  title: "Reset Password | Change Password",
  description: "Change password.",
};
// type Params = Promise<{ email: string }>;
// export default async function ChangePassword(props: { params: Params }) {
//   const params = await props.params;
type Params = Promise<{ email: string }>;
export default async function ChangePassword(props: { params: Params }) {
  const params = await props.params;
  return (
    <div className=" w-full h-screen flex justify-center items-center lg:justify-end lg:pr-[10%] lg:items-start lg:pt-[10%]">
      <Suspense
        fallback={
          <Loader isLoading={true}>
            <p>...Loading</p>
          </Loader>
        }
      >
        <ChangePasswordForm />
      </Suspense>
    </div>
  );
}
