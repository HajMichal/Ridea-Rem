import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface WallPassType {
  price?: number;
}
export const WallPass = ({ price }: WallPassType) => {
  const { updateAirCondition, mutations, airConditionStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setWallPassPrice({
        quantity: debouncedAirCondStore.wallPass,
        price,
      });
  }, [debouncedAirCondStore.wallPass, price]);

  return (
    <InputComponent
      title="PRZEPUST ŚCIENNY"
      onChange={({ target }) =>
        updateAirCondition("wallPass", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.wallPass}
    />
  );
};
