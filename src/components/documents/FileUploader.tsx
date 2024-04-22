import React, { useEffect, useState } from "react";
import { FileInput, Radio } from "@mantine/core";
import { MdOutlineAttachFile, MdOutlineExpandMore } from "react-icons/md";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import { encodeFile } from "~/utils/encodeFile";

export default function FileUploader() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [fileFolder, setFileFolder] = useState("documents");
  const ctx = api.useContext();

  const { mutate } = api.uploadDocumentRouter.uploadFile.useMutation({
    onSuccess: () => {
      toast.success(`Plik ${file?.name} został poprawnie dodany`);
      setFile(null);
    },
    onError: (error) => {
      toast.error("Plik nie został dodany. Treść błędu: " + error.message);
    },
  });

  const handleUpload = async () => {
    const base64String = await encodeFile(file);
    if (base64String)
      mutate({ base64: base64String, fileName: file!.name, fileFolder });
    setIsExpanded(false);
  };

  useEffect(() => {
    void ctx.getAllDocumentRouter.getAllFiles.invalidate();
  }, []);

  return (
    <div className="fixed z-[10] my-5 -ml-14 flex w-full flex-col items-center">
      {/* TOP BAR OPEN/CLOSE */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex h-12 w-[50%] items-center justify-end rounded-t-3xl bg-white px-5 hover:cursor-pointer ${
          !isExpanded && "justify-between rounded-3xl"
        }`}
      >
        {!isExpanded && (
          <p className="font-orkneyBold text-sm">Rozwiń w celu dodania pliku</p>
        )}
        <MdOutlineExpandMore
          className={`h-7 w-7 duration-200 ${!isExpanded && "rotate-90"}`}
        />
      </div>

      {/* BOTTOM BAR SHOW/HIDE */}
      <div
        className={`flex w-[50%] flex-wrap items-center justify-center gap-5 rounded-b-3xl bg-white px-10 pb-10 shadow-xl ${
          !isExpanded && "hidden"
        }`}
      >
        <FileInput
          required
          rightSection={<MdOutlineAttachFile />}
          label="Dołącz plik tutaj"
          onChange={(e) => e && setFile(e)}
          value={file}
          className={"w-full font-orkneyBold "}
          mt="md"
        />
        <div className="flex w-full items-center justify-center gap-10">
          <div className="flex gap-1">
            <Radio
              label="DOKUMENTY"
              labelPosition="left"
              type="radio"
              defaultChecked
              name="documentType"
              value={"documents"}
              onChange={(e) => setFileFolder(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <Radio
              label="SPECYFIKACJE"
              type="radio"
              name="documentType"
              value={"specification"}
              onChange={(e) => setFileFolder(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleUpload}
          className="h-10 w-60 rounded-xl bg-brand font-orkneyBold text-dark"
        >
          DODAJ PLIK
        </button>
      </div>
      <Toaster />
    </div>
  );
}
