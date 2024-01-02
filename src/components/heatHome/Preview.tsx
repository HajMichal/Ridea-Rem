import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { useHeatPump } from "~/hooks/useHeatPump";
import { TextComponent } from "../TextComponent";
import { Group, Text } from "@mantine/core";
import { PdfGeneratorButton } from "../PdfGeneratorButton";
import { useHeatHome } from "~/hooks/useHeatHome";

export const Preview = () => {
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
              title="GRUBOŚĆ OCIEPLENIA"
              calculations={heatHomeStore.heatThickness}
            />
            <TextComponent
              title="POWIERZCHNIA DO OCIEPLENIA"
              calculations={heatHomeStore.areaToHeat}
              unit="M²"
            />
            <TextComponent
              title="PARAPETY"
              calculations={heatHomeStore.windowSillCount}
              unit="SZT"
            />
            <TextComponent
              title="TYNK"
              calculations={heatHomeStore.plasterArea}
              unit="M²"
            />
            <TextComponent
              title="WYKOŃCZENIE GÓRNE"
              calculations={heatHomeStore.topFinish}
              unit="M²"
            />
          </div>
          <PdfGeneratorButton />
        </div>
      </div>
    </div>
  );
};
