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
  EstimatedDotationSum,
  IsVat,
  ConstructionType,
  RoofCoverage,
  RoofPitch,
} from "./formFields";
import { type TurbineCalcData } from "~/server/api/routers/turbines/interfaces";

interface TurbinesFormulasType {
  turbinesData?: TurbineCalcData;
}
export function TurbinesFormulas({ turbinesData }: TurbinesFormulasType) {
  return (
    <div id="FORM" className="h-full p-3 laptop:w-[55%] laptop:min-w-[500px] ">
      <ScrollArea className="h-[78%] xl:h-[85%]">
        <h1
          style={{ textShadow: " 24px 24px #bebebe" }}
          className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
        >
          TURBINY WIATROWE
        </h1>
        <div className="laptop:mr-4">
          <h2 className="font-orkneyBold">TURBINY</h2>
          <Turbines turbines={turbinesData?.turbines} />
          <Inverters addons={turbinesData?.addons} />
          {/* <MastFoundation /> */}
          <MastType
            steelMasts={turbinesData?.addons.stalowy}
            strunobeton={turbinesData?.addons.strunobeton}
          />
          <h2 className="mt-8 font-orkneyBold">MAGAZYN ENERGII</h2>
          <ChooseEnergyStore />
          {/* <BatteryController controller={turbinesData?.energyStore["T30 controller"]} /> */}
          {/* <EnergyMenagerCounter energyStoreCounter={turbinesData?.energyStore.licznik} /> */}
          {/* <BatteryCapacity batteries={turbinesData?.energyStore.battery} /> */}
          <Matebox mateboxPrice={turbinesData?.energyStore.matebox} />
          <Installments />
          <EstimatedDotationSum />
          <IsVat />
          <h2 className="mt-8 font-orkneyBold">DANE TECHNICZNE - ANKIETA</h2>
          <Phases />
          <ConstructionType />
          <RoofCoverage />
          <RoofPitch />
        </div>
      </ScrollArea>
    </div>
  );
}
