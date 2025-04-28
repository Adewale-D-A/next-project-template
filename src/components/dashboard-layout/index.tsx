import { DashboardSideNav } from "@/components/dashboard-layout/dashboard-sidenav";
import DashboardAvatar from "@/components/dashboard-layout/dashboard-avatar";
import ThemeModeToggle from "../button/theme-mode-toggle";
import StoreProvider from "@/provider/store-provider";
import ToggleNavMenuButton from "./toggle-menu-button";

export default async function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "club" | "scout";
}) {
  return (
    <StoreProvider>
      <div className="flex h-screen">
        <DashboardSideNav role={role} />

        {/* Main Content */}
        <div className="flex-grow flex flex-col py-5 dark:bg-dark-ash-900 bg-white h-screen">
          {/* Top Navbar */}
          <header className="w-full bg-white shadow-sm sticky top-0 z-10 flex justify-between  items-center p-4  rounded-t-lg">
            <ToggleNavMenuButton />
            <ThemeModeToggle />
            <DashboardAvatar />
          </header>

          {/* Page Content */}
          <main className=" bg-white h-full rounded-b-lg overflow-y-auto w-full">
            <div className=" w-full flex justify-center">{children}</div>
          </main>
        </div>
      </div>
    </StoreProvider>
  );
}
