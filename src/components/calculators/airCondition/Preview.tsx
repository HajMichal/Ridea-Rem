import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { PdfGeneratorButton, TextComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import { airConditionCalculationSlice } from "~/store/airCondition/airConditionCalculationSlice";

export const Preview = () => {
  const { jsonData, airConditionStore, airConditionCalcStore } =
    useAirCondition();
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
            className="mt-3 h-[75%] w-full overflow-y-auto overflow-x-hidden px-10"
          >
            <h3 className="flex w-full justify-center text-xl">
              {airConditionStore.choosedAirConditioner?.type}
            </h3>
            <TextComponent
              title="MOC"
              calculations={airConditionStore.choosedAirConditioner?.power}
              unit="kW"
            />
            <TextComponent
              title="OPCJA"
              calculations={airConditionStore.choosedAirConditioner?.option}
            />
            <TextComponent
              title="POWIERZCHNIA"
              calculations={airConditionStore.choosedAirConditioner?.area}
              unit="m/kW"
            />
            <TextComponent
              title="CHŁ/GRZAN"
              calculations={airConditionStore.choosedAirConditioner?.energyType}
            />
            <TextComponent
              title="CENA NETTO KLIMATYZATORA"
              calculations={airConditionStore.choosedAirConditioner?.price}
              unit="ZŁ"
            />
            <h3 className="flex w-full justify-center text-xl">MONTAŻ</h3>
            <TextComponent
              title="RURA MIEDZIANA W OTULINIE"
              calculations={airConditionStore.copperPipeLen}
              unit="mb"
            />
            <TextComponent
              title="KABEL MIEDZIANY 3x1.5"
              calculations={airConditionStore.copperCableLen15}
              unit="mb"
            />
            <TextComponent
              title="KABEL MIEDZIANY 3x1.6"
              calculations={airConditionStore.copperCableLen16}
              unit="mb"
            />
            <TextComponent
              title="RURKA SKROPLIN"
              calculations={airConditionStore.pipeDashLen}
              unit="mb"
            />
            <TextComponent
              title="WSPORNIK KLIMATYZATORA"
              calculations={airConditionStore.airConditionerSupport}
              unit="szt"
            />
            <TextComponent
              title="KORYTKO 8x6mm"
              calculations={airConditionStore.gutterLen}
              unit="mb"
            />
            <TextComponent
              title="ŁĄCZNIK / KOLANO / ZAKOŃCZENIE"
              calculations={airConditionStore.pipeConnector}
              unit="kpl"
            />
            <TextComponent
              title="RURA ELASTYCZNA fi 50"
              calculations={airConditionStore.elasticPipeLen}
              unit="mb"
            />
            <TextComponent
              title="TAŚMA MONTAŻOWA"
              calculations={airConditionStore.tape}
              unit="szt"
            />
            <TextComponent
              title="PRZEPUST ŚCIENNY"
              calculations={airConditionStore.wallPass}
              unit="szt"
            />
            {(airConditionStore.syfon || airConditionStore.dashPump) && (
              <h3 className="mt-5 flex w-full justify-center text-xl">
                ELEMENTY DODATKOWE
              </h3>
            )}
            <TextComponent
              title="SYFON"
              calculations={airConditionStore.syfon}
            />
            <TextComponent
              title="POMPA SKROPLIN"
              calculations={airConditionStore.dashPump}
            />

            <div>
              <h3 className="mt-10 w-full text-center text-xl">FINANSE</h3>
              <TextComponent
                title="KWOTA NETTO ZA INSTALACJĘ"
                calculations={
                  airConditionCalcStore.installationPricing.netInstallationPrice
                }
                unit="ZŁ"
              />
              <TextComponent
                title="KWOTA BRUTTO ZA INSTALACJĘ"
                calculations={
                  airConditionCalcStore.installationPricing
                    .grossInstallationPrice
                }
                unit="ZŁ"
              />
              <TextComponent
                title="KWOTA VAT"
                calculations={
                  airConditionCalcStore.installationPricing.vatValue
                }
                unit="ZŁ"
              />
            </div>
          </div>
          <PdfGeneratorButton />
        </div>
      </div>
    </div>
  );
};
