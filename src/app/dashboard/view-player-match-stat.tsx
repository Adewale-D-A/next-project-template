"use client";

import player from "@/mock-up-data/player.json";

import Image from "next/image";
import { CheckCheck, Eye, Trash } from "lucide-react";
import ModalTemplate from "@/components/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/_shared/form/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/_shared/form/form";
import { Button } from "@/components/button";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/hooks/store-hooks";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
import { cn } from "@/shared/_utils/cn";
import { addPlayerToWatchlist } from "@/stores/features/services/scout/watchlist";
import useGetPlayer from "@/hooks/services/useGetPlayer";
import useGetPlayerInMatch from "@/hooks/services/useGetPlayerInMatch";
import Loader from "@/components/loader";
import formatDate from "@/utils/dates/isoDateConverter";

const InterestSchema = z.object({
  interest: z.string({
    message: "First name is required.",
  }),
});
type InterestSchemaType = z.infer<typeof InterestSchema>;
export default function ViewPlayerMatchStat({
  open,
  onClose,
  id,
  usertype = "club",
}: {
  open: boolean;
  onClose: (val: boolean) => void;
  id: string;
  usertype?: "club" | "scout";
}) {
  const dispatch = useAppDispatch();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isInterestRequested, setIsInterestRequest] = useState(false);

  const { data, isLoading, isFailed, setIsFailed, retry } = useGetPlayerInMatch(
    {
      id,
    }
  );
  const form = useForm<InterestSchemaType>({
    resolver: zodResolver(InterestSchema),
    defaultValues: {
      interest: "",
    },
  });

  const addToWatchlist = useCallback(
    (id: string) => {
      dispatch(addPlayerToWatchlist(data));
      dispatch(
        openInfobar({
          isError: false,
          message: "Player successfully added to watchlist",
        })
      );
      setIsWatchlisted(true);
    },
    [data]
  );

  const removeFromWatchlist = useCallback((id: string) => {
    dispatch(
      openInfobar({
        isError: false,
        message: "Player successfully removed from watchlist",
      })
    );
    setIsWatchlisted(false);
  }, []);

  const showInterest = useCallback(async (data: InterestSchemaType) => {
    dispatch(
      openInfobar({
        isError: false,
        message: "Interest in player successfully registed",
      })
    );
    setIsInterestRequest(true);
  }, []);
  return (
    <ModalTemplate
      open={open}
      onClose={(val) => onClose(val)}
      variant="alignRight"
      className=" max-w-4xl h-full"
      title="Player Match Stat"
    >
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className=" px-0 md:p-4 text-dark-ash-900 dark:text-white flex flex-col gap-5"
      >
        {/* Basic Info */}
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch border rounded-lg dark:border-dark-ash-700 border-gray-300 p-3">
          <div
            className={cn(
              " p-3 rounded-lg h-full flex flex-col justify-center text-black",
              " bg-top bg-no-repeat bg-cover bg-black bg-[url('/images/bg-2.6.jpg')]"
            )}
          >
            <div>
              <Image
                src={data?.profile_img || "/logo.jpg"}
                alt="Profile"
                height={200}
                width={200}
                className=" w-16 h-16 aspect-square rounded-full"
              />
              <p className=" text-lg">
                {data?.firstName}{" "}
                <span className="font-bold">{data?.lastName}</span>
              </p>
              <p className="">{data?.position}</p>
            </div>
          </div>
          <div className=" flex flex-col gap-2 text-gray-600 dark:text-white">
            {[
              {
                label: "Position",
                value: data?.position,
              },
              {
                label: "Foot",
                value: data?.preferredFoot,
              },
              {
                label: "Height",
                value: `${data?.height}M`,
              },
              {
                label: "Weight",
                value: `${data?.weight}KG`,
              },
              {
                label: "Jersey Number",
                value: `#${data?.jerseyNumber}`,
              },
              {
                label: "Added",
                value: formatDate(data?.added),
              },
            ].map((item) => (
              <div
                key={item?.label}
                className=" w-full flex justify-between gap-2"
              >
                <span>{item?.label}</span>
                <span>{item?.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Season Summary */}
        <div className=" flex flex-col gap-2">
          <h6 className=" font-semibold text-lg">Match Summary</h6>
          <div className="border rounded-lg dark:border-dark-ash-700 border-gray-300 grid grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              {
                label: "Assists",
                value: data?.assist,
              },
              {
                label: "Shorts on Target",
                value: data?.cleanshots,
              },
              {
                label: "Goals",
                value: data?.goals,
              },
              {
                label: "Play time",
                value: `${data?.play_time}'`,
              },
              {
                label: "Distance",
                value: `${data?.distance}km`,
              },
              {
                label: "No. of Passes",
                value: `${data?.no_of_passes}`,
              },
              {
                label: "Fouls",
                value: data?.fouls,
              },
            ].map((item) => (
              <div
                key={item?.label}
                className=" w-full flex flex-col gap-4 border-r border-t dark:border-dark-ash-700 border-gray-300  p-3 "
              >
                <span className=" text-gray-500 dark:text-white">
                  {item?.label}
                </span>
                <span className=" font-bold text-xl">{item?.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* stats */}
        {/* <div className=" flex flex-col gap-2">
          <h6 className=" font-semibold text-lg">Stats</h6>
          <div className=" w-full overflow-x-auto">
            <Table className=" w-full">
              <TableHeader>
                <TableRow className="dark:bg-dark-ash-700 dark:text-white">
                  {["MINUTE", "ACTION"].map((head) => (
                    <TableHead key={head}>{head}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="[&>*:nth-child(even)]:dark:!bg-dark-ash-700">
                {[
                  {
                    minute: "10'",
                    action: "Foul, Yello Card",
                  },
                  {
                    minute: "43'",
                    action: "Assist",
                  },
                  {
                    minute: "56'",
                    action: "Goal",
                  },
                  {
                    minute: "70'",
                    action: "Substitution",
                  },
                ].map((item, index) => {
                  return (
                    <TableRow key={index} className="">
                      <TableCell>
                        <span>{item?.minute}</span>
                      </TableCell>
                      <TableCell className=" text-gray-500">
                        {item?.action}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div> */}
        {usertype === "scout" && (
          <>
            {isWatchlisted && (
              <Button
                variant={"urgent"}
                onClick={() => removeFromWatchlist(id)}
                className=" flex items-center gap-2"
              >
                Remove from Watchlist
                <Trash />
              </Button>
            )}
            {!isWatchlisted && (
              <Button
                onClick={() => addToWatchlist(id)}
                className=" flex items-center gap-2"
              >
                Add to Watchlist
                <Eye />
              </Button>
            )}
          </>
        )}
        {/* Show interest */}
        {/* Show if interest has not been requested prior by this scout*/}
        {usertype === "scout" && !isInterestRequested && (
          <div className=" p-4 rounded-md bg-primary/10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(showInterest)}
                className=" flex flex-col gap-4"
              >
                <FormField
                  name="interest"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-1">
                      <FormLabel className="text-blacky">Interest</FormLabel>
                      <FormControl>
                        <textarea
                          rows={4}
                          required
                          placeholder="Please write to iSportX team about your interest in this player"
                          {...field}
                          className={cn(
                            "flex w-full shadow-none rounded-md border border-gray-200  placeholder:text-gray-300  bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            false &&
                              "dark:bg-dark-ash-700 dark:border-none dark:text-white dark:placeholder:text-dark-ash-500"
                          )}
                        ></textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" w-full flex justify-end">
                  <Button
                    type="submit"
                    className=" w-fit px-4 flex items-center gap-2"
                  >
                    Submit Interest
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Show if  interest has been requested by this scout */}
        {usertype === "scout" && isInterestRequested && (
          <div className=" bg-gray-100 rounded-lg flex items-center p-4 dark:bg-dark-ash-700">
            <p className=" text-gray-400 flex items-center gap-2">
              <CheckCheck /> Interest has been shown by this scout
            </p>
          </div>
        )}
        {/* comments */}
        <div className=" flex flex-col gap-2">
          <h6 className=" font-semibold text-lg">Comments</h6>
          <div className=" bg-gray-100 rounded-lg min-h-10 dark:bg-dark-ash-700"></div>
        </div>
      </Loader>
    </ModalTemplate>
  );
}
