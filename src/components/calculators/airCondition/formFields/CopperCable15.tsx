import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

interface CopperCable15Type {
  price?: number;
}
export const CopperCable15 = ({ price }: CopperCable15Type) => {
  const store = useStore();
  const { mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setCopperCable15Price({
        quantity: debouncedAirCondStore.copperCableLen15,
        price: price,
      });
  }, [price, debouncedAirCondStore.copperCableLen15]);

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
