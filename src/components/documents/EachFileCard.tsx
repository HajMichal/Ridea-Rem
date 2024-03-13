import React, { useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { PiTrashBold } from "react-icons/pi";
import { Menu } from "@mantine/core";
import { ContextMenu } from "../ContextMenu";

interface EachFileCardType {
  fileName: string;
  userRole: number | undefined;
}

export const EachFileCard = ({
  fileName,
  userRole,
}: EachFileCardType): React.ReactNode => {
  const router = useRouter();

  const contextMenuRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  const { mutate } = api.downloadDocumentRouter.downloadFile.useMutation({
    onSuccess: async (data) => {
      await router.push(data);
      toast.success("Ropoczęto pobieranie pliku");
    },
  });

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setContextMenu({
      toggled: !contextMenu.toggled,
      position: { x: e.clientX, y: e.clientY },
    });
    console.log(fileName);
  };
  return (
    <div
      onClick={() => mutate(fileName)}
      onContextMenu={(e) => handleRightClick(e)}
      className="flex h-52 w-52 flex-col items-center justify-between rounded-3xl border-2 border-dark p-5 text-dark duration-150 hover:scale-110 hover:cursor-pointer"
    >
      <FiDownload className="h-12 w-12" />

      {/* {userRole === 1 && <PiTrashBold className="h-7 w-7 text-red" />} */}
      <p className="max-h-34 overflow-hidden text-center">
        {fileName.slice(10)}
      </p>
      <ContextMenu
        isToggled={contextMenu.toggled}
        positionX={contextMenu.position.x}
        positionY={contextMenu.position.y}
        buttons={[
          {
            text: "Usuń przycisk",
            icon: <PiTrashBold className="h-7 w-7 text-red" />,
            onClick: () => console.log("Click"),
          },
        ]}
      />
    </div>
  );
};
