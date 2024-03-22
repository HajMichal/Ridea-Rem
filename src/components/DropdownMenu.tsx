import React from "react";
import { Menu } from "@mantine/core";
import { type IconType } from "react-icons";
import { useRouter } from "next/router";

interface jsxType {
  props: {
    href: string;
    title: string;
    userRole?: number;
    neededRole?: number;
  };
}
interface MenuType {
  mainButtonTitle: string | React.ReactElement<IconType>;
  contextData?: {
    href: string;
    title: string;
    color: string;
  }[];
  jsxData?: JSX.Element[];
  hide?: boolean;
}

export const DropdownMenu = ({
  mainButtonTitle,
  contextData,
  jsxData,
  hide = false,
}: MenuType) => {
  const router = useRouter();
  const handleClickItem = async (href: string) => {
    await router.push(href);
  };

  return (
    <Menu trigger="hover" openDelay={100} closeDelay={100}>
      <Menu.Target>
        <div className={`group mb-1 ${hide && "xl:hidden"}`}>
          <div className="flex h-[60%] items-center text-dark laptop:px-4">
            <button className="font-orkneyLight text-dark">
              {mainButtonTitle}
            </button>
          </div>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {contextData?.map(({ href, title, color }, index) => (
          <Menu.Item
            key={index}
            onClick={() => handleClickItem(href)}
            className={`flex flex-row px-8 py-3 font-orkneyLight tracking-widest duration-150 ${color}`}
          >
            <div className="h-full w-full">{title}</div>
          </Menu.Item>
        ))}
        {jsxData
          ?.filter(
            (data: jsxType) => data.props?.neededRole === data.props?.userRole
          )
          .map((element, index) => (
            <Menu.Item
              key={index}
              className="flex flex-row px-8 py-3 font-orkneyLight tracking-widest duration-150"
            >
              {element}
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};
