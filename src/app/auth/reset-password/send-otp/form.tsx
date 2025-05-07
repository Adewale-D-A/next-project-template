"use client";

import useAxiosJson from "@/config/services/axios-json-context";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/_shared/form/form";
import { Input } from "@/components/input/text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/_shared/form/form";
import { z } from "zod";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
import { useAppDispatch } from "@/hooks/store-hooks";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SendOtpSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
});

type SendOtpType = z.infer<typeof SendOtpSchema>;

export default function SendOTPForm() {
  const axios = useAxiosJson({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<SendOtpType>({
    resolver: zodResolver(SendOtpSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isSendingCode, setIsSendingCode] = useState(false);
  const sendOtp = useCallback(async (data: SendOtpType) => {
    setIsSendingCode(true);
    try {
      // const response = await axios.post("/auth/admin/forgot-password", {
      //   email: data?.email,
      // });
      // const { message } = response?.data;
      dispatch(
        openInfobar({
          message: "Reset code sent to your email", //message || "Reset code sent to your email",
          isError: false,
        })
      );
      router.push(`/auth/reset-password/change-password?email=${data?.email}`);
    } finally {
      setIsSendingCode(false);
    }
  }, []);

  return (
    <div className=" w-full h-fit overflow-y-auto max-w-md rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-8 flex flex-col gap-6">
      <section>
        <h1 className="text-3xl font-semibold">Confirm Email!</h1>
        <p className="text-sm mt-1 dark:text-gray-400">
          Begin you reset password journey.
        </p>
      </section>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendOtp)}
          className=" flex flex-col gap-4"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="text-blacky">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
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
              Send OTP <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
