import React from "react";
import { Badge, Group, Text } from "@mantine/core";

interface TextComponent {
  title: string;
  calculations: number | boolean | undefined;
  color?: string;
  unit?: string;
}

export const TextComponent = ({
  title,
  calculations,
  color = "dark",
  unit = "",
}: TextComponent) => {
  return (
    <>
      {calculations ? (
        <Group
          position="left"
          mt="md"
          mb="xs"
          className="grid grid-cols-8 justify-between"
        >
          <Text className="col-start-1 col-end-7">{title}</Text>
          <Badge
            color={color}
            variant="light"
            size="lg"
            className="col-start-7 col-end-9"
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
