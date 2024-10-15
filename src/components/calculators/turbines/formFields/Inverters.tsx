import React from "react";
import { memo, useEffect } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";
import { type Addons } from "~/server/api/routers/turbines/interfaces";

interface InvertersType {
  addons?: Addons;
}
const Inverters = ({ addons }: InvertersType) => {
  const {
    turbinesStore,
    updateTurbinesStore,
    updateTurbinesCalcStore,
    mutations,
  } = useTurbines();

  useEffect(() => {
    if (addons)
      mutations.setInverterCost({
        isThreePhasesInverter: turbinesStore.isThreePhasesInverter,
        isHybridInverter: turbinesStore.isHybridInverter,
        threePhaseInvCost: addons["inwerter 3fazowy"],
        hybridInvCost: addons["inwerter hybrydowy"],
      });
  }, [turbinesStore.isThreePhasesInverter, turbinesStore.isHybridInverter]);

  useEffect(() => {
    if (addons) {
      const invBase = addons["podstawa inwertera"];
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
