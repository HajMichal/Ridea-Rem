import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface CopperPipeType {
  price?: number;
}
export const CopperPipe = ({ price }: CopperPipeType) => {
  const { mutations, airConditionStore, updateAirCondition } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setCopperPipePrice({
        quantity: debouncedAirCondStore.copperPipeLen,
        price: price,
      });
  }, [price, debouncedAirCondStore.copperPipeLen]);

  return (
    <InputComponent
      title="RURA MIEDZIANA W OTULINIE"
      onChange={({ target }) =>
        updateAirCondition("copperPipeLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.copperPipeLen}
    />
  );
};
