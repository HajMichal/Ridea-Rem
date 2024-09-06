import { useDisclosure } from "@mantine/hooks";
import { PiTrashBold } from "react-icons/pi";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { api } from "~/utils/api";

interface RemoveElementProps {
  element: string;
  name: string;
}
export const RemoveElement = ({ element, name }: RemoveElementProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const ctx = api.useContext();

  const { mutate: removeElement } = api.dataFlow.removeElement.useMutation({
    onSuccess: async () => {
      await ctx.dataFlow.getAllPvCalcs.invalidate();
    },
  });
  const handleRemoveElement = () => {
    removeElement({ element, name });
    close();
  };

  return (
    <div className="mb-1">
      <PiTrashBold
        onClick={open}
        className="-ml-6 h-6 w-6 duration-100 hover:scale-105 hover:cursor-pointer"
      />
      <ConfirmationModal
        close={close}
        description="Będzie to skutkowało zmianami w bazie danych, przez co tego elementu nie będzie można już użyć."
        handleFunction={handleRemoveElement}
        opened={opened}
        title={`Czy na pewno chcesz usunąć: ${name} ?`}
      />
    </div>
  );
};
