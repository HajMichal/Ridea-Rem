import React from "react";
import { Badge, Group, Text } from "@mantine/core";

interface TextComponent {
  title: string;
  calculations?: number | boolean | string | null;
  color?: string;
  unit?: string;
  size?: string;
}

export const TextComponent = ({
  title,
  calculations,
  color = "dark",
  unit = "",
  size = "lg",
}: TextComponent) => {
  return (
    <>
      {calculations ? (
        <Group
          position="left"
          mt="md"
          mb="xs"
          className="grid grid-cols-12 justify-between"
        >
          <Text
            className={`col-start-1 ${
              typeof calculations === "string" ? "col-end-8" : "col-end-9"
            }`}
          >
            {title}
          </Text>
          <Badge
            color={color}
            variant="light"
            size={size}
            className={`${
              typeof calculations === "string" ? "col-start-8" : "col-start-9"
            }  col-end-13 `}
          >
            {typeof calculations === "boolean" ? "TAK" : calculations} {unit}
          </Badge>
        </Group>
      ) : (
        ""
      )}
    </>
  );
};
