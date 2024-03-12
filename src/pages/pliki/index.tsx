import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SideBar } from "~/components/LazyLoading";
import { Navbar } from "~/components";
import { api } from "~/utils/api";
import { Button, FileInput } from "@mantine/core";
import { MdOutlineAttachFile } from "react-icons/md";

const Pliki = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

  const { mutate } = api.documentRouter.uploadFile.useMutation({
    onSuccess: () => {
      // window.location.reload();
    },
  });

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap overflow-scroll p-4 laptop:overflow-hidden">
          <FileInput
            required
            rightSection={<MdOutlineAttachFile />}
            label="Dołącz lub upuść tutaj plik"
            onChange={(e) => e && setFile(e)}
            value={file}
            className="w-[50%]"
            mt="md"
          />
          <Button type="submit" onClick={() => console.log(file)}>
            DODAJ PLIK
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Pliki;
