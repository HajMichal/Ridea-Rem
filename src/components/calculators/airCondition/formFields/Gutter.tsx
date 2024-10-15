import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface GutterType {
  price?: number;
}
export const Gutter = ({ price }: GutterType) => {
  const { updateAirCondition, mutations, airConditionStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setGutterPrice({
        quantity: debouncedAirCondStore.gutterLen,
        price: price,
      });
  }, [debouncedAirCondStore.gutterLen, price]);

  return (
    <InputComponent
      title="KORYTO 8x6 mm"
      onChange={({ target }) =>
        updateAirCondition("gutterLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.gutterLen}
    />
  );
};
