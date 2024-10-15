import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { InputComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";

interface ElasticPipeType {
  price?: number;
}
export const ElasticPipe = ({ price }: ElasticPipeType) => {
  const { updateAirCondition, mutations, airConditionStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (price)
      mutations.setElasticPipePrice({
        quantity: debouncedAirCondStore.elasticPipeLen,
        price,
      });
  }, [debouncedAirCondStore.elasticPipeLen, price]);

  return (
    <InputComponent
      title="RURA ELASTYCZNA fi50"
      onChange={({ target }) =>
        updateAirCondition("elasticPipeLen", target.valueAsNumber)
      }
      step={1}
      value={airConditionStore.elasticPipeLen}
    />
  );
};
