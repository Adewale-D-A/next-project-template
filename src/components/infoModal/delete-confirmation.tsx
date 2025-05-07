import { useCallback } from "react";
import { Button } from "../button";
import { Trash } from "lucide-react";
import ModalTemplate from "../dialog";

export default function DeleteConfirmation({
  open,
  setOpen,
  isLoading,
  confirmationHandler,
  description,
  btnTitle,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  confirmationHandler: () => void;
  isLoading: boolean;
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
    <ModalTemplate open={open} onClose={closeModal}>
      <div className={` w-full flex items-center flex-col gap-8 my-6`}>
        <Trash className=" text-red-500 h-24 w-24" />
        <p className=" text-sm font-normal text-[#475467] dark:text-white">
          {description}
        </p>

        <div className=" flex items-center gap-3">
          <Button
            type="button"
            disabled={false}
            onClick={() => handleConfirmationFunction()}
            className=" w-fit px-5"
            variant={"urgent"}
          >
            {btnTitle}
          </Button>
          <Button
            type="button"
            disabled={false}
            onClick={() => closeModal()}
            className=" w-fit px-5"
          >
            No, Cancel
          </Button>
        </div>
      </div>
    </ModalTemplate>
  );
}
