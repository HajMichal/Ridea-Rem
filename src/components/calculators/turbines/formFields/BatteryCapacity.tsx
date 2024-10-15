import { memo, useEffect } from "react";
import { SelectComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

interface BatteryCapacityType {
  batteries?: {
    trzy: number;
    szesc: number;
    dziewiec: number;
    dwanascie: number;
  };
}
const BatteryCapacity = ({ batteries }: BatteryCapacityType) => {
  const { turbinesStore, updateTurbinesStore, updateTurbinesCalcStore } =
    useTurbines();

  const getCapacityPrice = batteries && {
    0: 0,
    3: batteries.trzy,
    6: batteries.szesc,
    9: batteries.dziewiec,
    12: batteries.dwanascie,
  };

  useEffect(() => {
    if (getCapacityPrice) {
      updateTurbinesCalcStore(
        "batteryCost",
        getCapacityPrice[turbinesStore.batteryCapacity]
      );
    }
  }, [turbinesStore.batteryCapacity, batteries]);

  const handleChange = (e: string | null) =>
    updateTurbinesStore("batteryCapacity", Number(e));

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
