import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { useHeatPump } from "~/hooks/useHeatPump";
import { TextComponent, PdfGeneratorButton } from "../../";
import { Group, Text } from "@mantine/core";

interface dataFromJson {
  cop?: number;
}
export function Preview({ cop }: dataFromJson) {
  const { heatPumpStore, heatPumpCalcStore } = useHeatPump();
  const [parent] = useAutoAnimate();

  return (
    <div
      id="CALCULATIONS"
      className="mb-40 h-[500px] w-[70%] items-center rounded-[50px] bg-white laptop:mb-0 laptop:mt-10 laptop:h-[83%] laptop:w-[40%]"
    >
      <h2 className="-translate-y-3 text-center font-orkneyBold text-xl">
        PODGLĄD
      </h2>
      <div className="flex h-full ">
        <div className="flex w-full flex-wrap justify-between font-orkneyBold font-semibold">
          <div
            ref={parent}
            className="mt-3 h-[75%] w-full overflow-y-auto px-10"
          >
            {heatPumpStore.suggestedPump !== "" && (
              <Group position="center" mt="md" mb="xs" className="">
                <Text className="">PROPONOWANA POMPA CIEPŁA</Text>
                {heatPumpStore.suggestedPump}
              </Group>
            )}

            <TextComponent
              title="CENA ZAKUPU 1 TONY"
              calculations={heatPumpStore.oneTonneOfResourceCost}
            />
            <TextComponent
              title="DOTYCHCZASOWY ROCZNY KOSZT OGRZEWANIA DOMU"
              calculations={heatPumpStore.yearlyHeatingHomeCost}
            />
            <TextComponent
              title="PUNKT BIWALENTNY POMPY CIEPŁA"
              calculations={heatPumpStore.minimalWorkingTemp}
            />

            <TextComponent
              title="SCHEMAT PRZYŁĄCZENIOWY"
              calculations={heatPumpStore.isBufor}
            />
            <TextComponent
              title="CENA MONTAŻU WRAZ Z MATERIAŁAMI"
              calculations={heatPumpCalcStore.bufforCost}
            />
            <TextComponent
              title="MONTAŻ NA FIRMĘ Z WATEM 23%"
              calculations={heatPumpStore.forCompany}
            />
            <TextComponent
              title="PRZEDŁUŻONA GWARANCJA DO 10 LAT"
              calculations={heatPumpStore.isLongerGuarantee}
            />
            <TextComponent
              title="MONTAŻ KOLEJNEJ POMPY CIEPŁA W KASKADZIE"
              calculations={heatPumpStore.isAnotherHeatPumpInCascade}
            />
            <TextComponent
              title="PRZYGOTOWANE PODŁOŻE POD POSADOWIENIE"
              calculations={heatPumpStore.isPumpPlacementOnCobblestone}
            />
            <TextComponent
              title="DODATKOWE PRZEWIERTY DO KOLEJNEGO POMIESZCZENIA Z MASZYNOWNI"
              calculations={heatPumpStore.newDrillings}
            />
            <TextComponent
              title="POPROWADZENIE INSTALACJI PONAD STANDARD"
              calculations={heatPumpStore.longerIsolationFromMineralWool}
            />
            <TextComponent
              title="RURA PREIZOLOWANA (W GRUNCIE) - PIERWSZE 2MB"
              calculations={heatPumpStore.isPreIsolatedPipe}
            />
            <TextComponent
              title="ILOŚĆ METRÓW RURY PREIZOLOWANEJ PONAD 2MB"
              calculations={heatPumpStore.longerPreIsolatedPipe}
            />
            <TextComponent
              title="MONTAŻ CYRKULACJI DO CWU"
              calculations={heatPumpStore.isMontageCirculationCWU}
            />
            <TextComponent
              title="DEMONTAŻ STAREGO KOTŁA BEZ WYNOSZENIA"
              calculations={heatPumpStore.demontageOldBoiler}
            />
            <TextComponent
              title="POSPRZĄTANIE MIEJSCA POSADOWIENIA ELEMTNÓW MASZYNOWNI"
              calculations={heatPumpStore.cleanMontagePlacement}
            />
            <TextComponent
              title="PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA"
              calculations={heatPumpStore.moveCwu}
            />
            <TextComponent
              title="WYKONANIE PRZYŁĄCZA ENERGETYCZNEGO DO ZASILANIA PC (SKRZYNKA Z ZABEZPIECZANIAMI)"
              calculations={heatPumpStore.makeEnergeticConnection}
            />
            <TextComponent
              title="SPIĘCIE BUFORA CO, Z DODATKOWYM ŹRÓDŁEM GRZEWCZYM"
              calculations={heatPumpStore.mergeNewBufforWithOld}
            />
            <TextComponent
              title="ZAMKNIĘCIE UKŁADU OTWARTEGO"
              calculations={heatPumpStore.closingOpenSytem}
            />
            {!!heatPumpCalcStore.heatPumpPricingBeforeDotations.vatValue && (
              <TextComponent
                title="VAT"
                calculations={heatPumpCalcStore.heatPumpPricingBeforeDotations.vatValue.toFixed(
                  2
                )}
              />
            )}
            {!!heatPumpCalcStore.heatPumpPricingBeforeDotations
              .grossSystemValue && (
              <TextComponent
                title="CENA ZESTAWU BRUTTO"
                calculations={heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue.toFixed(
                  2
                )}
              />
            )}
            <h2 className="mt-7 w-full text-center text-xl">DOTACJE</h2>
            <TextComponent
              title="DOTACJA NA MODERNIZACJE CO + CWU"
              calculations={
                heatPumpCalcStore.heatStoreDotations.modernizationDotation
              }
            />
            <TextComponent
              title="DOTACJA NA POMPĘ CIEPŁA"
              calculations={
                heatPumpCalcStore.heatStoreDotations.heatStoreDotationValue
              }
            />
            <div className="mt-20 text-center">
              <TextComponent
                title="KWOTA PO DOTACJACH"
                color="green"
                size="xl"
                calculations={heatPumpCalcStore.finallGrossInstalationCost}
              />
              <TextComponent
                title={`CENA 1 RATY PRZY ${heatPumpStore.installmentNumber} RATACH`}
                calculations={
                  heatPumpCalcStore.loanForPurcharse.finallInstalmentPice
                }
                color="green"
                size="xl"
              />
            </div>
          </div>
          <PdfGeneratorButton cop={cop} />
        </div>
      </div>
    </div>
  );
}
