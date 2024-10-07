import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const WallPass = () => {
  const store = useStore();
  const { calcData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (calcData)
      mutations.setWallPassPrice({
        quantity: debouncedAirCondStore.wallPass,
        price: calcData.addons.wallHole,
      });
  }, [debouncedAirCondStore.wallPass, calcData?.addons.wallHole]);

  return (
    <InputComponent
      title="PRZEPUST ŚCIENNY"
      onChange={({ target }) =>
        store.updateAirCondition("wallPass", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.wallPass}
    />
  );
};
