"use client";

import useAxiosJson from "@/config/services/axios-json-context";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { useCallback, useState } from "react";
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
import FileInput from "@/components/input/file-input-w-button";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/config/system/constants";
import { phoneNumberSchema } from "@/lib/schema";
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
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
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

export default function UpdateScoutProfileForm() {
  const axios = useAxiosJson({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth.value);
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
      console.log({ ...data, coordinates });
      try {
        dispatch(
          openInfobar({
            message: "Scout's profile successfully updated.",
            isError: false,
          })
        );
      } catch (error) {}
    },
    [coordinates]
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
                  <FormLabel className="dark:text-dark-ash-900">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John"
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
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel className="dark:text-dark-ash-900">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Doe"
                      value={field.value}
                      onChange={field.onChange}
                      applyTheme={false}
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
            name="country"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="dark:text-dark-ash-900">
                  Country of Residence
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger applyTheme={false}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className="max-h-[50vh]"
                    position="popper"
                    applyTheme={false}
                  >
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
                          applyTheme={false}
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
                <FormLabel className="dark:text-dark-ash-900">
                  Organizaiton/Club Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. Maximo FC"
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
            name="organization_type"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel className="dark:text-dark-ash-900">
                  Organization type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger applyTheme={false}>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className="max-h-[50vh]"
                    position="popper"
                    applyTheme={false}
                  >
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
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
