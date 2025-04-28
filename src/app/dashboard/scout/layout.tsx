import DashboardLayout from "@/components/dashboard-layout";

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
