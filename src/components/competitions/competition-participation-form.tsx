"use client";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../button";
import { useAppDispatch } from "@/hooks/store-hooks";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
import { replaceActiveCompetition } from "@/stores/features/services/active-competitions";
import ModalTemplate from "../dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/input/select";
import { Player } from "@/types/player";
import useGetAllPlayers from "@/hooks/services/useGetAllPlayers";
import Loader from "../loader";

type Title = "goalKeepers" | "defenders" | "midFielders" | "forwards";
const MINIMUM_PLAYERS = 11;

export default function CompetitionParticipationForm({
  open,
  onClose,
  competitionId,
}: {
  open: boolean;
  onClose: (val: boolean) => void;
  competitionId: string;
}) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFailed, setIsFailed, retry } = useGetAllPlayers({
    page: 1,
    limit: 1000,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playersList, setPlayersList] = useState(data);
  const [selectedList, setSelectedList] = useState<{
    goalKeepers: Player[];
    defenders: Player[];
    midFielders: Player[];
    forwards: Player[];
  }>({ goalKeepers: [], defenders: [], midFielders: [], forwards: [] });
  const [goalKeepers, setGoalKeepers] = useState("");

  useEffect(() => {
    if (data) {
      setPlayersList(data);
    }
  }, [data]);

  const onChange = useCallback(
    (value: string, title: Title) => {
      const findPlayer = data.find((item) => item?._id === value);
      if (findPlayer) {
        setSelectedList((prev) => {
          return { ...prev, [title]: [...prev[title], findPlayer] };
        });
        setPlayersList((prev) => {
          return prev.filter((player) => player?._id !== value);
        });
      }
    },
    [data]
  );

  const handleDelete = useCallback(
    (id: string, title: Title) => {
      const foundPlayer = data.find((item) => item?._id === id);
      if (foundPlayer) {
        setSelectedList((prev) => {
          return {
            ...prev,
            [title]: prev[title].filter((player) => player?._id !== id),
          };
        });
        setPlayersList((prev) => {
          return [...prev, foundPlayer];
        });
      }
    },
    [data]
  );

  const submitForm = useCallback(() => {
    try {
      setIsSubmitting(true);
      console.log({ selectedList });
      dispatch(
        openInfobar({
          message: "Participation request sent",
          isError: false,
        })
      );
      dispatch(
        replaceActiveCompetition({ _id: competitionId, status: "request-sent" })
      );
      onClose(false);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [competitionId, selectedList]);
  return (
    <ModalTemplate
      open={open}
      onClose={onClose}
      title={"PARTICIPATION FORM"}
      className=" max-w-4xl"
    >
      <Loader
        {...{ isLoading, isFailed, setIsFailed, retry }}
        className=" flex flex-col gap-3"
      >
        <div className=" flex items-center gap-3">
          <h3 className=" dark:text-white text-dark-ash-900 text-lg font-bold">
            Total Players:{" "}
            {selectedList.goalKeepers.length +
              selectedList.defenders.length +
              selectedList.midFielders.length +
              selectedList.forwards.length}
          </h3>
          <h3 className=" dark:text-white text-dark-ash-900 text-lg font-bold">
            Minimum Players: {MINIMUM_PLAYERS}
          </h3>
        </div>
        {/* Goal keepers */}
        <div className=" flex flex-col gap-1 dark:bg-dark-ash-700/60 bg-gray-50 rounded-lg">
          <Select
            onValueChange={(val) => onChange(val, "goalKeepers")}
            value={goalKeepers}
          >
            <SelectTrigger>
              <SelectValue placeholder="Goal Keepers" />
            </SelectTrigger>
            <SelectContent className="max-h-[50vh]" position="popper">
              <SelectGroup>
                {playersList.map((state) => (
                  <SelectItem value={state?._id} key={state?._id}>
                    {state?.firstName} {state?.lastName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedList?.goalKeepers.length > 0 && (
            <div className=" flex items-center gap-3 p-3">
              {selectedList?.goalKeepers.map((item) => (
                <span
                  key={item?._id}
                  className="  bg-primary rounded-lg p-2 px-4 text-dark-ash-900 flex items-center gap-2"
                >
                  {item?.firstName} {item?.lastName}
                  <Button
                    variant={"unstyled"}
                    size={"icon"}
                    onClick={() => handleDelete(item?._id, "goalKeepers")}
                    className=" text-red-500 hover:scale-125 transition-all"
                  >
                    <X className=" text-red-500" />
                  </Button>
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Defenders */}
        <div className=" flex flex-col gap-1 dark:bg-dark-ash-700/60 bg-gray-50 rounded-lg">
          <Select
            onValueChange={(val) => onChange(val, "defenders")}
            value={goalKeepers}
          >
            <SelectTrigger>
              <SelectValue placeholder="Defenders" />
            </SelectTrigger>
            <SelectContent className="max-h-[50vh]" position="popper">
              <SelectGroup>
                {playersList.map((state) => (
                  <SelectItem value={state?._id} key={state?._id}>
                    {state?.firstName} {state?.lastName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedList?.defenders.length > 0 && (
            <div className=" flex items-center gap-3 p-3">
              {selectedList?.defenders.map((item) => (
                <span
                  key={item?._id}
                  className="  bg-primary rounded-lg p-2 px-4 text-dark-ash-900 flex items-center gap-2"
                >
                  {item?.firstName} {item?.lastName}
                  <Button
                    variant={"unstyled"}
                    size={"icon"}
                    onClick={() => handleDelete(item?._id, "defenders")}
                    className=" text-red-500 hover:scale-125 transition-all"
                  >
                    <X className=" text-red-500" />
                  </Button>
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Mid fielders */}
        <div className=" flex flex-col gap-1 dark:bg-dark-ash-700/60 bg-gray-50 rounded-lg">
          <Select
            onValueChange={(val) => onChange(val, "midFielders")}
            value={goalKeepers}
          >
            <SelectTrigger>
              <SelectValue placeholder="Mid fielders" />
            </SelectTrigger>
            <SelectContent className="max-h-[50vh]" position="popper">
              <SelectGroup>
                {playersList.map((state) => (
                  <SelectItem value={state?._id} key={state?._id}>
                    {state?.firstName} {state?.lastName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedList?.midFielders.length > 0 && (
            <div className=" flex items-center gap-3 p-3">
              {selectedList?.midFielders.map((item) => (
                <span
                  key={item?._id}
                  className="  bg-primary rounded-lg p-2 px-4 text-dark-ash-900 flex items-center gap-2"
                >
                  {item?.firstName} {item?.lastName}
                  <Button
                    variant={"unstyled"}
                    size={"icon"}
                    onClick={() => handleDelete(item?._id, "midFielders")}
                    className=" text-red-500 hover:scale-125 transition-all"
                  >
                    <X className=" text-red-500" />
                  </Button>
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Forwards  */}
        <div className=" flex flex-col gap-1 dark:bg-dark-ash-700/60 bg-gray-50 rounded-lg">
          <Select
            onValueChange={(val) => onChange(val, "forwards")}
            value={goalKeepers}
          >
            <SelectTrigger>
              <SelectValue placeholder="Forwards" />
            </SelectTrigger>
            <SelectContent className="max-h-[50vh]" position="popper">
              <SelectGroup>
                {playersList.map((state) => (
                  <SelectItem value={state?._id} key={state?._id}>
                    {state?.firstName} {state?.lastName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedList?.forwards.length > 0 && (
            <div className=" flex items-center gap-3 p-3">
              {selectedList?.forwards.map((item) => (
                <span
                  key={item?._id}
                  className="  bg-primary rounded-lg p-2 px-4 text-dark-ash-900 flex items-center gap-2"
                >
                  {item?.firstName} {item?.lastName}
                  <Button
                    variant={"unstyled"}
                    size={"icon"}
                    onClick={() => handleDelete(item?._id, "forwards")}
                    className=" text-red-500 hover:scale-125 transition-all"
                  >
                    <X className=" text-red-500" />
                  </Button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className=" w-full text-center mt-10 flex flex-col lg:flex-row gap-2">
          <Button
            type="button"
            variant={"unstyled"}
            onClick={() => onClose?.(false)}
            className=" border w-full dark:border-white dark:text-white"
          >
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            type="button"
            onClick={() => submitForm()}
            className=" flex items-center gap-2"
          >
            Send Participation Request
          </Button>
        </div>
      </Loader>
    </ModalTemplate>
  );
}
