import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

interface AirConditionerSupportType {
  price?: number;
}
export const AirConditionerSupport = ({ price }: AirConditionerSupportType) => {
  const { mutations, airConditionStore, updateAirCondition } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setAirConditionerSupportPrice({
        quantity: debouncedAirCondStore.airConditionerSupport,
        price: price,
      });
  }, [debouncedAirCondStore.airConditionerSupport, price]);

  return (
    <InputComponent
      title="WSPORNIK KLIMATYZATORA"
      onChange={({ target }) =>
        updateAirCondition("airConditionerSupport", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.airConditionerSupport}
    />
  );
};
