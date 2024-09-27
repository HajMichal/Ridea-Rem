import React from "react";
import { Modal, Text, Image, ScrollArea } from "@mantine/core";
import { urlify } from "./FindUrl";
import { useDisclosure } from "@mantine/hooks";

interface CardDescriptionType {
  title: string;
  description: string;
  url: string;
}

const CardDescription = ({ description, title, url }: CardDescriptionType) => {
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
        <Image src={url} height={260} alt="image" />
        <ScrollArea h={"78%"}>
          <Text className="my-5 mr-5 max-h-96 px-3" c={"dimmed"}>
            {urlify(description)}
          </Text>
        </ScrollArea>
      </Modal>
    </>
  );
};

export default CardDescription;
