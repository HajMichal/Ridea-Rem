import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const PipeConnector = () => {
  const store = useStore();
  const { jsonData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setPipeConnectorPrice({
        quantity: debouncedAirCondStore.pipeConnector,
        price: jsonData.addons.connector,
      });
  }, [debouncedAirCondStore.pipeConnector, jsonData?.addons.connector]);

  return (
    <InputComponent
      title="ŁĄCZNIK / KOLANO / ZAKOŃCZENIE"
      onChange={({ target }) =>
        store.updateAirCondition("pipeConnector", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.pipeConnector}
    />
  );
};
