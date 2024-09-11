import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const Matebox = () => {
  const {
    turbinesStore,
    turbinesData,
    updateTurbinesStore,
    updateTurbinesCalcStore,
  } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("isMatebox", e == "true");

    if (e == "true" && turbinesData?.energyStore) {
      updateTurbinesCalcStore(
        "mateboxCost",
        turbinesData.energyStore["matebox"]
      );
    } else {
      updateTurbinesCalcStore("mateboxCost", 0);
    }
  };

  return (
    <SelectComponent
      title="MATE BOX"
      value={turbinesStore.isMatebox}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(Matebox);
