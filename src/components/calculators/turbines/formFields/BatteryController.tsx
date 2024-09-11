import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const BatteryController = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("isBatteryController", e == "true");

    if (e != "true") updateTurbinesStore("batteryCapacity", 0);
  };

  return (
    <SelectComponent
      title="T30 CONTROLLER BATTERY SOLAX"
      value={turbinesStore.isBatteryController}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(BatteryController);
