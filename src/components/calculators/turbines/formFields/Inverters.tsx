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
    if (addons) {
      mutations.setInverterCost({
        isThreePhasesInverter: turbinesStore.isThreePhasesInverter,
        isHybridInverter: turbinesStore.isHybridInverter,
        threePhaseInvCost: addons["inwerter 3fazowy"],
        hybridInvCost: addons["inwerter hybrydowy"],
        singlePhaseInvCost:
          turbinesStore.turbinesDetails.totalPower !== 0
            ? addons["inwerter 1fazowy"]
            : 0,
      });
    }
  }, [
    turbinesStore.isThreePhasesInverter,
    turbinesStore.isHybridInverter,
    turbinesStore.turbinesDetails.totalPower,
  ]);

  useEffect(() => {
    if (turbinesStore.turbinesDetails.totalPower >= 3.6) {
      updateTurbinesStore("isThreePhasesInverter", true);
    }

    // Usunac to pole i wymienic na formułe (kwota z bazy danych) * moc instalacji w Watach
    if (addons) {
      const priceForEachWatt = addons["cenaZaKazdyWat"];
      // totalPower is given in kW so we have to multiply by 1000
      const invBaseCost =
        turbinesStore.turbinesDetails.totalPower * 1000 * priceForEachWatt;
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
      <SelectComponent
        title="DOPŁATA DO INWERTERA 3 FAZOWEGO"
        value={turbinesStore.isThreePhasesInverter}
        onChange={handle3PhaseInverterChange}
        data={YESNO}
      />
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
