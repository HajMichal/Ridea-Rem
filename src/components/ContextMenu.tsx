import { Menu } from "@mantine/core";
import React from "react";
import { type IconType } from "react-icons";

interface ContextMenuType {
  buttons: {
    text: string;
    icon: React.ReactElement<IconType>;
    onClick: () => void;
    color?: string;
  }[];
  positionX: number;
  positionY: number;
  isToggled: boolean;
}

export const ContextMenu = ({
  buttons,
  positionX,
  positionY,
  isToggled,
}: ContextMenuType) => {
  console.log(positionX, positionY);

  return (
    <menu
      style={{
        // position: "absolute",
        top: positionY + 2 + "px",
        left: positionX + 2 + "px",
      }}
      className={`fixed h-10 w-10 bg-brand ${!isToggled && "hidden"}`}
    >
      {buttons.map((buttonProps, index) => {
        function handleClick(e: React.MouseEvent) {
          e.stopPropagation();
          buttonProps.onClick;
        }

        return (
          <button onClick={(e) => handleClick(e)} key={index}>
            {buttonProps.text}
          </button>
        );
      })}
    </menu>
  );
};
