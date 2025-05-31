"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/_shared/form/form";
import { useRouter } from "next/navigation";
import { MoveLeft, MoveRight } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/_shared/form/form";
import { Input } from "@/components/input/text-input";
import { imageFileUpload, phoneNumberSchema } from "@/lib/schema";
import { AutocompleteInput } from "@/components/input/autocompleteInput";
import FileInput from "@/components/input/file-input-w-button";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import useAxiosMultipart from "@/config/services/axios-multipart-context";
import { updateUser, clearAuthUser } from "@/stores/features/auth/auth";
import Link from "next/link";

const TeamProfileSchema = z.object({
  name: z.string({
    message: "Name is required.",
  }),
  location: z.string({
    message: "Location is required.",
  }),
  phone: phoneNumberSchema,
  logo: imageFileUpload,
});

type TeamProfileType = z.infer<typeof TeamProfileSchema>;

export default function TeamProfileForm() {
  const axios = useAxiosMultipart({ disableSuccMssg: false });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.auth?.value?.user);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>({} as any);
  const form = useForm<TeamProfileType>({
    resolver: zodResolver(TeamProfileSchema),
    defaultValues: {
      name: "",
      location: "",
      phone: "",
      logo: "",
    },
  });

  // Pre-fill form field incase of corrections
  useEffect(() => {
    if (user?.clubName) {
      const { clubName, location, phoneNumber, profileImage } = user;
      form?.reset({
        name: clubName,
        location: location,
        phone: String(Number(phoneNumber || +234)),
        // logo: profileImage,
      });
    }
  }, [user]);
  // Pre-fill form field incase of corrections

  const handleSubmit = useCallback(
    async (data: TeamProfileType) => {
      const { email, password } = user;
      const { phone, name, location, logo } = data;
      dispatch(
        updateUser({
          clubName: name,
          location,
          phoneNumber: phone,
          // profileImage: logo,
        })
      );
      try {
        const payload = {
          name,
          // formation: "",
          image: logo,
          location: location,
          phoneNumber: phone,
          password,
          email,
          role: "club",
        };
        // await axios.post("/club", payload);
        // const message = response?.data?.message;
        // console.log({ message });
        dispatch(clearAuthUser());
        router.push("/auth/sign-in");
      } catch (error) {}
    },
    [coordinates, user]
  );

  return (
    <div className=" w-full h-full overflow-y-scroll max-w-3xl rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-3 lg:p-8 flex flex-col gap-6">
      <h6 className=" font-bold text-gray-500 text-xl">ISPORTS</h6>
      <section className=" flex flex-col gap-2">
        <Link href={"/auth/role"}>
          <MoveLeft />
        </Link>{" "}
        <div>
          <h1 className="text-3xl font-semibold">
            Create your team&apos;s profile
          </h1>
          <p className="text-sm mt-1 dark:text-gray-400">
            Thank you for joining our platform. Let&apos;s set up your profile.
          </p>
        </div>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" flex flex-col gap-4"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="text-blacky">Team Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g Maximo FC"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <AutocompleteInput
                    placeholder="Select Location"
                    setCoordinates={setCoordinates}
                    onPlaceChanged={(e) => form.setValue("location", e)}
                    value={form.getValues("location")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="text-blacky">
                  Primary Contact Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234"
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
            name="logo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Club Logo</FormLabel>
                <p className=" text-sm text-gray-500 dark:text-white">
                  This can be PNG, PSD or JPEG but MUST have a transparent
                  background.
                </p>
                <FormControl>
                  <FileInput
                    placeholder="Upload Logo"
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-full text-center my-7 flex flex-col gap-2">
            <Button
              isLoading={form?.formState.isSubmitting}
              type="submit"
              className=" flex items-center gap-2"
            >
              Continue <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
