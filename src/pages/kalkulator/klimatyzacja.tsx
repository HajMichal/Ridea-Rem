import { Overlay } from "@mantine/core";
import React from "react";
import { Loading, Navbar, SideBar } from "~/components";
import { Preview } from "~/components/calculators/airCondition";
import AirConditionFormulas from "~/components/calculators/airCondition/AirConditionFormulas";
import { AirConditionMutations } from "~/components/calculators/airCondition/AirConditionMutations";
import { api } from "~/utils/api";

function Klimatyzacja() {
  const { data: calcData } = api.airCondMenagerData.getSingle.useQuery();

  AirConditionMutations();
  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney font-normal laptop:justify-center">
      {!calcData && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap overflow-scroll p-4 laptop:overflow-hidden">
          <AirConditionFormulas />
          <Preview />
        </div>
      </div>
    </main>
  );
}
export default Klimatyzacja;
