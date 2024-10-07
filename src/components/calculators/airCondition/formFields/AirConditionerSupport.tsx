import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const AirConditionerSupport = () => {
  const store = useStore();
  const { calcData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (calcData)
      mutations.setAirConditionerSupportPrice({
        quantity: debouncedAirCondStore.airConditionerSupport,
        price: calcData.addons.airConditionerSupport,
      });
  }, [
    debouncedAirCondStore.airConditionerSupport,
    calcData?.addons.airConditionerSupport,
  ]);

  return (
    <InputComponent
      title="WSPORNIK KLIMATYZATORA"
      onChange={({ target }) =>
        store.updateAirCondition("airConditionerSupport", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.airConditionerSupport}
    />
  );
};
