import AddEditPlayerForm from "./add-edit-form";
import ModalTemplate from "@/components/dialog";

export default function AddEditPlayerModal({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  id?: string;
}) {
  return (
    <ModalTemplate
      open={open}
      onClose={setOpen}
      title={id ? "EDIT PLAYER" : "ADD PLAYER"}
      className=" max-w-4xl"
    >
      <AddEditPlayerForm setOpen={setOpen} id={id} />
    </ModalTemplate>
  );
}
