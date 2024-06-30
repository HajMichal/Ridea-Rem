import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const CopperPipe = () => {
  const store = useStore();
  const { jsonData, mutations, airConditionStore, airConditionCalcStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setCopperPipePrice({
        quantity: debouncedAirCondStore.copperPipeLen,
        price: jsonData.addons["copperPipe1/4+3/8"],
      });
  }, [
    jsonData?.addons["copperPipe1/4+3/8"],
    debouncedAirCondStore.copperPipeLen,
  ]);

  return (
    <InputComponent
      title="RURA MIEDZIANA W OTULINIE"
      onChange={({ target }) =>
        store.updateAirCondition("copperPipeLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.copperPipeLen}
    />
  );
};
