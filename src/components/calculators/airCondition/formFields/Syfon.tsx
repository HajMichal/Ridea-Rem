import React, { useEffect } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useAirCondition } from "~/hooks/useAirCondition";

interface SyfonType {
  price?: number;
}
export const Syfon = ({ price }: SyfonType) => {
  const {
    updateAirCondition,
    updateAirConditionCalculation,
    airConditionStore,
  } = useAirCondition();

  useEffect(() => {
    if (price && airConditionStore.syfon)
      updateAirConditionCalculation("syfonPrice", price);
    else updateAirConditionCalculation("syfonPrice", 0);
  }, [airConditionStore.syfon, price]);

  return (
    <SelectComponent
      title="SYFON (przyłączenie skroplin do kanalizacji)"
      onChange={(e) => updateAirCondition("syfon", e == "true")}
      value={airConditionStore.syfon}
      data={YESNO}
    />
  );
};
