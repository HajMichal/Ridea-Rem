import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const BatteryController = () => {
  const {
    turbinesStore,
    turbinesData,
    updateTurbinesStore,
    updateTurbinesCalcStore,
  } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("isBatteryController", e == "true");
    if (e == "true" && turbinesData?.energyStore) {
      updateTurbinesCalcStore(
        "t30ControllerCost",
        turbinesData.energyStore["T30 controller"]
      );
    } else {
      updateTurbinesCalcStore("t30ControllerCost", 0);
      updateTurbinesStore("batteryCapacity", 0);
    }
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
