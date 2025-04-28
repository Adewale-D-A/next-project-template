"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { closeInfoBar } from "@/stores/features/app-native-features/info-modal";
import { CheckCircle, X } from "lucide-react";
import ModalTemplate from "./template";

const AlertModal = ({ openModal }: { openModal: boolean }) => {
  const dispatch = useAppDispatch();
  const { message, isError } = useAppSelector((state) => state.infoBar.value);

  const closeModal = useCallback(() => {
    dispatch(closeInfoBar());
  }, []);

  return (
    <ModalTemplate open={openModal} handleClose={closeModal}>
      <div className="flex flex-col gap-6 justify-center items-center">
        <div
          className={`${
            isError ? "text-red-500" : "text-primary"
          } w-full flex items-center flex-col gap-5`}
        >
          {isError ? (
            <X className="w-24 h-24 text-red-500" />
          ) : (
            <CheckCircle className="w-24 h-24 text-green-500" />
          )}

          <h4 className={`font-semibold text-3xl`}>
            {isError ? "Error" : "Success"}
          </h4>
          <p className=" text-sm">{message}</p>
          <button
            type="button"
            onClick={() => closeModal()}
            className={`${
              isError
                ? "border-red-300 hover:bg-red-500"
                : "border-primary hover:bg-primary"
            } p-2 px-4 text-lg font-semibold rounded-md bg-white border-2   hover:text-white  transition-all`}
          >
            Okay
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default AlertModal;
