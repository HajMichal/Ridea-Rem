import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const MastFoundation = () => {
  const { turbinesStore, updateTurbinesStore, updateTurbinesCalcStore } =
    useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("mastFoundation", e == "true");
    if (e != "true") {
      updateTurbinesStore("steelMast", 0);
      updateTurbinesCalcStore("mastCost", 0);
      updateTurbinesStore("mastType", "nie wybrano");
    }
  };

  return (
    <SelectComponent
      title="POSADOWIENIE NA MASZCIE"
      value={turbinesStore.mastFoundation}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(MastFoundation);
