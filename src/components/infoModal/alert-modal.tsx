"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { closeInfoBar } from "@/stores/features/app-native-features/info-modal";
import { CheckCircle, X } from "lucide-react";
import { cn } from "@/shared/_utils/cn";
import { Button } from "../button";
import ModalTemplate from "../dialog";

const AlertModal = () => {
  const dispatch = useAppDispatch();
  const { show } = useAppSelector((state) => state.infoBar.value);
  const { message, isError } = useAppSelector((state) => state.infoBar.value);

  const closeModal = useCallback(() => {
    dispatch(closeInfoBar());
  }, []);

  return (
    <ModalTemplate open={show} onClose={closeModal}>
      <div
        className={cn(
          "w-full flex items-center flex-col gap-5",
          isError && "text-red-500",
          !isError && "text-green-500"
        )}
      >
        {isError ? (
          <X className="w-24 h-24" />
        ) : (
          <CheckCircle className="w-24 h-24" />
        )}

        <h4 className={`font-semibold text-3xl`}>
          {isError ? "Error" : "Success"}
        </h4>
        <p className=" text-sm">{message}</p>
        <Button
          type="button"
          onClick={() => closeModal()}
          className="w-fit px-5"
        >
          Okay
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default AlertModal;
