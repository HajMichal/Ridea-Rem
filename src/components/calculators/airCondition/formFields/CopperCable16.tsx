import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface CopperCable16Type {
  price?: number;
}
export const CopperCable16 = ({ price }: CopperCable16Type) => {
  const { mutations, airConditionStore, updateAirCondition } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setCopperCable16Price({
        quantity: debouncedAirCondStore.copperCableLen16,
        price: price,
      });
  }, [debouncedAirCondStore.copperCableLen16, price]);

  return (
    <InputComponent
      title="KABEL MIEDZIANY 3x1.6"
      onChange={({ target }) =>
        updateAirCondition("copperCableLen16", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.copperCableLen16}
    />
  );
};
