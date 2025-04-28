import DashboardLayout from "@/components/dashboard-layout";

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
