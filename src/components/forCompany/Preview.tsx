import React from "react";
import { TextComponent } from "../TextComponent";
import { useForCompany } from "~/hooks/useForCompany";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PdfGeneratorButton } from "../PdfGeneratorButton";

export const Preview = () => {
  const [parent] = useAutoAnimate();
  const { forCompanyStore, forCompanyCalcStore } = useForCompany();

  return (
    <div
      id="CALCULATIONS"
      className="mb-40 h-[500px] w-[70%] items-center rounded-[50px] bg-white laptop:mb-0 laptop:mt-10 laptop:h-[83%] laptop:w-[40%]"
    >
      <h2 className="-translate-y-3 text-center font-orkneyBold text-xl">
        PODGLĄD
      </h2>
      <div className="flex h-full w-full flex-wrap justify-between font-orkneyBold font-semibold">
        <div ref={parent} className="mt-3 h-[75%] w-full overflow-y-auto px-10">
          <TextComponent
            title="PRZYJĘTA MOC INSTALACJI"
            calculations={forCompanyStore.wantedInstalationPower}
            unit="kW"
          />
          {!!forCompanyCalcStore.calculateModuleCount.modulesCount400 && (
            <h2 className="mt-7 w-full text-center text-xl">PANEL 400kW</h2>
          )}
          <TextComponent
            title="POTRZEBNA LICZBA PANELI"
            calculations={
              forCompanyCalcStore.calculateModuleCount.modulesCount400
            }
            unit="szt"
          />
          <TextComponent
            title="MOC INSTALACJI"
            calculations={forCompanyCalcStore.allSystemPowers.systemPower400}
            unit="kW"
          />
          {!!forCompanyCalcStore.calculateModuleCount.modulesCount455 && (
            <h2 className="mt-7 w-full text-center text-xl">PANEL 455kW</h2>
          )}
          <TextComponent
            title="POTRZEBNA LICZBA PANELI"
            calculations={
              forCompanyCalcStore.calculateModuleCount.modulesCount455
            }
            unit="szt"
          />
          <TextComponent
            title="MOC INSTALACJI"
            calculations={forCompanyCalcStore.allSystemPowers.systemPower455}
            unit="kW"
          />
          {!!forCompanyCalcStore.calculateModuleCount.modulesCount500 && (
            <h2 className="mt-7 w-full text-center text-xl">PANEL 500kW</h2>
          )}
          <TextComponent
            title="POTRZEBNA LICZBA PANELI"
            calculations={
              forCompanyCalcStore.calculateModuleCount.modulesCount500
            }
            unit="szt"
          />
          <TextComponent
            title="MOC INSTALACJI"
            calculations={forCompanyCalcStore.allSystemPowers.systemPower500}
            unit="kW"
          />

          {!!forCompanyStore.wantedInstalationPower && (
            <h2 className="mt-14 w-full text-center text-xl">
              DANE WYBRANEJ INSTALACJI
            </h2>
          )}
          <TextComponent
            title="MONTAŻ NA GRUNCIE"
            calculations={forCompanyStore.groundPanelCount}
            unit={"szt"}
          />
          <TextComponent
            title="MONTAŻ NA DACHU PŁASKIM - EKIERKI"
            calculations={forCompanyStore.eccentricsCount}
            unit={"szt"}
          />
          <TextComponent
            title="SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY"
            calculations={forCompanyStore.roofWeightSystemCount}
            unit={"szt"}
          />
          <TextComponent
            title="OPTYMALIZATORY TIGO DO ZACIEMNIONYCH MODUŁÓW"
            calculations={forCompanyStore.tigoCount}
            unit={"szt"}
          />
          {!!forCompanyCalcStore.totalInstallationCosts.grossPrice && (
            <h2 className="mt-14 w-full text-center text-lg">FINANSE</h2>
          )}
          <TextComponent
            title="KWOTA BRUTTO ZA INSTALACJĘ"
            calculations={forCompanyCalcStore.totalInstallationCosts.grossPrice}
          />
        </div>
        <PdfGeneratorButton />
      </div>
    </div>
  );
};
