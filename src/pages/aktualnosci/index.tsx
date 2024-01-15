import React, { useCallback, useEffect, useState } from "react";
import { Loading, Navbar, NewsCard, SideBar } from "~/components";
import {
  TextInput,
  Textarea,
  Modal,
  Button,
  Tooltip,
  FileInput,
  Loader,
  ScrollArea,
} from "@mantine/core";
import toast, { Toaster } from "react-hot-toast";
import { useDisclosure } from "@mantine/hooks";
import { PiPlusBold } from "react-icons/pi";
import { MdOutlineAttachFile } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { useUploadThing } from "~/utils/uploadthing";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { FileWithPath } from "@uploadthing/react";
import { useRouter } from "next/router";

interface PostData {
  title: string;
  description: string;
  url: string;
}

const Aktualnosci = () => {
  const router = useRouter();
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

  const { mutate } = api.newsDataRouter.createNewPost.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });
  const { data: imagesData, isLoading } =
    api.newsDataRouter.getLastPosts.useQuery();

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (data) => {
        setUrl(data[0]?.url);
        toast.success("Poprawnie zapisano obraz");
      },
      onUploadError: () => {
        toast.error(
          "Zły obraz, spróbuj ponownie później lub wybierz inny obraz"
        );
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];
  const { getRootProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const onSubmit: SubmitHandler<PostData> = async () => {
    if (file) {
      await startUpload(file);
    }
  };

  useEffect(() => {
    // mutate();
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

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
        <ScrollArea h={"88%"}>
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
                <div className="flex h-[323.77px]  items-center justify-center overflow-hidden p-10">
                  <Loader color="yellow" size="xl" variant="dots" />
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col items-center p-10"
                  {...getRootProps()}
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
                      label="Dołącz lub upuść tutaj plik"
                      onChange={(e) => e && setFile([e])}
                      value={file[0]}
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

          <div className="flex flex-1 flex-wrap justify-start gap-5 p-10">
            {isLoading ? (
              <div className="flex w-full justify-center">
                <Loader color="yellow" size="xl" variant="dots" />
              </div>
            ) : (
              imagesData?.map((imgData) => {
                return (
                  <NewsCard
                    role={sessionData?.user.role}
                    description={imgData.description}
                    id={imgData.id}
                    title={imgData.title}
                    url={imgData.url}
                    key={imgData.id}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
};
export default Aktualnosci;
