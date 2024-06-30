import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const ElasticPipe = () => {
  const store = useStore();
  const { jsonData, mutations, airConditionStore } = useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setElasticPipePrice({
        quantity: debouncedAirCondStore.elasticPipeLen,
        price: jsonData.addons.elasticPipe,
      });
  }, [debouncedAirCondStore.elasticPipeLen, jsonData?.addons.elasticPipe]);

  return (
    <InputComponent
      title="RURA ELASTYCZNA fi50"
      onChange={({ target }) =>
        store.updateAirCondition("elasticPipeLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.elasticPipeLen}
    />
  );
};
