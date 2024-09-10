import React from "react";
import { TextComponent, PdfGeneratorButton } from "../../";
import { Loader } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTurbines } from "~/hooks/useTurbines";

export function Preview() {
  const [parent] = useAutoAnimate();
  const { turbinesStore } = useTurbines();
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

              <div className="mt-20 text-center"></div>
            </div>
            <PdfGeneratorButton />
          </div>
        )}
      </div>
    </div>
  );
}
