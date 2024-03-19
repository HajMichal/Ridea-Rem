import { Modal } from "@mantine/core";
import React from "react";

interface ConfirmationModalType {
  title: string;
  description: string;
  opened: boolean;
  close: () => void;
  handleFunction: () => void;
}
export const ConfirmationModal = ({
  title,
  description,
  opened,
  close,
  handleFunction,
}: ConfirmationModalType) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={title}
      className="text-center font-orkneyBold"
      centered
    >
      <p className="font-orkney">{description}</p>
      <div className="flex w-full justify-between p-4">
        <button
          onClick={close}
          className="rounded-2xl bg-red p-2 px-4 font-orkneyBold duration-100 hover:scale-110"
        >
          ANULUJ
        </button>
        <button
          onClick={() => handleFunction()}
          className="rounded-2xl bg-green-500 p-2 px-4 font-orkneyBold duration-100 hover:scale-110"
        >
          TAK
        </button>
      </div>
    </Modal>
  );
};
