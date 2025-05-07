"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import { passwordSchema } from "@/lib/schema";
import useAxiosJson from "@/config/services/axios-json-context";
import { useAppDispatch } from "@/hooks/store-hooks";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";

const SignInSchema = z.object({
  current_password: passwordSchema,
  new_password: passwordSchema,
  confirm_new_password: passwordSchema,
});

type SignInType = z.infer<typeof SignInSchema>;
export default function ChangePasswordForm() {
  const axios = useAxiosJson({});
  const dispatch = useAppDispatch();
  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const handleSubmit = useCallback(async (data: SignInType) => {
    try {
      const { current_password, new_password, confirm_new_password } = data;
      // const response = await axios.post("/auth/login", {
      //   current_password,
      //   new_password: "password",
      // });
      dispatch(
        openInfobar({
          message: "Password was successfully updated.",
          isError: false,
        })
      );
    } catch (error) {}
  }, []);

  return (
    <div className="flex flex-col gap-10 mt-10 border-b border-gray-300 pb-10">
      <section>
        <h1 className="text-3xl font-semibold">Change Password!</h1>
        <p className="text-sm mt-1 dark:text-gray-400">Update your password.</p>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="dark:text-dark-ash-900">
                  Current Password
                </FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Enter your current assword"
                    className="h-10 focus-visible:ring-0 shadow-none w-full"
                    value={field.value}
                    onChange={field.onChange}
                    applyTheme={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="dark:text-dark-ash-900">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Enter your new password"
                    className="h-10 focus-visible:ring-0 shadow-none w-full"
                    value={field.value}
                    onChange={field.onChange}
                    applyTheme={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_new_password"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="dark:text-dark-ash-900">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Confirm your new password"
                    className="h-10 focus-visible:ring-0 shadow-none w-full"
                    value={field.value}
                    onChange={field.onChange}
                    applyTheme={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-full text-center my-4 flex flex-col gap-2">
            <Button type="submit" className=" flex items-center gap-2">
              Update <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
