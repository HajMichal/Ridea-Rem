import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TextComponent, PdfGeneratorButton } from "../../";
import { useHeatHome } from "~/hooks/useHeatHome";
import { AUDIT_DOTATION } from "~/constans/heatHome/dotations";

export function Preview() {
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
            <h3 className="text-center font-orkneyLight">
              GRUBOŚĆ OCIEPLENIA DOBRANA NA PODSTAWIE AUDYTU ENERGETYCZNEGO
            </h3>
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
                {heatHomeStore.dotationStep !== "prog0" && (
                  <TextComponent
                    title="KWOTA RATY PRZED ODLICZENIEM DOTACJI"
                    calculations={
                      heatHomeCalcStore.installmentPrice
                        .instalmentBeforeDotations
                    }
                  />
                )}
              </div>
            )}
            <h2 className="mt-10 w-full text-center text-xl">DOTACJE</h2>
            <TextComponent
              title="DOTACJE NA TERMOMODERNIZACJE"
              calculations={heatHomeCalcStore.dotationValue}
              unit="ZŁ"
            />
            <TextComponent
              title="DOTACJE NA AUDYT ENERGETYCZNY"
              calculations={AUDIT_DOTATION}
              unit="ZŁ"
            />
            <div className="mt-20 text-center">
              <TextComponent
                title="KWOTA PO DOTACJACH"
                color="green"
                size="xl"
                calculations={heatHomeCalcStore.amountAfterDotation}
              />
              <TextComponent
                title={`KWOTA RATY PRZY ${heatHomeStore.installmentNumber} RATACH`}
                color="green"
                size="xl"
                calculations={
                  heatHomeCalcStore.installmentPrice.finallInstalmentPice
                }
              />
              <TextComponent
                title="CENA AUDYTU ENERGETYCZNEGO"
                calculations={heatHomeCalcStore.energeticAuditCost}
                unit="ZŁ"
              />
            </div>
          </div>
          <PdfGeneratorButton />
        </div>
      </div>
    </div>
  );
}
