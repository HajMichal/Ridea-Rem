import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const CopperCable15 = () => {
  const store = useStore();
  const { jsonData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setCopperCable15Price({
        quantity: debouncedAirCondStore.copperCableLen15,
        price: jsonData.addons["copperCable1/5"],
      });
  }, [
    debouncedAirCondStore.copperCableLen15,
    jsonData?.addons["copperCable1/5"],
  ]);

  return (
    <InputComponent
      title="KABEL MIEDZIANY 3x1.5"
      onChange={(e) => store.updateAirCondition("copperCableLen15", Number(e))}
      step={1}
      value={airConditionStore.copperCableLen15}
    />
  );
};
