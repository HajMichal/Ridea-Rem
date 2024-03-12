import React from "react";
import { FiDownload } from "react-icons/fi";

interface EachFileCardType {
  fileName: string;
}
export const EachFileCard = ({
  fileName,
}: EachFileCardType): React.ReactNode => {
  return (
    <div className="flex h-52 w-52 flex-col items-center justify-between rounded-3xl border-2 border-dark p-5 text-dark duration-150 hover:scale-110 hover:cursor-pointer">
      <FiDownload className="h-12 w-12" />
      <p className="max-h-34 overflow-hidden text-center">{fileName}</p>
    </div>
  );
};
