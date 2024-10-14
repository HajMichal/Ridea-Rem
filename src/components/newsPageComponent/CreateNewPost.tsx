import { Button, Modal, TextInput, Textarea, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Toaster } from "react-hot-toast";

import React from "react";
import { useForm } from "react-hook-form";
import { PiPlusBold } from "react-icons/pi";
import { api } from "~/utils/api";

interface PostData {
  title: string;
  description: string;
  url: string;
}
interface CreateNewPostType {
  role: number;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const CreateNewPost = ({ role = 3 }: CreateNewPostType) => {
  const [opened, { open, close }] = useDisclosure(false);
  const utils = api.useUtils();
  const { mutate } = api.newsDataRouter.createNewPost.useMutation({
    onSuccess: () => void utils.newsDataRouter.getLastPosts.invalidate(),
  });

  const { register, watch } = useForm<PostData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createPost = () => {
    mutate({
      title: watch("title"),
      description: watch("description"),
      url: randomUrls[getRandomInt(3)]!,
    });
    close();
  };

  return (
    <div className="p-8 text-5xl text-dark">
      {role === 1 && (
        <div className="flex w-full font-orkneyBold">
          <Tooltip
            label="UTWÓRZ POST"
            arrowOffset={16}
            arrowSize={7}
            withArrow
            position="top-start"
          >
            <Button onClick={open} className=" h-14 bg-green-500">
              <PiPlusBold className="h-5 w-5 scale-150 text-4xl font-extrabold" />
            </Button>
          </Tooltip>
        </div>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title="Tworzysz nowego posta"
        size="50%"
        className="font-orkneyBold"
      >
        <form className="flex flex-col items-center p-10">
          <TextInput
            {...register("title")}
            label="Tytuł"
            type="text"
            required
            className="w-[90%]"
          />
          <Textarea
            {...register("description")}
            label="Opis"
            required
            className="w-[90%]"
          />
          <div className="flex w-full items-end justify-center gap-10">
            <button
              onClick={createPost}
              className="font-orkneyBoldg font-orkneyBold- w-[33%] rounded-lg bg-brand p-2 px-5 text-lg text-dark duration-100 hover:scale-105 hover:bg-brand hover:opacity-70"
            >
              Dodaj
            </button>
          </div>
        </form>
      </Modal>
      <Toaster />
    </div>
  );
};

const randomUrls = [
  "https://www.explore.com/img/gallery/the-50-most-incredible-landscapes-in-the-whole-entire-world/intro-1672072042.jpg",
  "https://img.freepik.com/premium-photo/first-light-day-breaks-mountain-range-with-peaks-glowing-warm-hues-dawn_1271419-12211.jpg",
  "https://images.stockcake.com/public/8/5/4/854232d2-7674-4f06-9e51-094994b968d0_large/sunset-wind-turbine-stockcake.jpg",
];

export default CreateNewPost;
