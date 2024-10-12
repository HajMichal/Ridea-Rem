import { Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MENAGER, SALESMAN, PARTNER, OWNER } from "~/constans/roles";
import { CardBody, CardHeader } from ".";
import type { UserProvisionType } from "./types";

interface UserCard {
  user: UserProvisionType;
}

export const UserCard = ({ user }: UserCard) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <CardHeader user={user} opened={opened} toggle={toggle} />
      <Collapse
        in={opened}
        transitionDuration={200}
        transitionTimingFunction="linear"
      >
        <CardBody user={user} />
      </Collapse>
    </>
  );
};

export const roleNameMapping: Record<number, string> = {
  2: MENAGER,
  3: SALESMAN,
  5: PARTNER,
  6: OWNER,
};
