import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { TextComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

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
            className="mt-3 h-[75%] w-full overflow-y-auto px-10"
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
          </div>
        </div>
      </div>
    </div>
  );
};
