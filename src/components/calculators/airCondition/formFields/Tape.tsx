import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface TapeType {
  price?: number;
}
export const Tape = ({ price }: TapeType) => {
  const { updateAirCondition, mutations, airConditionStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setTapePrice({
        quantity: debouncedAirCondStore.tape,
        price,
      });
  }, [debouncedAirCondStore.tape, price]);

  return (
    <InputComponent
      title="TAŚMA DO INSTALACJI"
      onChange={({ target }) =>
        updateAirCondition("tape", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.tape}
    />
  );
};
