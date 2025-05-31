import { Input } from "@/components/input/text-input";
import FileInput from "@/components/input/file-input-w-button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/_shared/form/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/input/select";
import { imageFileUpload, phoneNumberSchema } from "@/lib/schema";
import { useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { useAppDispatch } from "@/hooks/store-hooks";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
import {
  addPlayerToList,
  replacePlayerInList,
} from "@/stores/features/services/players-list";
import useAxiosMultipart from "@/config/services/axios-multipart-context";
import useGetPlayer from "@/hooks/services/useGetPlayer";
import { formatDateToString } from "@/utils/dates/isoDateConverter";
import Loader from "@/components/loader";
import purgeEmptyPayload from "@/utils/remove-empty-payload";

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
  photo: imageFileUpload,
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
  const axios = useAxiosMultipart({});
  const dispatch = useAppDispatch();
  const form = useForm<PlayerSchemaType>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      height: "",
      weight: "",
      // foot: "",
      // position: "",
      jersey_number: "",
      start_date: "",
      photo: { preview: "/logo.jpg", file: null },
    },
  });

  // populate fields for edit
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetPlayer({
    id,
  });
  useEffect(() => {
    if (data?.firstName && id) {
      const {
        firstName,
        lastName,
        phoneNumber,
        preferredFoot,
        height,
        weight,
        position,
        jerseyNumber,
        startDate,
        profile_img,
      } = data;
      form.reset({
        first_name: firstName,
        last_name: lastName,
        phone: String(Number(phoneNumber || +234)),
        height: String(height),
        weight: String(weight),
        jersey_number: String(jerseyNumber),
        start_date: formatDateToString(new Date(startDate)),
        photo: { preview: profile_img },
        foot: preferredFoot,
        position,
      });
    }
  }, [data]);

  const handleSubmit = useCallback(
    async (data: PlayerSchemaType) => {
      console.log({ data });
      const {
        first_name,
        last_name,
        phone,
        foot,
        height,
        weight,
        position,
        jersey_number,
        start_date,
        photo,
      } = data;
      try {
        // const payload = {
        //   firstName: first_name,
        //   lastName: last_name,
        //   phoneNumber: phone,
        //   image: photo,
        //   preferredFoot: foot,
        //   position,
        //   height,
        //   weight,
        //   role: "player",
        //   clubId: "", //Not applicable
        //   email: "", //Not applicable
        //   dob: "", //Not applicable
        //   country: "", //Not applicable
        //   gender: "", //Not applicable

        //   // jerseyNumber: jersey_number, //Applicable
        //   // startDate: start_date //Applicable
        // }
        // const newPayload = purgeEmptyPayload({payload})
        if (id) {
          // const response = await axios.put("/players", newPayload);
          dispatch(
            replacePlayerInList({
              _id: id,
              firstName: first_name,
              lastName: last_name,
              jerseyNumber: jersey_number,
              profile_img: photo?.preview,
              position,
            })
          );
          dispatch(
            openInfobar({
              isError: false,
              message: "Player successfully updated",
            })
          );
          setOpen?.(false);
          return;
        }
        // const response = await axios.post("/players", newPayload);
        const dateValue = new Date(start_date).toISOString();
        dispatch(
          addPlayerToList({
            _id: "random_string_id",
            firstName: first_name,
            lastName: last_name,
            jerseyNumber: jersey_number,
            ability: 0,
            status: "active",
            position,
            goals: 0,
            assist: 0,
            distance: 0,
            speed: 0,
            added: dateValue,
            last_activity: dateValue,
            profile_img: photo?.preview,
          })
        );
        dispatch(
          openInfobar({
            isError: false,
            message: "Player successfully added",
          })
        );
        setOpen?.(false);
      } catch (error: any) {
        console.log({ error });
      }
    },
    [id]
  );

  return (
    <Loader
      {...{
        isLoading,
        isFailed,
        setIsFailed,
        retry,
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem className="w-full flex gap-3 items-end dark:text-white">
                <div className=" flex flex-col gap-2">
                  <Image
                    src={form.getValues("photo")?.preview || "/logo.jpg"}
                    alt="picture"
                    height={200}
                    width={200}
                    className=" h-20 w-20 rounded-full object-cover"
                  />
                  <p>Profile picture</p>
                  <span className=" text-gray-500">PNG, JPEG under 5MB</span>
                </div>
                <div className=" flex flex-col items-center gap-2">
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
                </div>
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
                const { ref, value, ...rest } = field;
                return (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>Preferred Foot</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={value || data?.preferredFoot}
                      {...rest}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Preferred Foot" />
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
              render={({ field }) => {
                const { ref, value, ...rest } = field;
                return (
                  <FormItem className="w-full flex flex-col gap-1">
                    <FormLabel>Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={value || data?.position}
                      {...rest}
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
                );
              }}
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
                      required
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
            <Button
              isLoading={form?.formState?.isSubmitting}
              type="submit"
              className=" flex items-center gap-2"
            >
              {id ? "Update Player" : "Add Player"}
            </Button>
          </div>
        </form>
      </Form>
    </Loader>
  );
}
