import { cn } from "@/shared/_utils/cn";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center justify-between md:block rounded-full  overflow-hidden"
      )}
    >
      <Image
        src={"/logo.jpg"}
        width={200}
        height={200}
        alt="iSportX logo"
        className="md:w-[80px] w-[50px]"
      />
    </Link>
  );
};
