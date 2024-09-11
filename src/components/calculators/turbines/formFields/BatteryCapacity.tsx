import { memo } from "react";
import { SelectComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

const BatteryCapacity = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("batteryCapacity", Number(e));
  };

  return (
    <>
      {turbinesStore.isBatteryController && (
        <SelectComponent
          title="TRIPPLE T30 BATTERY - POJEMNOŚĆ"
          value={turbinesStore.batteryCapacity}
          onChange={handleChange}
          data={["0", "3", "6", "9", "12"]}
        />
      )}
    </>
  );
};
export default memo(BatteryCapacity);
