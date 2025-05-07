"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
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
import { useAppDispatch } from "@/hooks/store-hooks";
import { updateUser } from "@/stores/features/auth/auth";

const SignUpSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
  password: passwordSchema,
  confirm_password: passwordSchema,
});

type SignUpType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback((data: SignUpType) => {
    dispatch(updateUser({ ...data }));
    router.push("/auth/role");
  }, []);

  return (
    <div className=" w-full h-fit max-w-md rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-8 flex flex-col gap-6">
      <section>
        <h1 className="text-3xl font-semibold">Welcome!</h1>
        <p className="text-sm mt-1 dark:text-gray-400">
          Let&apos;s get you started.
        </p>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
                    placeholder="Enter your password"
                    className="h-10 focus-visible:ring-0 shadow-none w-full"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-full text-center my-4 flex flex-col gap-2">
            <Button type="submit" className=" flex items-center gap-2">
              Get Started <MoveRight />
            </Button>
            <span className=" dark:text-gray-400 text-gray-500">
              Already have an account?{" "}
              <Link
                href={"/auth/sign-in"}
                className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black"
              >
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
