import { ScrollArea } from "@mantine/core";
import React, { memo } from "react";

import {
  Autoconsumption,
  CablesAC,
  ChooseBoiler,
  ChooseSolar,
  ChooseVat,
  DitchLength,
  ChooseEccentrics,
  EnergyConsumption,
  EnergyPrice,
  EnergyUsageLimit,
  IsDitching,
  IsEms,
  IsEnergyStore,
  IsGroundMontage,
  IsHeatStore,
  IsHybridInverter,
  IsSouthRoof,
  ModulesCount,
  TigoCount,
  IsRoofSystem,
  ChooseEnergyStore,
  IsMatebox,
  IsCarPort,
  ChooseCarPort,
  ChooseTaxRelif,
  DotationMojPrad,
  DotationCzystePowietrze,
  DotationStep,
  IsPromotion,
  IsVoucherHoliday,
  Installments,
  Promotion,
} from "./formFields";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";

interface PhotovoltaicFormulasType {
  photovoltaicData?: PhotovoltaicDataToCalculation;
}
function PhotovoltaicFormulas({ photovoltaicData }: PhotovoltaicFormulasType) {
  return (
    <div id="FORM" className="h-full p-3 laptop:w-[55%] laptop:min-w-[500px] ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
      >
        FOTOWOLTAIKA
      </h1>
      <ScrollArea h={"78%"}>
        <div className="laptop:mr-4">
          <h2 className="font-orkneyBold">CENA ENERGII</h2>
          <EnergyPrice />
          <EnergyConsumption />
          <EnergyUsageLimit />

          <h2 className="mt-5 font-orkneyBold">INSTALACJA FOTOWOLTAICZNA</h2>
          <ChooseVat />
          <ChooseSolar />
          <ModulesCount />
          <Autoconsumption />
          <CablesAC price={photovoltaicData?.addons.kableAC} />
          <IsGroundMontage />
          <IsDitching />
          <DitchLength price={photovoltaicData?.addons.przekopy} />
          <IsSouthRoof />
          <ChooseEccentrics />
          <IsRoofSystem />
          <TigoCount />
          <IsHybridInverter
            price={photovoltaicData?.addons.inwerterHybrydowy}
          />
          <IsHeatStore />
          <ChooseBoiler boilersData={photovoltaicData?.boilers} />
          <IsEms />
          <IsEnergyStore />
          <ChooseEnergyStore energyStoreData={photovoltaicData?.energyStore} />
          <IsMatebox price={photovoltaicData?.addons.matebox} />
          <IsCarPort />
          <ChooseCarPort carPort={photovoltaicData?.carPort} />
          <ChooseTaxRelif />
          <DotationMojPrad />
          <DotationCzystePowietrze />
          <DotationStep />
          <IsPromotion />
          <IsVoucherHoliday />
          <Installments />
          <Promotion />
        </div>
      </ScrollArea>
    </div>
  );
}

export default memo(PhotovoltaicFormulas);
