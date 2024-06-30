import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const WallPass = () => {
  const store = useStore();
  const { jsonData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setWallPassPrice({
        quantity: debouncedAirCondStore.wallPass,
        price: jsonData.addons.wallHole,
      });
  }, [debouncedAirCondStore.wallPass, jsonData?.addons.wallHole]);

  return (
    <InputComponent
      title="PRZEPUST ŚCIENNY"
      onChange={(e) => store.updateAirCondition("wallPass", Number(e))}
      step={1}
      value={airConditionStore.wallPass}
    />
  );
};
