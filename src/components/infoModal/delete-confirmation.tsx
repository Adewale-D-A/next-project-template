import { useCallback } from "react";
import { Button } from "../button";
import { Trash } from "lucide-react";
import ModalTemplate from "./template";

export default function DeleteConfirmation({
  open,
  setOpen,
  isLoading,
  confirmationHandler,
  title,
  description,
  btnTitle,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  confirmationHandler: () => void;
  isLoading: boolean;
  title: string;
  description: string;
  btnTitle: string;
}) {
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirmationFunction = useCallback(() => {
    confirmationHandler();
  }, [confirmationHandler]);

  return (
    <ModalTemplate open={open} setOpen={setOpen} className=" max-w-md">
      <div className={` w-full flex items-center flex-col gap-8 my-6`}>
        <Trash className=" text-red-500 h-24 w-24" />
        <div className=" w-ful flex flex-col gap-2 text-center">
          <h4 className={`font-semibold text-lg text-[#101828]`}>{title}</h4>
          <p className=" text-sm font-normal text-[#475467]">{description}</p>
        </div>
        <div className=" flex items-center gap-3">
          <Button
            type="button"
            disabled={false}
            onClick={() => handleConfirmationFunction()}
            className=" bg-red-200 text-red-500 whitespace-nowrap hover:bg-primary hover:text-white"
          >
            {btnTitle}
          </Button>
          <Button type="button" disabled={false} onClick={() => closeModal()}>
            No, Cancel
          </Button>
        </div>
      </div>
    </ModalTemplate>
  );
}
