import React, { useEffect } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useAirCondition } from "~/hooks/useAirCondition";

interface DashPumpPrice {
  price?: number;
}
export const DashPump = ({ price }: DashPumpPrice) => {
  const {
    updateAirCondition,
    updateAirConditionCalculation,
    airConditionStore,
  } = useAirCondition();

  useEffect(() => {
    if (price && airConditionStore.dashPump)
      updateAirConditionCalculation("dashPump", price);
    else updateAirConditionCalculation("dashPump", 0);
  }, [airConditionStore.dashPump, price]);

  return (
    <SelectComponent
      title="POMPA SKROPLIN (w przypadku, gdy nie da sie odprowadzić ze skosem)"
      onChange={(e) => updateAirCondition("dashPump", e == "true")}
      value={airConditionStore.dashPump}
      data={YESNO}
    />
  );
};
