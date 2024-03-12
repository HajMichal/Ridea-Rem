import React, { useState } from "react";
import { FileInput } from "@mantine/core";
import { MdOutlineAttachFile } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

export const encodeFile = (
  file: File | undefined | null
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const base64String = base64.split(",")[1];
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    } else reject();
  });
};

export const FileUploader = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();

  const { mutate } = api.uploadDocumentRouter.uploadFile.useMutation({
    onSuccess: () => {
      toast.success(`Plik ${file?.name} został poprawnie dodany`);
      setFile(null);
    },
  });

  const handleUpload = async () => {
    try {
      const base64String = await encodeFile(file);
      if (base64String) mutate({ base64: base64String, fileName: file!.name });
    } catch (error) {
      toast.error("Wrzucenie pliku nie powiodło się...");
    }
  };

  return (
    <div className="fixed z-[99999] my-5 -ml-14 flex w-full flex-col items-center">
      {/* TOP BAR OPEN/CLOSE */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex h-12 w-[50%] items-center justify-end rounded-t-3xl bg-white px-5 ${
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
        className={`flex w-[50%] flex-wrap justify-center gap-5 rounded-b-3xl bg-white px-10 pb-10 shadow-xl ${
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
        <button
          type="submit"
          onClick={handleUpload}
          className="h-10 w-60 rounded-xl bg-brand font-orkneyBold text-dark"
        >
          DODAJ PLIK
        </button>
      </div>
    </div>
  );
};
