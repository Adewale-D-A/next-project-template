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
  Form,
} from "@/components/_shared/form/form";
import { Input } from "@/components/input/text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import { passwordSchema } from "@/lib/schema";
import storeProfileClient from "@/utils/auth/store-profile-client";
import storeTokenClient from "@/utils/auth/store-token-client";
import useAxiosJson from "@/config/services/axios-json-context";
import axios from "axios";
import { AuthUser } from "@/types/auth";

const SignInSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
  password: passwordSchema,
});

type SignInType = z.infer<typeof SignInSchema>;

export default function SignInForm() {
  const axiosCustom = useAxiosJson({});
  const router = useRouter();
  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback(async (data: SignInType) => {
    try {
      const { email, password } = data;
      // STEP 1: LOGIN USER WITH AUTH CREDENTIALS
      // const response = await axiosCustom.post("/auth/login", {
      //   email,
      //   password,
      // });
      // const authUser = await axiosCustom.get("/entity");
      // console.log({ response, authUser });
      // const { access_token } = response?.data?.data;
      const isClub = email?.includes("club");
      const accessCredentials = {
        access_token: "very_long_key",
      };
      // STEP 2: FETCH USER'S PROFILE USING AUTH TOKEN
      let profileCredentials = {} as AuthUser;
      const clubProfile = {
        _id: "raandom_id_2",
        profileImage: "/images/kickers_club_logo.png",
        email: "ade_@io.com",
        clubName: "Maximo FC",
        location: "Surulere Lagos",
        phoneNumber: "07056944506",
        role: {
          _id: "random_id",
          name: "club",
        },
      } as any;
      const scoutProfile = {
        _id: "raandom_id",
        profileImage: "/images/kickers_club_logo.png",
        firstName: "Adewale",
        lastName: "Azeez",
        email: "ade_@io.com",
        phoneNumber: "07056944506",
        role: {
          _id: "random_id",
          name: "scout",
        },
        organization_type: "National",
        organization_name: "FC Barcelona",
        purpose: "organization",
        country: "Spain",
      } as any;
      // STEP 3: PERSIST TOKEN AND PROFILE ON SERVER SIDE COOKIE
      profileCredentials = isClub ? clubProfile : scoutProfile;
      // ALERT: Internal API call!
      await axios.post(`/api/auth/store-cookie`, {
        token: accessCredentials,
        profile: profileCredentials,
      });

      // STEP 4: PERSIST TOKEN AND PROFILE ON CLIENT SIDE LOCAL STORAGE
      storeTokenClient({ token: accessCredentials?.access_token });
      storeProfileClient({ profile: profileCredentials });

      // STEP 5: REDIRECT USER SAFELY BASED ON ROLE
      if (isClub) {
        router.push("/dashboard/club");
      } else {
        router.push("/dashboard/scout");
      }
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return (
    <div className=" w-full h-fit overflow-y-auto max-w-md rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-8 flex flex-col gap-6">
      <section>
        <h1 className="text-3xl font-semibold">Welcome Back!</h1>
        <p className="text-sm mt-1 dark:text-gray-400">Jump back in.</p>
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
                    className="h-10 focus-visible:ring-0 shadow-none w-full"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Link
              href={"/auth/reset-password/send-otp"}
              className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black"
            >
              Forgot password?
            </Link>
          </div>
          <div className=" w-full text-center my-4 flex flex-col gap-2">
            <Button
              isLoading={form?.formState?.isSubmitting}
              type="submit"
              className=" flex items-center gap-2"
            >
              Sign In <MoveRight />
            </Button>
            <span className=" dark:text-gray-400 text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href={"/auth/sign-up"}
                className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
