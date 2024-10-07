import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const CopperCable15 = () => {
  const store = useStore();
  const { calcData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (calcData)
      mutations.setCopperCable15Price({
        quantity: debouncedAirCondStore.copperCableLen15,
        price: calcData.addons["copperCable1/5"],
      });
  }, [
    calcData?.addons["copperCable1/5"],
    debouncedAirCondStore.copperCableLen15,
  ]);

  return (
    <InputComponent
      title="KABEL MIEDZIANY 3x1.5"
      onChange={({ target }) =>
        store.updateAirCondition("copperCableLen15", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.copperCableLen15}
    />
  );
};
