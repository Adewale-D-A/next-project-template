import ThemeModeToggle from "@/components/button/theme-mode-toggle";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col lg:relative overflow-y-auto bg-[url('/images/auth_bg.jpg')] bg-center bg-no-repeat bg-blend-darken bg-black/70 bg-cover transition-all">
      <div className="flex flex-col items-center gap-2 lg:absolute lg:top-8 text-center w-full uppercase font-bold opacity-75 text-gray-200 text-shadow text-xl">
        <Link href={"/"}>AAD</Link>
        <ThemeModeToggle />
      </div>
      {children}
    </main>
  );
}
