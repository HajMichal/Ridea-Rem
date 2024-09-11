import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const EnergyMenagerCounter = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) =>
    updateTurbinesStore("isEnergyMenagerCounter", e == "true");

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
