"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { cn } from "@/shared/_utils/cn";
import { toggleMenuView } from "@/stores/features/app-native-features/nav-menu";
import { ChevronLeft } from "lucide-react";
import { useCallback } from "react";

export default function ToggleNavMenuButton() {
  const dispatch = useAppDispatch();
  const fullView = useAppSelector(
    (state) => state?.navMenuProperties?.value?.fullMenuView
  );

  const toggleMenu = useCallback(() => {
    dispatch(toggleMenuView());
  }, []);
  return (
    <button
      onClick={() => toggleMenu()}
      className="dark:text-primary text-dark-ash-900 hover:dark:text-white "
    >
      <ChevronLeft
        className={cn(
          "w-6 h-6",
          fullView ? "" : "rotate-180 w-10 h-10 transition-all"
        )}
      />
    </button>
  );
}
