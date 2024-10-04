import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

function DashPipe() {
  const store = useStore();
  const { calcData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (calcData)
      mutations.setDashPipePrice({
        quantity: debouncedAirCondStore.pipeDashLen,
        price: calcData.addons.dashPipe,
      });
  }, [debouncedAirCondStore.pipeDashLen, calcData?.addons.dashPipe]);

  return (
    <InputComponent
      title="RURKA SKROPLIN"
      onChange={({ target }) =>
        store.updateAirCondition("pipeDashLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.pipeDashLen}
    />
  );
}

export default DashPipe;
