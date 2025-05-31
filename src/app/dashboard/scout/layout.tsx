import DashboardLayout from "@/components/dashboard-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your scouting dashboard.",
};
export default function ScoutDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="scout">
      <div className="w-full p-5">{children}</div>
    </DashboardLayout>
  );
}
