import { ScrollArea } from "@mantine/core";
import React from "react";
import { InputComponent, SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useHeatHome } from "~/hooks/useHeatHome";
import useStore from "~/store";

export const HeatHomeFormulas = () => {
  const store = useStore();

  const { heatHomeStore } = useHeatHome();

  return (
    <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
      >
        CIEPŁO WŁAŚCIWE
      </h1>
      <ScrollArea h={"78%"}>
        <InputComponent
          title="ILOŚĆ M² OCIEPLENIA"
          onChange={(e) => {
            store.updateHeatHome("areaToHeat", e.target.valueAsNumber);
            store.updateHeatHome("plasterArea", e.target.valueAsNumber);
          }}
          step={1}
          value={heatHomeStore.areaToHeat}
        />
        <InputComponent
          title="ŁĄCZNA DŁUGOŚĆ PARAPETÓW (MB)"
          onChange={(e) =>
            store.updateHeatHome("windowSillCount", e.target.valueAsNumber)
          }
          step={1}
          value={heatHomeStore.windowSillCount}
        />
        <InputComponent
          title="TYNK AKRYLOWY (M²)"
          onChange={(e) =>
            store.updateHeatHome("plasterArea", e.target.valueAsNumber)
          }
          step={1}
          value={heatHomeStore.areaToHeat}
          disable
        />
        <InputComponent
          title="WYKOŃCZENIE GÓRNE (ATTICA/OGNIOMUR)"
          onChange={(e) =>
            store.updateHeatHome("topFinish", e.target.valueAsNumber)
          }
          step={1}
          value={heatHomeStore.topFinish}
        />
        <InputComponent
          title="KWOTA DODATKOWA"
          onChange={(e) =>
            store.updateHeatHome("additionalAmount", e.target.valueAsNumber)
          }
          step={1}
          value={heatHomeStore.additionalAmount}
        />
        <InputComponent
          title="LICZBA RAT"
          onChange={(e) => {
            store.updateHeatHome("installmentNumber", e.target.valueAsNumber);
          }}
          step={10}
          value={heatHomeStore.installmentNumber}
        />
        <SelectComponent
          title="DOTACJA"
          onChange={(e) => store.updateHeatHome("dotationStep", String(e))}
          value={heatHomeStore.dotationStep}
          data={[
            { label: "PRÓG 0", value: "prog0" },
            { label: "PRÓG 1", value: "prog1" },
            { label: "PRÓG 2", value: "prog2" },
            { label: "PRÓG 3", value: "prog3" },
          ]}
          smallField
        />

        <SelectComponent
          title="AUDYT ENERGETYCZNY"
          onChange={(e) =>
            store.updateHeatHome("isEnergeticAudit", e == "true")
          }
          value={heatHomeStore.isEnergeticAudit}
          data={YESNO}
          className="mt-20"
        />
      </ScrollArea>
    </div>
  );
};

export default HeatHomeFormulas;
