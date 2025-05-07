import { Input } from "@/components/input/text-input";
import FileInput from "@/components/input/file-input-w-button";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/config/system/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/_shared/form/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/input/select";
import { Form } from "@/components/_shared/form/form";
import { phoneNumberSchema } from "@/lib/schema";
import { useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { useAppDispatch } from "@/hooks/store-hooks";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";

const PlayerSchema = z.object({
  first_name: z.string({
    message: "First name is required.",
  }),
  last_name: z.string({
    message: "Last name is required.",
  }),
  phone: phoneNumberSchema,
  foot: z.string({
    message: "Preferred playing foot is required",
  }),
  height: z.string({
    message: "Height is required.",
  }),
  weight: z.string({
    message: "Weight is required.",
  }),
  // teams details
  position: z.string({
    message: "Position is required.",
  }),
  jersey_number: z.string({
    message: "Jersey number is required.",
  }),
  start_date: z.string({
    message: "Start date is required.",
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

type PlayerSchemaType = z.infer<typeof PlayerSchema>;

const footOptions = [
  {
    label: "Right Foot",
    value: "right",
  },
  {
    label: "Left Foot",
    value: "left",
  },
  {
    label: "Both Foot",
    value: "both",
  },
];

const positionsOptions = [
  {
    label: "Right Wing",
    value: "right-wing",
  },
  {
    label: "Left Wing",
    value: "left-wing",
  },
  {
    label: "Mid Fielder",
    value: "midfielder",
  },
  {
    label: "Attacker",
    value: "attacker",
  },
];
export default function AddEditPlayerForm({
  setOpen,
  id,
}: {
  setOpen?: (val: boolean) => void;
  id?: string;
}) {
  const dispatch = useAppDispatch();
  const form = useForm<PlayerSchemaType>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      foot: "",
      height: "",
      weight: "",
      position: "",
      jersey_number: "",
      start_date: "",
      photo: "",
    },
  });

  const handleSubmit = useCallback((data: PlayerSchemaType) => {
    console.log({ data });
    dispatch(
      openInfobar({
        isError: false,
        message: "Player successfully added",
      })
    );
    setOpen?.(false);
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem className="w-full flex gap-3 items-end">
                <div className=" flex flex-col gap-2">
                  <Image
                    src={"/logo.png"}
                    alt="picture"
                    height={200}
                    width={200}
                    className=" h-20 w-20 rounded-full object-cover"
                  />
                  <p>Profile picture</p>
                  <span className=" text-gray-500">PNG, JPEG under 5MB</span>
                </div>
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
              name="foot"
              render={({ field }) => {
                const { ref, ...rest } = field;

                return (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>Preferred Foot</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...rest}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Preferred Footy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[50vh]" position="popper">
                        <SelectGroup>
                          {footOptions.map((state) => (
                            <SelectItem value={state?.value} key={state?.value}>
                              {state?.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="height"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel className="text-blacky">Height</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="5.9"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="weight"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel className="text-blacky">Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="80"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* teams details */}

          <div className=" flex flex-col gap-4  my-5 border-t border-gray-200 dark:border-dark-ash-500 py-5">
            <h6 className=" font-semibold text-2xl dark:text-white text-dark-ash-900">
              Team Details
            </h6>
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[50vh]" position="popper">
                      <SelectGroup>
                        {positionsOptions.map((state) => (
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

            <FormField
              name="jersey_number"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel className="text-blacky">Jersey Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="start_date"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel className="text-blacky">Start Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1"
                      type="date"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className=" w-full text-center my-5 flex flex-col lg:flex-row gap-2">
            <Button
              type="button"
              variant={"unstyled"}
              onClick={() => setOpen?.(false)}
              className=" border w-full dark:border-white dark:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" className=" flex items-center gap-2">
              {id ? "Edit" : "Add"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
