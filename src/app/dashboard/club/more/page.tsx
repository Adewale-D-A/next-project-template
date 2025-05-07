"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/button";
import Search from "@/components/input/search";
import Sort from "@/components/input/sort";
import { useCallback, useState } from "react";
import PlayersTable from "@/components/tables/players";
import AddEditPlayerModal from "./add-edit-modal";

export default function PlayersManagement() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleOpenAdd = useCallback(() => {
    setId("");
    setOpen(true);
  }, []);

  return (
    <>
      <div className=" w-full border border-gray-200 rounded-3xl">
        <div className=" w-full flex justify-between flex-col lg:flex-row p-3 items-center gap-2">
          <div className="w-full max-w-xl flex flex-col lg:flex-row items-center gap-2">
            <div className=" w-full">
              <Search applyTheme={false} />
            </div>
            <div className=" w-fit">
              <Sort applyTheme={false} />
            </div>
          </div>
          <Button onClick={() => handleOpenAdd()} className=" w-fit px-5">
            <Plus /> Add
          </Button>
        </div>

        {/* table */}
        <PlayersTable />
      </div>
      <AddEditPlayerModal open={open} setOpen={setOpen} />
    </>
  );
}
