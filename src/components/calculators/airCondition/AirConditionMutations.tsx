import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export function AirConditionMutations() {
  const store = useStore();
  const { jsonData, mutations, airConditionStore, airConditionCalcStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setCopperPipePrice({
        quantity: debouncedAirCondStore.copperPipeLen,
        price: jsonData.addons["copperPipe1/4+3/8"],
      });
  }, [
    jsonData?.addons["copperPipe1/4+3/8"],
    debouncedAirCondStore.copperPipeLen,
  ]);
}
