import { memo } from "react";
import { SelectComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

const data = ["0", "1", "2", "3", "4", "5", "6"];
function Turbines() {
  const {
    turbinesData,
    turbinesStore,
    updateTurbinesStore,
    updateTurbinesCalcStore,
  } = useTurbines();

  if (!turbinesData?.turbines) return null;
  return (
    <div>
      {Object.entries(turbinesData.turbines).map(([key, value]) => {
        const storeKey = storeNameMap[key]!;
        const currentVal =
          turbinesStore[storeKey as keyof typeof turbinesStore];

        const handleChange = (e: string | null) => {
          updateTurbinesStore(storeKey, Number(e));
          updateTurbinesCalcStore(calcStoreNameMap[key]!, Number(e) * value);
        };
        return (
          <SelectComponent
            key={key}
            title={key}
            onChange={handleChange}
            value={currentVal}
            data={data}
          />
        );
      })}
    </div>
  );
}
export default memo(Turbines);

const storeNameMap: Record<string, string> = {
  "turbina 500": "turbine500Count",
  "turbina 1000": "turbine1000Count",
  "turbina 1500": "turbine1500Count",
  "turbina 3000": "turbine3000Count",
};
const calcStoreNameMap: Record<string, string> = {
  "turbina 500": "turbine500Cost",
  "turbina 1000": "turbine1000Cost",
  "turbina 1500": "turbine1500Cost",
  "turbina 3000": "turbine3000Cost",
};
