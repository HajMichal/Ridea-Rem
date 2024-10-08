import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const Gutter = () => {
  const store = useStore();
  const { calcData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (calcData)
      mutations.setGutterPrice({
        quantity: debouncedAirCondStore.gutterLen,
        price: calcData.addons.gutter,
      });
  }, [debouncedAirCondStore.gutterLen, calcData?.addons.gutter]);

  return (
    <InputComponent
      title="KORYTO 8x6 mm"
      onChange={({ target }) =>
        store.updateAirCondition("gutterLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.gutterLen}
    />
  );
};
