import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { type User } from "@prisma/client";
import { Loading, Navbar, SideBar, UserFeeFormField } from "~/components";
import { Collapse, Tabs } from "@mantine/core";
import { MENAGER, OWNER, PARTNER, SALESMAN } from "~/constans/roles";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";

export type MenagerType = User & {
  workers: User[];
};

interface MenagerSectionType {
  userId: string;
}
const DisplayUserSection = ({ userId }: MenagerSectionType) => {
  const { data } = api.userDataHandling.getUsers.useQuery({ userId });
  if (!data) return;
  return (
    <div className="w-[95%] xl:w-[90%] xxl:w-[80%]">
      {data.map((menager, index) => {
        return <UserCard menager={menager} key={index} />;
      })}
    </div>
  );
};

interface UserCard {
  menager: {
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
  };
}
const UserCard = ({ menager }: UserCard) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <div
        className="my-2 flex w-full justify-between rounded-full bg-[#d6d6d6] p-2 px-6 xl:px-10"
        onClick={toggle}
      >
        <h2 className="font-orkneyBold xl:text-xl">
          {roleNameMapping[menager.role]}
        </h2>
        <h3 className="xl:text-xl">{menager.name}</h3>
        <div className="flex gap-5 xl:gap-10">
          <h4 className="xl:text-xl">{menager.city || "NIE PODANO"}</h4>
          <button>
            <RiArrowLeftSLine
              size={"28px"}
              className={`${opened && "-rotate-90"}`}
            />
          </button>
        </div>
      </div>
      <Collapse in={opened} transitionDuration={500}>
        <div className="h-40">YOOO</div>
      </Collapse>
    </>
  );
};

const Prowizje = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (
      (status === "authenticated" && sessionData?.user.role === 3) ||
      status === "unauthenticated"
    ) {
      void router.back();
    }
  }, [sessionData, router]);

  if (!sessionData?.user.id) {
    return <Loading />;
  }

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <SideBar />
      <div className="flex h-screen max-h-screen w-full flex-wrap">
        <Navbar />
        <div className="flex h-full max-h-[88%] w-full flex-wrap justify-center overflow-y-scroll">
          <DisplayUserSection userId={sessionData.user.id} />
        </div>
      </div>
    </div>
  );
};

export default Prowizje;

const roleNameMapping: Record<number, string> = {
  2: MENAGER,
  3: SALESMAN,
  5: PARTNER,
  6: OWNER,
};
