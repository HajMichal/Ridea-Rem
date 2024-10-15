import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface DashPipeType {
  price?: number;
}
function DashPipe({ price }: DashPipeType) {
  const { mutations, airConditionStore, updateAirCondition } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setDashPipePrice({
        quantity: debouncedAirCondStore.pipeDashLen,
        price: price,
      });
  }, [debouncedAirCondStore.pipeDashLen, price]);

  return (
    <InputComponent
      title="RURKA SKROPLIN"
      onChange={({ target }) =>
        updateAirCondition("pipeDashLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.pipeDashLen}
    />
  );
}

export default DashPipe;
