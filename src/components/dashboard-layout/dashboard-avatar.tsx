"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/input/dropdown-menu";
import { Button } from "../button";
import axios from "axios";
import signOutClient from "@/utils/auth/sign-out-client";

export default function DashboardAvatar() {
  const router = useRouter();

  const doSignOut = async () => {
    try {
      // ALERT: Internal API call!
      await axios.delete(`${origin}/api/auth/delete-cookie`);
      signOutClient();
      return router.push("/auth/sign-in");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="unstyled"
            size="icon"
            className="relative p-0 rounded-full"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-primary">
              <span>You</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" forceMount>
          <DropdownMenuItem onClick={() => doSignOut()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
