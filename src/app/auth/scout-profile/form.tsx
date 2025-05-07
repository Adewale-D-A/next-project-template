"use client";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/_shared/form/form";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/_shared/form/form";
import { Input } from "@/components/input/text-input";
import { phoneNumberSchema } from "@/lib/schema";
import FileInput from "@/components/input/file-input-w-button";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/config/system/constants";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/input/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/input/select";

import countries from "@/shared/_utils/countries";
import { useAppSelector } from "@/hooks/store-hooks";
const ScoutProfileSchema = z.object({
  first_name: z.string({
    message: "First name is required.",
  }),
  last_name: z.string({
    message: "Last name is required.",
  }),
  phone: phoneNumberSchema,
  country: z.string({
    message: "Country is required.",
  }),
  purpose: z.string({
    message: "Purpose is required.",
  }),
  club: z.string({
    message: "Club/Organization name is required.",
  }),
  organization_type: z.string({
    message: "Organization type is required.",
  }),

  photo: z
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

type ScountProfileType = z.infer<typeof ScoutProfileSchema>;

export default function ScoutProfileForm() {
  const router = useRouter();
  const user = useAppSelector((state) => state?.auth?.value?.user);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>({} as any);
  const form = useForm<ScountProfileType>({
    resolver: zodResolver(ScoutProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      country: "",
      purpose: "",
      club: "",
      organization_type: "",
      photo: "",
    },
  });

  const handleSubmit = useCallback(
    (data: ScountProfileType) => {
      console.log({ ...data, coordinates, user });
      const payload = {
        email: user?.email,
        password: user?.password,
        role: "scout",
        phoneNumber: data?.phone,
        image: data?.photo,
        country: data?.country,
        firstName: data?.first_name,
        lastName: data?.last_name,
        // dob: "", //NOT EXPECTED
        // gender: "", //NOT EXPECTED
      };
      router.push("/auth/sign-in");
    },
    [coordinates, user]
  );

  return (
    <div className=" w-full h-fit lg:h-full overflow-y-auto max-w-3xl rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-3 lg:p-8 flex flex-col gap-6">
      <h6 className=" font-bold text-gray-500 text-xl">AAD</h6>
      <section>
        <h1 className="text-3xl font-semibold">
          Create your team&apos;s profile
        </h1>
        <p className="text-sm mt-1 dark:text-gray-400">
          Thank you for joining our platform. Let&apos;s set up your profile.
        </p>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem className="w-full flex gap-3 items-center">
                <Image
                  src={"/logo.png"}
                  alt="picture"
                  height={200}
                  width={200}
                  className=" h-20 w-20 rounded-full object-cover"
                />
                <FormControl>
                  <FileInput
                    placeholder="Upload picture"
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
          <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel className="text-blacky">First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel className="text-blacky">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Doe"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            name="country"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Country of Residence</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[50vh]" position="popper">
                    <SelectGroup>
                      {countries.map((state) => (
                        <SelectItem value={state?.name} key={state?.name}>
                          {state?.flag} - {state?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="purpose"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormMessage />
                <p className=" font-semibold">
                  Are you using IsportsX on behalf of an organization or for
                  yourself?
                </p>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        label: "Organization",
                        value: "organization",
                      },
                      {
                        label: "Self",
                        value: "self",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className=" cursor-pointer flex items-center gap-2"
                      >
                        <RadioGroupItem
                          id={option.value}
                          value={option.value}
                          className=""
                        />
                        <span>{option?.label}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            name="club"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="text-blacky">
                  Organizaiton/Club Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. Maximo FC"
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
            name="organization_type"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Organization type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[50vh]" position="popper">
                    <SelectGroup>
                      {["National", "Internationl", "Others"].map((state) => (
                        <SelectItem value={state} key={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" w-full text-center my-7 flex flex-col gap-2">
            <Button type="submit" className=" flex items-center gap-2">
              Continue <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
