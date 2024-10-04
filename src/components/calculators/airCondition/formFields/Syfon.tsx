import React, { useEffect } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const Syfon = () => {
  const store = useStore();
  const { calcData, airConditionStore } = useAirCondition();

  useEffect(() => {
    if (calcData && airConditionStore.syfon)
      store.updateAirConditionCalculation("syfonPrice", calcData.addons.syfon);
    else store.updateAirConditionCalculation("syfonPrice", 0);
  }, [airConditionStore.syfon]);

  return (
    <SelectComponent
      title="SYFON (przyłączenie skroplin do kanalizacji)"
      onChange={(e) => store.updateAirCondition("syfon", e == "true")}
      value={airConditionStore.syfon}
      data={YESNO}
    />
  );
};
