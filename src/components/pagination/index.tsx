import { useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pagination } from "@/types/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/input/select";
import { cn } from "@/shared/_utils/cn";
import { Button } from "../button";
export default function Pagination({
  pagination,
  isLoading,
  label,
  onCurrentPageChange,
  onPageSizeChange,
}: {
  pagination: pagination;
  isLoading?: boolean;
  label?: string;
  onCurrentPageChange?: (val: number) => void;
  onPageSizeChange?: (val: number) => void;
}) {
  // productsArray next function
  const showNextproductsArray = useCallback(() => {
    if (pagination?.total >= pagination?.current_page * pagination?.per_page) {
      onCurrentPageChange?.(pagination?.current_page + 1);
    }
  }, [pagination]);

  // productsArray next previous
  const showPrevproductsArray = useCallback(() => {
    if (!(pagination?.current_page < 1)) {
      onCurrentPageChange?.(pagination?.current_page - 1);
    }
  }, [pagination]);
  return (
    <div className="w-full flex items-center flex-col md:flex-row justify-between gap-2 my-8 px-2.5">
      <span>
        Showing {pagination?.to} of {pagination?.total} {label}{" "}
      </span>
      <Select
        value={String(pagination.per_page || 10)}
        onValueChange={(v) => onPageSizeChange?.(Number(v))}
      >
        <SelectTrigger className=" w-fit" applyTheme={false}>
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent className=" w-fit" applyTheme={false}>
          {[10, 20, 50, 100].map((v) => (
            <SelectItem key={String(v)} value={String(v)}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className=" flex items-center gap-2">
        <Button
          type="button"
          title="next"
          variant={"unstyled"}
          size="icon"
          isLoading={isLoading}
          disabled={Boolean(pagination?.current_page < 2)}
          className={cn(
            " md:w-fit aspect-square  p-2 flex items-center justify-center border rounded-full transition-all",
            "hover:bg-primary hover:text-white border-primary cursor-pointer "
          )}
          onClick={() => showPrevproductsArray()}
        >
          <ArrowLeft className=" h-4 w-4 min-h-4 min-w-4" />
        </Button>
        <div className="flex gap-2 flex-wrap justify-between md:justify-center">
          {Array.from({ length: pagination?.last_page }, (_, index) => (
            <Button
              type="button"
              title="next"
              variant={"unstyled"}
              size="icon"
              key={String(index)}
              onClick={() => onCurrentPageChange?.(index + 1)}
              className={cn(
                "border min-h-4 min-w-4 aspect-square flex items-center justify-center rounded-full p-3 hover:border-primary hover:bg-primary transition-all cursor-pointer",
                index + 1 === pagination?.current_page &&
                  "border-primary bg-primary text-white "
              )}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          type="button"
          title="next"
          variant={"unstyled"}
          isLoading={isLoading}
          size="icon"
          disabled={Boolean(pagination?.last_page <= pagination?.current_page)}
          className={cn(
            "md:w-fit aspect-square  p-2 flex items-center justify-center border rounded-full transition-all",
            pagination?.last_page <= pagination?.current_page
              ? "border-gray-500 cursor-not-allowed"
              : "hover:bg-primary hover:text-white border-primary cursor-pointer "
          )}
          onClick={() => showNextproductsArray()}
        >
          <ArrowRight className=" h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
