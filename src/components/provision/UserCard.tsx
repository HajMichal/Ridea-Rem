import { Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type User } from "@prisma/client";
import { MENAGER, SALESMAN, PARTNER, OWNER } from "~/constans/roles";
import { CardBody, CardHeader } from ".";

export interface MenagerType {
  role: number;
  name: string | null;
  id: string;
  city: string;
  feePerkwForCompany: number;
  feePerkwHeatHome: number;
  feePerkwHeatPump: number;
  feePerkwPhotovoltaic: number;
  feePerkwTurbines: number;
  imposedFeeAirCondition: number;
  imposedFeeForCompany: number;
  imposedFeeHeatHome: number;
  imposedFeeHeatPump: number;
  imposedFeePhotovoltaic: number;
  imposedFeeTurbines: number;
  workers: User[];
}
interface UserCard {
  menager: MenagerType;
}

export const UserCard = ({ menager }: UserCard) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <CardHeader menager={menager} opened={opened} toggle={toggle} />
      <Collapse
        in={opened}
        transitionDuration={200}
        transitionTimingFunction="linear"
      >
        <CardBody menager={menager} />
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
