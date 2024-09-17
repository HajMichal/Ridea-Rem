import { ScrollArea } from "@mantine/core";
import {
  Turbines,
  Phases,
  MastFoundation,
  Matebox,
  EnergyMenagerCounter,
  Inverters,
  MastType,
  BatteryController,
  BatteryCapacity,
  Installments,
  ChooseEnergyStore,
} from "./formFields";

export function TurbinesFormulas() {
  return (
    <div id="FORM" className="h-full p-3 laptop:w-[55%] laptop:min-w-[500px] ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
      >
        TURBINY WIATROWE
      </h1>
      <ScrollArea h={"78%"}>
        <div className="laptop:mr-4">
          <h2 className="font-orkneyBold">TURBINY</h2>
          <Turbines />
          <Phases />
          <Inverters />
          <MastFoundation />
          <MastType />
          <h2 className="mt-8 font-orkneyBold">MAGAZYN ENERGII</h2>
          <ChooseEnergyStore />
          <BatteryController />
          <EnergyMenagerCounter />
          <BatteryCapacity />
          <Matebox />
          <Installments />
        </div>
      </ScrollArea>
    </div>
  );
}
