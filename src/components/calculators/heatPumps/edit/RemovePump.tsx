import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { PiTrashBold } from "react-icons/pi";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { api } from "~/utils/api";

export const RemovePump = ({ pumpName }: { pumpName: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const ctx = api.useContext();

  const { mutate: removePump } =
    api.heatPumpDataFlowRouter.removeHeatPump.useMutation({
      onSuccess: async () => {
        await ctx.heatPumpDataFlowRouter.downloadEntireJsonFile.invalidate();
      },
    });

  const handleRemovePump = () => {
    removePump(pumpName);
    close();
  };

  return (
    <>
      <PiTrashBold
        onClick={open}
        className="-ml-6 h-6 w-6 duration-100 hover:scale-105 hover:cursor-pointer"
      />
      <ConfirmationModal
        close={close}
        description="Będzie to skutkowało zmianami w bazie danych, przez co tej pompy nie
          będzie można użyc podczas tworzenia wyceny."
        handleFunction={handleRemovePump}
        opened={opened}
        title={`CZY NA PEWNO USUNĄĆ ${pumpName} ?`}
      />
    </>
  );
};
