import React from "react";
import { Badge, Group, Text } from "@mantine/core";

interface TextComponent {
  title: string;
  calculations: number | undefined;
  color?: string;
}

export const TextComponent = ({
  title,
  calculations,
  color = "dark",
}: TextComponent) => {
  return (
    <>
      {calculations ? (
        <Group position="center" mt="md" mb="xs">
          <Text>{title}</Text>
          <Badge color={color} variant="light" size="lg">
            {calculations}
          </Badge>
        </Group>
      ) : (
        ""
      )}
    </>
  );
};
