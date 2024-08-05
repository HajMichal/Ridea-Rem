import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const Tape = () => {
  const store = useStore();
  const { jsonData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setTapePrice({
        quantity: debouncedAirCondStore.tape,
        price: jsonData.addons.installationTape,
      });
  }, [debouncedAirCondStore.tape, jsonData?.addons.installationTape]);

  return (
    <InputComponent
      title="TAŚMA DO INSTALACJI"
      onChange={({ target }) =>
        store.updateAirCondition("tape", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.tape}
    />
  );
};
