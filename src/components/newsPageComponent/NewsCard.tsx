import React from "react";
import { Card, Image, Text, Group, Menu, rem } from "@mantine/core";
import { PiDotsThreeOutlineVerticalBold, PiTrashBold } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";

interface NewsCardTypes {
  id: string;
  url: string;
  title: string;
  description: string;
  role?: number;
}
export const NewsCard = ({
  id,
  url,
  title,
  description,
  role = 3,
}: NewsCardTypes) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="w-[300px]"
      key={id}
    >
      <Card.Section>
        <Image src={url} height={160} alt="image" />
      </Card.Section>

      <Group mt="md" mb="xs" className="flex w-full justify-between">
        <Text fw={500}>{title}</Text>
        {role === 1 && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <div className="rounded-full bg-brand p-1 shadow-xl duration-150 hover:cursor-pointer hover:opacity-50">
                <PiDotsThreeOutlineVerticalBold />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label className="font-orkneyBold">Działania</Menu.Label>
              <Menu.Item>
                <div className="flex justify-between">
                  <p className="font-orkney">Edytuj</p>
                  <AiOutlineEdit style={{ width: rem(20), height: rem(20) }} />
                </div>
              </Menu.Item>
              <Menu.Item color="red">
                <div className="flex justify-between">
                  <p className="font-orkney">Usuń</p>
                  <PiTrashBold style={{ width: rem(20), height: rem(20) }} />
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </Card>
  );
};
