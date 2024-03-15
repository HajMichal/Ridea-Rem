import { ScrollArea } from "@mantine/core";
import React from "react";
import { InputComponent, SelectComponent } from "~/components";
import { useHeatHome } from "~/hooks/useHeatHome";
import useStore from "~/store";

const HeatHomeFormulas = () => {
  const store = useStore();

  const { heatHomeStore } = useHeatHome();

  return (
    <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl"
      >
        CIEPŁO WŁAŚCIWE
      </h1>
      <ScrollArea h={"78%"}>
        <SelectComponent
          title="GRUBOŚĆ OCIEPLENIA"
          onChange={(e) => store.updateHeatHome("heatThickness", String(e))}
          value={heatHomeStore.heatThickness}
          data={[
            { label: "15 cm", value: "cm_15" },
            { label: "20 cm", value: "cm_20" },
            { label: "25 cm", value: "cm_25" },
          ]}
          smallField
        />
        <InputComponent
          title="ILOŚĆ M² OCIEPLENIA"
          onChange={(e) =>
            store.updateHeatHome("areaToHeat", e.target.valueAsNumber)
          }
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
          value={heatHomeStore.plasterArea}
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
      </ScrollArea>
    </div>
  );
};

export default HeatHomeFormulas;
