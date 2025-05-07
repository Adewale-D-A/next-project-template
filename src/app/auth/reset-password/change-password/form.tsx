"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/button";
import { Form } from "@/components/_shared/form/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/_shared/form/form";
import { Input } from "@/components/input/text-input";
import useAxiosJson from "@/config/services/axios-json-context";
import { useAppDispatch } from "@/hooks/store-hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
import { MoveRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const ResetPassword = z.object({
  otp: z.string().min(1, {
    message: "OTP is required.",
  }),
  password: passwordSchema,
  confirm_password: passwordSchema,
});

type ResetPasswordType = z.infer<typeof ResetPassword>;

export default function ChangePasswordForm() {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      otp: "",
      password: "",
      confirm_password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePassword = useCallback(
    async (data: ResetPasswordType) => {
      if (data?.password === data?.confirm_password) {
        setIsSubmitting(true);
        try {
          // await axios.post("/auth/admin/reset-password", {
          //   // token: data?.otp,
          //   // email: email,
          //   password: data?.password,
          //   password_confirmation: data?.confirm_password,
          // });
          console.log(email, data?.otp, data?.password);
          dispatch(
            openInfobar({
              message:
                "Password reset was successful, please login with your new password.",
              isError: false,
            })
          );
          router.push(`/auth/sign-in`);
        } catch (error: any) {
        } finally {
          setIsSubmitting(false);
        }
      } else {
        dispatch(
          openInfobar({ message: "Passwords do not match", isError: true })
        );
      }
    },
    [email]
  );

  return (
    <div className=" w-full h-fit overflow-y-auto max-w-md rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-8 flex flex-col gap-6">
      <section>
        <h1 className="text-3xl font-semibold">Change Your Password!</h1>
        <p className="text-sm mt-1 dark:text-gray-400">
          Change your password to get back into the app.
        </p>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(changePassword)}
          className=" flex flex-col gap-4"
        >
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="text-blacky">OTP</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Enter your password"
                    className="h-10 focus-visible:ring-0 shadow-none w-full"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Confirm your password"
                    className="h-10 focus-visible:ring-0 shadow-none w-full"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-full text-center my-4 flex flex-col gap-2">
            <Button type="submit" className=" flex items-center gap-2">
              Reset Password <MoveRight />
            </Button>
            {/* <span className=" dark:text-gray-400 text-gray-500">
              Sign in?{" "}
              <Link
                href={"/auth/sign-up"}
                className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black"
              >
                Sign up
              </Link>
            </span> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
