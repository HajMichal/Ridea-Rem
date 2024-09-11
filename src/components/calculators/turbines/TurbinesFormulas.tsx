import { ScrollArea } from "@mantine/core";
import {
  Turbines,
  Phases,
  ThreePhasesInverter,
  MastFoundation,
  Matebox,
  EnergyMenagerCounter,
  HybridInverter,
  MastType,
  BatteryController,
  BatteryCapacity,
} from "./formFields";

export function TurbinesFormulas() {
  return (
    <div id="FORM" className="h-full p-3 laptop:w-[55%] laptop:min-w-[500px] ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
      >
        TURBINY
      </h1>
      <ScrollArea h={"78%"}>
        <div className="laptop:mr-4">
          <h2 className="font-orkneyBold">CENA ENERGII</h2>
          <Turbines />
          <Phases />
          <ThreePhasesInverter />
          <HybridInverter />
          <MastFoundation />
          <MastType />
          <h2 className="font-orkneyBold">MAGAZYN ENERGII</h2>
          <BatteryController />
          <EnergyMenagerCounter />
          <BatteryCapacity />
          <Matebox />
        </div>
      </ScrollArea>
    </div>
  );
}
