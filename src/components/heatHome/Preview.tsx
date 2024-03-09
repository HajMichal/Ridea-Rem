import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { TextComponent } from "../TextComponent";
import { PdfGeneratorButton } from "../PdfGeneratorButton";
import { useHeatHome } from "~/hooks/useHeatHome";

export default function Preview() {
  const { heatHomeStore, heatHomeCalcStore } = useHeatHome();
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
            <TextComponent
              title="POWIERZCHNIA DO OCIEPLENIA"
              calculations={heatHomeStore.areaToHeat}
              unit="M²"
            />
            <TextComponent
              title="ŁĄCZNA DŁUGOŚĆ PARAPETÓW "
              calculations={heatHomeStore.windowSillCount}
              unit="MB"
            />
            <TextComponent
              title="TYNK AKRYLOWY"
              calculations={heatHomeStore.plasterArea}
              unit="M²"
            />
            <TextComponent
              title="WYKOŃCZENIE GÓRNE (ATTICA/OGNIOMUR)"
              calculations={heatHomeStore.topFinish}
              unit="MB"
            />
            {!!heatHomeCalcStore.totalCost.nett && (
              <div className="my-10">
                <h2 className="w-full text-center text-xl">FINANSE</h2>
                <TextComponent
                  title="KWOTA NETTO"
                  calculations={heatHomeCalcStore.totalCost.nett}
                />
                <TextComponent
                  title="KWOTA BRUTTO"
                  calculations={heatHomeCalcStore.totalCost.gross}
                />
              </div>
            )}
            <TextComponent
              title="KWOTA DOTACJI"
              calculations={heatHomeCalcStore.dotationValue}
              unit="ZŁ"
            />
            <div className="mt-20 text-center">
              <TextComponent
                title="KWOTA PO DOTACJACH"
                color="green"
                size="xl"
                calculations={heatHomeCalcStore.finallCost}
              />
            </div>
          </div>
          <PdfGeneratorButton />
        </div>
      </div>
    </div>
  );
}
