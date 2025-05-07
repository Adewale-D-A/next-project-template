"use client";

import { cn } from "@/shared/_utils/cn";
import { LucideIcon, Settings, Home, User2, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Logo } from "../logo";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import ToggleNavMenuButton from "./toggle-menu-button";
import { toggleMenuView } from "@/stores/features/app-native-features/nav-menu";

const ROUTES = {
  club: [
    {
      label: "Home",
      href: "/dashboard/club",
      icon: Home,
      exact: true,
    },
    {
      label: "...More",
      href: "/dashboard/club/more",
      icon: User2,
    },
    {
      label: "Settings",
      href: "/dashboard/club/settings",
      icon: Settings,
    },
  ],
  scout: [
    {
      label: "Home",
      href: "/dashboard/scout",
      icon: Home,
      exact: true,
    },
    {
      label: "...More",
      href: "/dashboard/scout/more",
      icon: Trophy,
    },
    {
      label: "Settings",
      href: "/dashboard/scout/settings",
      icon: Settings,
    },
  ],
} as const;

export const DashboardSideNav = ({ role }: { role: "club" | "scout" }) => {
  const dispatch = useAppDispatch();

  //get status of side menu from redux store
  const fullView = useAppSelector(
    (state) => state?.navMenuProperties?.value?.fullMenuView
  );
  const toggleMenu = useCallback(() => {
    dispatch(toggleMenuView());
  }, []);
  return (
    <div>
      <div
        className={cn(
          `dark:bg-dark-ash-900 bg-white h-full overflow-y-auto py-8  flex flex-col transition-width duration-200 z-20 dark:border-r-0 border-r border-gray-200`,
          fullView
            ? "fixed md:static top-0 left-0 md:w-64 rounded-r-lg md:rounded-r-none"
            : "hidden md:flex md:w-10"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Logo />
        </div>

        <nav
          className={cn(
            "mt-8 flex-grow flex flex-col gap-10 sm:gap-6",
            fullView ? "" : "gap-10"
          )}
        >
          {ROUTES[role].map((route) => (
            <NavLink key={route.href} {...route} isMinimized={!fullView} />
          ))}
        </nav>

        <div
          className={cn(
            "flex justify-between flex-col gap-4",
            fullView ? "sm:flex-row" : "flex-col-reverse"
          )}
        >
          {/* {fullView && <ThemeModeToggle />} */}
          <ToggleNavMenuButton />
        </div>
      </div>

      {fullView && (
        <div
          className=" fixed top-0 right-0 w-full h-full z-[18] block md:hidden  backgrop-bg-filter"
          onClick={() => toggleMenu()}
        ></div>
      )}
    </div>
  );
};

const NavLink = ({
  href,
  icon: Icon,
  label,
  exact,
  isMinimized,
}: // isMinimized,
{
  href: string;
  icon: LucideIcon;
  label: string;
  exact?: boolean;
  isMinimized: boolean;
}) => {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return exact ? pathname === href : pathname.startsWith(href);
  }, [pathname, href, exact]);

  return (
    <Link
      href={href}
      // onClick={() => setIsActive(true)}
      className={cn(
        " p-2 hover:bg-primary hover:px-4 transition-all hover:text-dark-ash-900 rounded-md",
        isActive
          ? " bg-primary text-dark-ash-900"
          : "dark:text-white text-dark-ash-900",
        " "
      )}
    >
      <div className={cn("flex items-center gap-3")}>
        <Icon className={cn("w-6 h-6 ")} />
        {!isMinimized && <p className="flex-1">{label}</p>}
      </div>
    </Link>
  );
};
