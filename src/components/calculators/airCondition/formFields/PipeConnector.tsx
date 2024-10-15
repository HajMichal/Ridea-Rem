import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface PipeConnectorType {
  price?: number;
}
export const PipeConnector = ({ price }: PipeConnectorType) => {
  const { updateAirCondition, mutations, airConditionStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setPipeConnectorPrice({
        quantity: debouncedAirCondStore.pipeConnector,
        price: price,
      });
  }, [debouncedAirCondStore.pipeConnector, price]);

  return (
    <InputComponent
      title="ŁĄCZNIK / KOLANO / ZAKOŃCZENIE"
      onChange={({ target }) =>
        updateAirCondition("pipeConnector", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.pipeConnector}
    />
  );
};
