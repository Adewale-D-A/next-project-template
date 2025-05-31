import DashboardLayout from "@/components/dashboard-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your club's dashboard.",
};
export default function ClubDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="club">
      <div className="w-full p-5">{children}</div>
    </DashboardLayout>
  );
}
