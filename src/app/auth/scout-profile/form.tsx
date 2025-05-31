"use client";
import React, { useCallback, useEffect } from "react";
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
import FileInput from "@/components/input/file-input-w-button";
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
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import useAxiosMultipart from "@/config/services/axios-multipart-context";
import Link from "next/link";
import { clearAuthUser, updateUser } from "@/stores/features/auth/auth";
import purgeEmptyPayload from "@/utils/remove-empty-payload";
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
  club: z
    .string({
      message: "Club/Organization name is required.",
    })
    .optional(),
  organization_type: z
    .string({
      message: "Organization type is required.",
    })
    .optional(),

  photo: imageFileUpload,
});

type ScountProfileType = z.infer<typeof ScoutProfileSchema>;

export default function ScoutProfileForm() {
  const axios = useAxiosMultipart({ disableSuccMssg: false });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.auth?.value?.user);
  // const [coordinates, setCoordinates] = useState<{
  //   latitude: number;
  //   longitude: number;
  // }>({} as any);
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
      photo: { preview: "/logo.jpg" },
    },
  });

  // Pre-fill form field incase of corrections
  useEffect(() => {
    if (user?.firstName) {
      const {
        firstName,
        lastName,
        country,
        purpose,
        organization_type,
        organization_name,
        phoneNumber,
        profileImage,
      } = user;
      form?.reset({
        first_name: firstName,
        last_name: lastName,
        country: country,
        purpose: purpose,
        club: organization_name,
        organization_type: organization_type,
        phone: String(Number(phoneNumber || +234)),
        photo: profileImage,
      });
    }
  }, [user]);
  // Pre-fill form field incase of corrections

  const handleSubmit = useCallback(
    async (data: ScountProfileType) => {
      const { email, password } = user;
      const {
        phone,
        photo,
        country,
        first_name,
        last_name,
        organization_type,
        purpose,
        club,
      } = data;
      updateUser({
        firstName: first_name,
        lastName: last_name,
        country: country,
        purpose: purpose,
        organization_type: organization_type,
        organization_name: club,
        phoneNumber: phone,
        // profileImage: photo,
      });
      try {
        const payload = {
          email,
          password,
          phoneNumber: phone,
          image: photo,
          country: country,
          firstName: first_name,
          lastName: last_name,
          role: "scout",
          dob: "2000-01-01", //NOT EXPECTED
          gender: "MALE", //NOT EXPECTED

          purpose,
          organization: club,
          organizationType: organization_type,
        };
        const newPayload = purgeEmptyPayload({ payload });
        // await axios.post("/scout", newPayload);
        // console.log({ response });
        dispatch(clearAuthUser());
        router.push("/auth/sign-in");
      } catch (error) {}
    },
    [user]
  );

  return (
    <div className=" w-full h-fit lg:h-full overflow-y-auto max-w-3xl rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-3 lg:p-8 flex flex-col gap-6">
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
            control={form.control}
            name="photo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem className="w-full flex gap-3 items-center">
                <Image
                  src={form.getValues("photo")?.preview || "/logo.jpg"}
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
                        value: "ORGANISATION",
                      },
                      {
                        label: "Self",
                        value: "SELF",
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
          {/* Display only when scout purpose is for an organization */}
          {form.watch("purpose") === "organization" && (
            <>
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
                          {[
                            { label: "National", value: "national" },
                            { label: "International", value: "international" },
                            { label: "Others", value: "others" },
                          ].map((state) => (
                            <SelectItem value={state?.value} key={state?.value}>
                              {state?.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className=" w-full text-center my-7 flex flex-col gap-2">
            <Button
              isLoading={form?.formState?.isSubmitting}
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
