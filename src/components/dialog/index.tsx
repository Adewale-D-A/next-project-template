import { cn } from "@/shared/_utils/cn";
import { ReactNode, useCallback, useEffect } from "react";
import { Button } from "../button";
import { X } from "lucide-react";
import { cva } from "class-variance-authority";

const backdropUniqueTitle = "modal-backdrop";

const modalVariants = cva(
  " w-full transition-all  fixed z-50 top-0 left-0 backgrop-bg-filter max-h-screen h-full flex items-center",
  {
    variants: {
      variant: {
        default: " justify-center",
        alignRight: "justify-end",
        alignLeft: "justify-end",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export default function ModalTemplate({
  open,
  onClose,
  title,
  children,
  className,
  variant,
}: {
  open: boolean;
  onClose: (val: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "alignRight" | "alignLeft";
}) {
  // simple useEffect to capture ESC key to close the modal
  const handleClose = useCallback(() => {
    onClose?.(false);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  const handleClickOutside = useCallback((event: any) => {
    if (event.target.title === backdropUniqueTitle) {
      handleClose();
    }
  }, []);

  if (!open) return null;

  return (
    <div
      onClick={(e) => handleClickOutside(e)}
      // data-state={open ? "open" : "closed"}
      className={cn(modalVariants({ variant }))}
      title={backdropUniqueTitle}
    >
      <div
        title="modal-content"
        // data-state={open ? "open" : "closed"}
        className={cn(
          "w-full max-w-2xl  bg-white dark:bg-dark-ash-900 h-fit max-h-[calc(100vh-100px)] overflow-y-auto p-4 lg:p-6 shadow-lg duration-200  rounded-lg",
          className,
          variant === "alignRight" && "max-h-[calc(100vh-10px)]"
          // "data-[state=open]:w-full data-[state=closed]:w-0 transition-all delay-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
        )}
      >
        {/* TITLE */}
        {title && (
          <div className="headline-md-b uppercase dark:text-white text-dark-ash-900 font-bold border-b  dark:border-gray-700 border-gray-200 mb-5 pb-3 flex justify-between items-center">
            <h6 className=" text-xl">{title}</h6>{" "}
            <Button
              onClick={() => handleClose()}
              variant={"unstyled"}
              size={"icon"}
              className=" dark:text-red-500 hover:text-red-500 hover:scale-125 transition-all"
            >
              <X />
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
