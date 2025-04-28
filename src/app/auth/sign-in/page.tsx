import { Metadata } from "next";
import LoginForm from "./form";
export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your iSportX account.",
};

export default function SignIn() {
  return (
    <div className=" w-full h-screen flex justify-center items-center lg:justify-end lg:pr-[10%] lg:items-start lg:pt-[10%]">
      <LoginForm />
    </div>
  );
}
