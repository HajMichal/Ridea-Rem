import React, { useEffect } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const Syfon = () => {
  const store = useStore();
  const { jsonData, mutations, airConditionStore } = useAirCondition();

  // Change it to function
  useEffect(() => {
    if (jsonData && airConditionStore.syfon)
      store.updateAirConditionCalculation("syfonPrice", jsonData.addons.syfon);
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
