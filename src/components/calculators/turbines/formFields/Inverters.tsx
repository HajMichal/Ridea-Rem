import React from "react";
import { memo, useEffect } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const Inverters = () => {
  const {
    turbinesStore,
    turbinesData,
    updateTurbinesStore,
    updateTurbinesCalcStore,
    mutations,
  } = useTurbines();

  useEffect(() => {
    if (turbinesData?.addons)
      mutations.setInverterCost({
        isThreePhasesInverter: turbinesStore.isThreePhasesInverter,
        isHybridInverter: turbinesStore.isHybridInverter,
        threePhaseInvCost: turbinesData.addons["inwerter 3fazowy"],
        hybridInvCost: turbinesData.addons["inwerter hybrydowy"],
      });
  }, [turbinesStore.isThreePhasesInverter, turbinesStore.isHybridInverter]);

  useEffect(() => {
    if (turbinesData?.addons) {
      const invBase = turbinesData.addons["podstawa inwertera"];
      const invBaseCost =
        turbinesStore.turbinesDetails.totalPower !== 0
          ? invBase + invBase * turbinesStore.turbinesDetails.totalPower
          : 0;
      updateTurbinesCalcStore("inverterBaseCost", invBaseCost);
    }
  }, [turbinesStore.turbinesDetails.totalPower]);

  const handle3PhaseInverterChange = (e: string | null) => {
    updateTurbinesStore("isThreePhasesInverter", e == "true");

    if (e != "true") updateTurbinesStore("isHybridInverter", false);
  };

  const handleHybridInverterChange = (e: string | null) =>
    updateTurbinesStore("isHybridInverter", e == "true");
  return (
    <>
      {!turbinesStore.threePhases && (
        <SelectComponent
          title="DOPŁATA DO INWERTERA 3 FAZOWEGO"
          value={turbinesStore.isThreePhasesInverter}
          onChange={handle3PhaseInverterChange}
          data={YESNO}
        />
      )}
      {(turbinesStore.threePhases || turbinesStore.isThreePhasesInverter) && (
        <SelectComponent
          title="DOPŁATA DO INWERTERA HYBRYDOWEGO"
          value={turbinesStore.isHybridInverter}
          onChange={handleHybridInverterChange}
          data={YESNO}
        />
      )}
    </>
  );
};
export default memo(Inverters);
