import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const EnergyMenagerCounter = () => {
  const {
    turbinesStore,
    turbinesData,
    updateTurbinesStore,
    updateTurbinesCalcStore,
  } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("isEnergyMenagerCounter", e == "true");

    if (e == "true" && turbinesData?.energyStore) {
      updateTurbinesCalcStore(
        "energyCounterCost",
        turbinesData.energyStore["licznik"]
      );
    } else {
      updateTurbinesCalcStore("energyCounterCost", 0);
    }
  };

  return (
    <SelectComponent
      title="LICZNIK DO MAGAZYNU ENERGII"
      value={turbinesStore.isEnergyMenagerCounter}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(EnergyMenagerCounter);
