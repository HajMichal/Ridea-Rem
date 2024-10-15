import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

interface MateboxType {
  mateboxPrice?: number;
}
const Matebox = ({ mateboxPrice }: MateboxType) => {
  const { turbinesStore, updateTurbinesStore, updateTurbinesCalcStore } =
    useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("isMatebox", e == "true");

    if (e == "true" && mateboxPrice) {
      updateTurbinesCalcStore("mateboxCost", mateboxPrice);
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
