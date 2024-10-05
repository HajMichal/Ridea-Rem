import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const IsVat = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("isVat23", e == "true");
    if (e == "true") updateTurbinesStore("estimatedDotationSum", 0);
  };

  return (
    <SelectComponent
      title="MONTAŻ NA FIRMĘ"
      value={turbinesStore.isVat23}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(IsVat);
