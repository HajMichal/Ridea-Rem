import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { PiTrashBold } from "react-icons/pi";
import { ContextMenu } from "../ContextMenu";
import { useClickOutside } from "@mantine/hooks";

interface EachFileCardType {
  fileName: string;
  userRole: number | undefined;
}

export const EachFileCard = ({
  fileName,
  userRole,
}: EachFileCardType): React.ReactNode => {
  const utils = api.useUtils();
  const router = useRouter();

  const outsideClickRef = useClickOutside(() =>
    setContextMenu({ ...contextMenu, toggled: false })
  );
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  const { mutate: downloadFile } =
    api.downloadDocumentRouter.downloadFile.useMutation({
      onSuccess: async (data) => {
        await router.push(data);
        toast.success("Ropoczęto pobieranie pliku");
      },
    });
  const { mutate: removeFile } =
    api.deleteDocumentRouter.deleteFile.useMutation({
      onSuccess: async () => {
        await utils.getAllDocumentRouter.getAllFiles.invalidate();
        toast.success("Plik został usunięty");
        setContextMenu({
          ...contextMenu,
          toggled: false,
        });
      },
    });

  const handleRightClick = (e: React.MouseEvent) => {
    if (userRole !== 1) return;

    e.preventDefault();
    setContextMenu({
      toggled: !contextMenu.toggled,
      position: { x: e.clientX, y: e.clientY },
    });
  };
  return (
    <>
      <div
        onClick={() => downloadFile(fileName)}
        onContextMenu={(e) => handleRightClick(e)}
        className="flex h-52 w-52 flex-col items-center justify-between rounded-3xl border-2 border-dark p-5 text-dark duration-150 hover:scale-110 hover:cursor-pointer"
      >
        <FiDownload className="h-12 w-12" />
        <p className="max-h-34 overflow-hidden text-center">
          {fileName.split("/").slice(1).join("/")}
        </p>
      </div>

      <ContextMenu
        outsideClickRef={outsideClickRef}
        isToggled={contextMenu.toggled}
        positionX={contextMenu.position.x}
        positionY={contextMenu.position.y}
        buttons={[
          {
            text: "Pobierz plik",
            icon: <FiDownload className="h-6 w-6 text-dark" />,
            onClick: () => downloadFile(fileName),
          },
          {
            text: "Usuń plik",
            icon: <PiTrashBold className="h-6 w-6 text-red" />,
            onClick: () => removeFile(fileName),
            color: "hover:bg-rose-200",
          },
        ]}
      />
    </>
  );
};
