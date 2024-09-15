import React from "react";
import { TextComponent, PdfGeneratorButton } from "../../";
import { Loader } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTurbines } from "~/hooks/useTurbines";

export function Preview() {
  const [parent] = useAutoAnimate();
  const { turbinesStore, turbinesCalcStore } = useTurbines();
  console.log(turbinesStore);
  console.log(turbinesCalcStore);
  return (
    <div
      id="CALCULATIONS"
      className="mb-40 h-[500px] w-[70%] items-center rounded-[50px] bg-white laptop:mb-0 laptop:mt-10 laptop:h-[83%] laptop:w-[40%]"
    >
      <h2 className="-translate-y-3 text-center font-orkneyBold text-xl">
        PODGLĄD
      </h2>
      <div className="flex h-full ">
        {false ? (
          <Loader color="yellow" size="lg" variant="dots" className="mt-40" />
        ) : (
          <div className="flex w-full flex-wrap justify-between font-orkneyBold font-semibold">
            <div
              ref={parent}
              className="mt-3 h-[75%] w-full overflow-y-auto px-10"
            >
              <TextComponent
                title="ILOŚĆ FAZ U KLIENTA"
                calculations={turbinesStore.threePhases ? "3" : "1"}
              />
              <TextComponent
                title="TURBINA 500"
                calculations={turbinesStore.turbine500Count}
                unit="szt"
              />
              <TextComponent
                title="TURBINA 1000"
                calculations={turbinesStore.turbine1000Count}
                unit="szt"
              />
              <TextComponent
                title="TURBINA 1500"
                calculations={turbinesStore.turbine1500Count}
                unit="szt"
              />
              <TextComponent
                title="TURBINA 3000"
                calculations={turbinesStore.turbine3000Count}
                unit="szt"
              />
              {!turbinesStore.isHybridInverter && (
                <TextComponent
                  title="INWERTERA TRÓJ-FAZOWY"
                  calculations={turbinesStore.isThreePhasesInverter}
                />
              )}
              <TextComponent
                title="INWERTER HYBRYDOWY"
                calculations={turbinesStore.isHybridInverter}
              />
              <TextComponent
                title="POSADOWIENIE NA MASZCIE"
                calculations={turbinesStore.mastFoundation}
              />
              {turbinesStore.mastFoundation && (
                <TextComponent
                  title="RODZAJ MASZTU"
                  calculations={turbinesStore.mastType}
                />
              )}
              <TextComponent
                title="MASZT STALOWY"
                calculations={turbinesStore.steelMast}
                unit="m"
              />
              {turbinesStore.energyStore.name !== "" && (
                <h2 className="mt-10 w-full text-center text-xl">
                  MAGAZYN ENERGII
                </h2>
              )}
              <TextComponent
                title={turbinesStore.energyStore.name}
                calculations={turbinesStore.energyStore.price}
              />
              <TextComponent
                title="T30 CONTROLLER BATTERY SOLAX"
                calculations={turbinesStore.isBatteryController}
              />
              <TextComponent
                title="POJEMNOŚĆ BATERII"
                calculations={turbinesStore.batteryCapacity}
                unit="kWh"
              />
              <TextComponent
                title="LICZNIK DO MAGAZYNU ENERGII"
                calculations={turbinesStore.isEnergyMenagerCounter}
              />
              <TextComponent
                title="MATE BOX"
                calculations={turbinesStore.isMatebox}
              />

              {(turbinesCalcStore.turbinesTotalCosts.netCost !== 0 ||
                turbinesCalcStore.energyStoreTotalCosts.netCost !== 0) && (
                <>
                  <h2 className="mt-12 w-full text-center text-2xl underline">
                    FINANSE
                  </h2>
                  <h2 className="mt-7 w-full text-center text-xl">DOTACJE</h2>
                </>
              )}
              <TextComponent
                title="TURBINY"
                calculations={turbinesCalcStore.turbinesDotationAmount}
                color="green"
                size="xl"
              />
              <TextComponent
                title="MAGAZYN ENERGII"
                calculations={turbinesCalcStore.energyStoreDotationAmount}
                color="green"
                size="xl"
              />

              {turbinesCalcStore.turbinesTotalCosts.netCost !== 0 && (
                <h2 className="mt-10 w-full text-center text-xl">TURBINY</h2>
              )}

              <TextComponent
                title="KWOTA NETTO"
                calculations={turbinesCalcStore.turbinesTotalCosts.netCost}
              />
              <TextComponent
                title="KWOTA BRUTTO"
                calculations={turbinesCalcStore.turbinesTotalCosts.grossCost}
              />
              <TextComponent
                title="KWOTA PO DOTACJI"
                color="green"
                calculations={turbinesCalcStore.turbinesAfterDotationCost}
                size="xl"
              />

              {turbinesCalcStore.energyStoreTotalCosts.netCost !== 0 && (
                <h2 className="mt-10 w-full text-center text-xl">
                  MAGAZYN ENERGII
                </h2>
              )}
              <TextComponent
                title="KWOTA NETTO"
                calculations={turbinesCalcStore.energyStoreTotalCosts.netCost}
              />
              <TextComponent
                title="KWOTA BRUTTO"
                calculations={turbinesCalcStore.energyStoreTotalCosts.grossCost}
              />
              <TextComponent
                title="KWOTA PO DOTACJI"
                color="green"
                calculations={turbinesCalcStore.energyStoreAfterDotationCost}
                size="xl"
              />

              {turbinesCalcStore.loanForPurcharse.finallInstalmentPice !==
                0 && (
                <h2 className="mt-10 w-full text-center text-lg">
                  KREDYTOWANIE INSTALACJI
                </h2>
              )}
              <TextComponent
                title={`CENA 1 RATY PRZY ${turbinesStore.installmentNumber} RATACH PO ODLICZENIU DOTACJI`}
                color="green"
                calculations={
                  turbinesCalcStore.loanForPurcharse.finallInstalmentPice
                }
              />

              <div className="mt-20 text-center"></div>
            </div>
            <PdfGeneratorButton />
          </div>
        )}
      </div>
    </div>
  );
}
