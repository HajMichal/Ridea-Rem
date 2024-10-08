import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const CopperCable16 = () => {
  const store = useStore();
  const { calcData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (calcData)
      mutations.setCopperCable16Price({
        quantity: debouncedAirCondStore.copperCableLen16,
        price: calcData.addons["copperCable1/6"],
      });
  }, [
    debouncedAirCondStore.copperCableLen16,
    calcData?.addons["copperCable1/6"],
  ]);

  return (
    <InputComponent
      title="KABEL MIEDZIANY 3x1.6"
      onChange={({ target }) =>
        store.updateAirCondition("copperCableLen16", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.copperCableLen16}
    />
  );
};
