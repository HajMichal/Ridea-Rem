import React, { useCallback, useEffect, useState } from "react";
import { Loading, Navbar, SideBar } from "~/components";
import {
  TextInput,
  Textarea,
  Modal,
  Button,
  Tooltip,
  FileInput,
  Card,
  Image,
  Text,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PiPlusBold } from "react-icons/pi";
import { MdOutlineAttachFile } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useUploadThing } from "~/utils/uploadthing";
import { FileWithPath } from "@uploadthing/react";
interface PostData {
  title: string;
  description: string;
  url: string;
}

const Aktualnosci = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: sessionData } = useSession();
  const [file, setFile] = useState<File[]>([]);
  const [url, setUrl] = useState<string>();
  const { register, handleSubmit, watch } = useForm<PostData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate } = api.newsDataRouter.createNewPost.useMutation();
  const { data } = api.newsDataRouter.getLastPosts.useQuery();
  console.log(data);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
  }, []);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (data) => {
      setUrl(data[0]?.url);
      toast.success("Poprawnie zapisano obraz");
    },
    onUploadError: () => {
      toast.error("Zły obraz, spróbuj ponownie później lub wybierz inny obraz");
    },
  });

  const onSubmit: SubmitHandler<PostData> = async () => {
    if (file) {
      await startUpload(file);
    }
  };

  useEffect(() => {
    if (!isUploading && url) {
      mutate({
        title: watch("title"),
        description: watch("description"),
        url: url,
      });
      close();
    }
  }, [isUploading, url]);

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <Toaster />
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
            {isUploading ? (
              <Loading />
            ) : (
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
                    required
                    rightSection={<MdOutlineAttachFile />}
                    label="Dołącz plik"
                    onChange={(e) => e && setFile([e])}
                    // rightSectionPointerEvents="none"
                    className="w-[50%]"
                    mt="md"
                  />

                  <button className="font-orkneyBoldg font-orkneyBold- w-[33%] rounded-lg bg-brand p-2 px-5 text-lg text-dark duration-100 hover:scale-105 hover:bg-brand hover:opacity-70">
                    Dodaj
                  </button>
                </div>
              </form>
            )}
          </Modal>
        </div>
        <div className="flex flex-1 flex-wrap justify-center gap-5 p-10">
          {/* {imagesWithData?.map((imageWithData) => {
            return (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="max-w-md"
              >
                <Card.Section>
                  <Image src={imageWithData.url} height={160} alt="image" />
                </Card.Section>

                <Group mt="md" mb="xs">
                  <Text fw={500}>{imageWithData.title}</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  {imageWithData.description}
                </Text>
              </Card>
            );
          })} */}
        </div>
      </div>
    </main>
  );
};

export default Aktualnosci;
