import { Metadata } from "next";
import SendOTPForm from "./form";
export const metadata: Metadata = {
  title: "Reset Password | Send Otp",
  description: "Verify email for reset password.",
};

export default function SendOtp() {
  return (
    <div className=" w-full h-screen flex justify-center items-center lg:justify-end lg:pr-[10%] lg:items-start lg:pt-[10%]">
      <SendOTPForm />
    </div>
  );
}
