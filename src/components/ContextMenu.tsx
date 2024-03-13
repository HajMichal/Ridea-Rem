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
  outsideClickRef: React.MutableRefObject<HTMLMenuElement>;
}

export const ContextMenu = ({
  outsideClickRef,
  buttons,
  positionX,
  positionY,
  isToggled,
}: ContextMenuType) => {
  return (
    <menu
      ref={outsideClickRef}
      style={{
        top: positionY + 2 + "px",
        left: positionX + 2 + "px",
      }}
      className={`fixed z-[9999] flex flex-col gap-2 rounded-3xl bg-white p-5 shadow-xl  ${
        !isToggled && "hidden"
      }`}
    >
      {buttons.map((buttonProps, index) => {
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              buttonProps.onClick();
            }}
            key={index}
            className={`flex h-10 w-full items-center justify-between gap-8 rounded-xl px-3 font-orkney duration-75 hover:cursor-pointer ${
              buttonProps.color ? buttonProps.color : "hover:bg-backgroundGray"
            }`}
          >
            {buttonProps.text}
            {buttonProps.icon}
          </button>
        );
      })}
    </menu>
  );
};
