import { ReactNode, useCallback } from "react";
import { Dialog, DialogHeader } from "../dialog/dialog";
import { X } from "lucide-react";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

export default function ModalTemplate({
  children,
  open,
  setOpen,
  showXicon,
  title,
  titleIcon,
  className,
  handleClose,
}: {
  children: ReactNode;
  open: boolean;
  setOpen?: (val: boolean) => void;
  showXicon?: boolean;
  title?: string;
  titleIcon?: ReactNode;
  className?: string;
  handleClose?: () => void;
}) {
  const onChange = useCallback(() => {
    setOpen?.(false);
    handleClose?.();
  }, []);

  return (
    <Dialog open={open} onOpenChange={() => onChange()}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="headline-md-b"></DialogTitle>
        </DialogHeader>
        <div className="w-full xl:min-w-[700px] flex flex-col gap-3 justify-center items-center">
          {showXicon && (
            <div className="flex justify-between w-full items-center mb-8">
              <h4 className=" font-bold text-[#101828] text-lg flex items-center gap-2">
                {titleIcon} {title}
              </h4>
              <button
                type="button"
                title="clode modal"
                onClick={() => onChange()}
              >
                <X />
              </button>
            </div>
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
