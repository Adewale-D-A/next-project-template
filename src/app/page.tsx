import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
  description: "Next Full App Template.",
};

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* <!-- Blurred background shapes --> */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>

      {/* <!-- Optional noise or pattern overlay --> */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* <!-- Content wrapper --> */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            AAD Next.JS App Template
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Discover more templates today.
          </p>
          <Link
            className="px-6 py-3 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition"
            href={"/auth/sign-in"}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
