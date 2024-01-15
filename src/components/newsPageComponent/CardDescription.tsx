import React from "react";
import { Modal, Text, Image } from "@mantine/core";
import { urlify } from "./FindUrl";
import { useDisclosure } from "@mantine/hooks";

interface CardDescriptionType {
  title: string;
  description: string;
  img: string;
}
const CardDescription = ({ description, title, img }: CardDescriptionType) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Text size="sm" c="dimmed" className="h-40 overflow-hidden">
        {urlify(description)}
      </Text>

      <div className="flex w-full justify-end">
        <button onClick={() => open()} className="font-orkneyBold text-xs">
          CZYTAJ DALEJ
        </button>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title={title}
        size="50%"
        className="font-orkneyBold"
      >
        <Image src={img} height={260} alt="image" />
        <Text className="mt-5" c={"dimmed"}>
          {urlify(description)}
        </Text>
      </Modal>
    </>
  );
};

export default CardDescription;
