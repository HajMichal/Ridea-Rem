import React, { useState } from "react";
import { Navbar, SideBar } from "~/components";
import {
  TextInput,
  Textarea,
  Modal,
  Button,
  Tooltip,
  FileInput,
  Input,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PiPlusBold } from "react-icons/pi";
import { MdOutlineAttachFile } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

interface postData {
  title: string;
  description: string;
}

const Aktualnosci = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: sessionData } = useSession();
  const [file, setFile] = useState<null | File>(null);

  const { mutate } = api.newsDataRouter.createPredesignedUrl.useMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<postData> = (data) => {
    console.log({ ...data, file });
    const formData = new FormData();
    // formData.append("image", file);
    console.log(formData);

    if (file) {
      mutate({ title: data.title, description: data.description });
    }
  };

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="p-8 text-5xl text-dark">
          {sessionData?.user.role === 1 && (
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center p-10"
            >
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
                <FileInput
                  rightSection={<MdOutlineAttachFile />}
                  label="Dołącz plik"
                  onChange={(e) => e && setFile(e)}
                  // rightSectionPointerEvents="none"
                  className="w-[50%]"
                  mt="md"
                />
                <button className="font-orkneyBoldg font-orkneyBold- w-[33%] rounded-lg bg-brand p-2 px-5 text-lg text-dark duration-100 hover:scale-105 hover:bg-brand hover:opacity-70">
                  Dodaj
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default Aktualnosci;
