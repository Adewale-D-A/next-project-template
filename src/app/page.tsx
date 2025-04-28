import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Home",
  description: "Football management at its best.",
};

export default function Home() {
  redirect("/auth/sign-in");
  // return (
  //   <main className="w-full flex flex-col w-fill h-screen justify-center items-center ">
  //     <h1 className=" text-4xl font-bold  text-primary">iSportX</h1>
  //     <Link href={"/auth/sign-in"}>Login</Link>
  //   </main>
  // );
}
