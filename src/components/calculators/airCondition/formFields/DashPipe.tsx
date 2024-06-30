import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

function DashPipe() {
  const store = useStore();
  const { jsonData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setDashPipePrice({
        quantity: debouncedAirCondStore.pipeDashLen,
        price: jsonData.addons.dashPipe,
      });
  }, [debouncedAirCondStore.pipeDashLen, jsonData?.addons.dashPipe]);

  return (
    <InputComponent
      title="RURKA SKROPLIN"
      onChange={(e) => store.updateAirCondition("pipeDashLen", Number(e))}
      step={1}
      value={airConditionStore.pipeDashLen}
    />
  );
}

export default DashPipe;
