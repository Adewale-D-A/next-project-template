import { Metadata } from "next";
import SignUpForm from "./form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up on iSportX.",
};

export default function SignUp() {
  return (
    <div className=" w-full h-screen flex justify-center items-center lg:justify-end lg:pr-[10%] lg:items-start lg:pt-[10%]">
      <SignUpForm />
    </div>
  );
}
