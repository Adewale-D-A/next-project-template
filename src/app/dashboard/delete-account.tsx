"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Trash } from "lucide-react";
import useAxiosJson from "@/config/services/axios-json-context";
import { useAppDispatch } from "@/hooks/store-hooks";
import { openInfobar } from "@/stores/features/app-native-features/info-modal";
import DeleteConfirmation from "@/components/infoModal/delete-confirmation";
import axios from "axios";
import signOutClient from "@/utils/auth/sign-out-client";

export default function DeleteMyAccount() {
  const axios = useAxiosJson({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setIsDeleting(true);
      // const response = await axios.post("/auth/login", {
      //   current_password,
      //   new_password: "password",
      // });
      // ALERT: Internal API call!
      await axios.delete(`${origin}/api/auth/delete-cookie`);
      signOutClient();
      dispatch(
        openInfobar({
          message: "Account was successfully deleted.",
          isError: false,
        })
      );
      setOpenDeleteConfirmation(false);
      return router.push("/auth/sign-in");
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10 mt-10 border-b border-gray-300 pb-10">
        <section>
          <h1 className="text-3xl font-semibold">Delete Account!</h1>
          <p className="text-sm mt-1 dark:text-gray-400">
            Deleting you account will remove all saved data from iSportX.
          </p>
        </section>
        <Button
          type="button"
          variant={"urgent"}
          className=" flex items-center gap-2"
          onClick={() => setOpenDeleteConfirmation(true)}
        >
          Delete My Account <Trash />
        </Button>
      </div>

      <DeleteConfirmation
        confirmationHandler={handleSubmit}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        description="Are you sure you want to delete your account?"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
