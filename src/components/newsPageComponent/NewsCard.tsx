import React from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Menu,
  rem,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { PiDotsThreeOutlineVerticalBold, PiTrashBold } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { api } from "~/utils/api";
import { useDisclosure } from "@mantine/hooks";

import { type SubmitHandler, useForm } from "react-hook-form";
import CardDescription from "./CardDescription";
import { urlify } from "./FindUrl";

interface NewsCardTypes {
  id: string;
  url: string;
  title: string;
  description: string;
  role?: number;
}

interface PostData {
  title: string;
  description: string;
  url: string;
}

export const NewsCard = ({
  id,
  url,
  title,
  description,
  role = 3,
}: NewsCardTypes) => {
  const [opened, { open, close }] = useDisclosure(false);
  const utils = api.useContext();

  const { mutate: removePost } = api.newsDataRouter.deletePost.useMutation({
    onSuccess: () => void utils.newsDataRouter.getLastPosts.invalidate(),
  });
  const { mutate: updatePost } = api.newsDataRouter.updatePost.useMutation({
    onSuccess: () => void utils.newsDataRouter.getLastPosts.invalidate(),
  });
  const { register, handleSubmit } = useForm<PostData>({
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const onSubmit: SubmitHandler<PostData> = (data) => {
    updatePost({
      id: id,
      description: data.description,
      title: data.title,
    });
    close();
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="w-1/3 max-w-[500px]"
      key={id}
    >
      <Card.Section>
        <Image src={url} height={160} alt="image" />
      </Card.Section>

      <Group mt="md" mb="xs" className="flex w-full justify-between">
        <Text fw={500} className="max-w-[85%]">
          {urlify(title)}
        </Text>
        {role === 1 && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <div className="rounded-full bg-brand p-1 shadow-xl duration-150 hover:cursor-pointer hover:opacity-50">
                <PiDotsThreeOutlineVerticalBold />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label className="font-orkneyBold">Działania</Menu.Label>

              <Menu.Item onClick={() => open()}>
                <div className="flex justify-between">
                  <p className="font-orkney">Edytuj</p>
                  <AiOutlineEdit style={{ width: rem(20), height: rem(20) }} />
                </div>
              </Menu.Item>

              <Menu.Item color="red" onClick={() => removePost(id)}>
                <div className="flex justify-between">
                  <p className="font-orkney">Usuń</p>
                  <PiTrashBold style={{ width: rem(20), height: rem(20) }} />
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>

      <CardDescription description={description} title={title} url={url} />

      <Modal
        opened={opened}
        onClose={close}
        title="Edytujesz posta"
        size="50%"
        className="font-orkneyBold"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center p-10"
        >
          <TextInput
            {...register("title")}
            label="Tytuł"
            type="text"
            className="w-[90%]"
          />
          <Textarea
            {...register("description")}
            label="Opis"
            className="w-[90%]"
          />
          <div className="flex w-full items-end justify-center gap-10">
            <button className="font-orkneyBoldg font-orkneyBold- w-[33%] rounded-lg bg-brand p-2 px-5 text-lg text-dark duration-100 hover:scale-105 hover:bg-brand hover:opacity-70">
              Dodaj
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
};
