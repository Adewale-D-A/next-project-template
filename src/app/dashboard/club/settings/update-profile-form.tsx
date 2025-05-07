"use client";

import useAxiosJson from "@/config/services/axios-json-context";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AutocompleteInput } from "@/components/input/autocompleteInput";

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
import FileInput from "@/components/input/file-input-w-button";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/config/system/constants";
import { phoneNumberSchema } from "@/lib/schema";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";

const TeamProfileSchema = z.object({
  name: z.string({
    message: "Name is required.",
  }),
  location: z.string({
    message: "Location is required.",
  }),
  phone: phoneNumberSchema,
  logo: z
    .any()
    .refine((file: File) => file, "Logo is required")
    .refine(
      (file: File) => file?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file: File) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .jpeg, .jpg, .png, and .webp formats are supported."
    )
    .optional(),
});

type TeamProfileType = z.infer<typeof TeamProfileSchema>;

export default function UpdateClubProfileForm() {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth.value);
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

  const handleSubmit = useCallback(
    async (data: TeamProfileType) => {
      console.log({ ...data, coordinates, user });
      const payload = {
        // teamName: data?.name,
        // location: data?.location,
        email: user?.email,
        password: user?.password,
        role: "club",
        phoneNumber: data?.phone,
        image: data?.logo,
        country: data?.location?.split(" ")?.at(-1),

        firstName: data?.name, //NOT EXPECTED
        lastName: data?.name, //NOT EXPECTED
        // dob: "", //NOT EXPECTED
        // gender: "", //NOT EXPECTED
      };
      try {
        const response = await axios.put("/club", payload);
        console.log({ response });
        dispatch(
          openInfobar({
            message: "Club's profile successfully updated.",
            isError: false,
          })
        );
      } catch (error) {}
      // router.push("/auth/sign-in");
    },
    [coordinates, user]
  );

  return (
    <div className="flex flex-col gap-10 mt-10 border-b border-gray-300 pb-10">
      <section>
        <h1 className="text-3xl font-semibold">Update profile</h1>
        <p className="text-sm mt-1 dark:text-gray-400">
          Update your profile information.
        </p>
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
                <FormLabel className="dark:text-dark-ash-900">
                  Team Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g Maximo FC"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-dark-ash-900">
                  Location
                </FormLabel>
                <FormControl>
                  <AutocompleteInput
                    placeholder="Select Location"
                    setCoordinates={setCoordinates}
                    onPlaceChanged={(e) => form.setValue("location", e)}
                    value={form.getValues("location")}
                    applyTheme={false}
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
                <FormLabel className="dark:text-dark-ash-900">
                  Primary Contact Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234"
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
            name="logo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="dark:text-dark-ash-900">
                  Club Logo
                </FormLabel>
                <p className=" text-sm text-gray-500">
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
            <Button type="submit" className=" flex items-center gap-2">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
