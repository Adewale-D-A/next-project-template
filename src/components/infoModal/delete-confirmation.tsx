import { useCallback } from "react";
import { Button } from "../button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

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
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle className="headline-md-b">{title}</DialogTitle>
        </DialogHeader>
        <div className={` w-full flex items-center flex-col gap-8 my-6`}>
          <Trash className=" text-red-500 h-24 w-24" />
          <p className=" text-sm font-normal text-[#475467]">{description}</p>

          <DialogFooter className=" flex items-center gap-3">
            <Button
              type="button"
              disabled={false}
              onClick={() => handleConfirmationFunction()}
              className=" w-fit px-5"
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
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
