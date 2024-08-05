import React, { useEffect } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export const DashPump = () => {
  const store = useStore();
  const { jsonData, airConditionStore } = useAirCondition();

  useEffect(() => {
    if (jsonData && airConditionStore.dashPump)
      store.updateAirConditionCalculation("dashPump", jsonData.addons.dashPump);
    else store.updateAirConditionCalculation("dashPump", 0);
  }, [airConditionStore.dashPump]);

  return (
    <SelectComponent
      title="POMPA SKROPLIN (w przypadku, gdy nie da sie odprowadzić ze skosem)"
      onChange={(e) => store.updateAirCondition("dashPump", e == "true")}
      value={airConditionStore.dashPump}
      data={YESNO}
    />
  );
};
