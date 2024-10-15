import { type ChangeEvent, memo, useEffect } from "react";
import { InputComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";
import { type TurbinesData } from "~/server/api/routers/turbines/interfaces";

type turbinesType =
  | "turbine500Count"
  | "turbine1000Count"
  | "turbine1500Count"
  | "turbine3000Count";
interface Turbines {
  turbines?: TurbinesData;
}
function Turbines({ turbines }: Turbines) {
  const {
    mutations,
    turbinesStore,
    updateTurbinesStore,
    updateTurbinesCalcStore,
  } = useTurbines();

  useEffect(() => {
    mutations.setTurbinesDetails({
      turbine500Count: turbinesStore.turbine500Count,
      turbine1000Count: turbinesStore.turbine1000Count,
      turbine1500Count: turbinesStore.turbine1500Count,
      turbine3000Count: turbinesStore.turbine3000Count,
    });
  }, [
    turbinesStore.turbine500Count,
    turbinesStore.turbine1000Count,
    turbinesStore.turbine1500Count,
    turbinesStore.turbine3000Count,
  ]);

  if (!turbines) return null;
  return (
    <div>
      {Object.entries(turbines).map(([key, value]) => {
        const storeKey = storeNameMap[key]!;
        const currentVal = turbinesStore[storeKey];

        if (storeKey === "turbine3000Count") return null;

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          let inputVal = e.target.valueAsNumber;
          if (Number.isNaN(inputVal) || inputVal < 0) inputVal = 0;

          updateTurbinesStore(storeKey, inputVal);
          updateTurbinesCalcStore(calcStoreNameMap[key]!, inputVal * value);
        };

        return (
          <InputComponent
            key={key}
            title={key}
            step={1}
            onChange={handleChange}
            value={currentVal}
          />
        );
      })}
    </div>
  );
}
export default memo(Turbines);

const storeNameMap: Record<string, turbinesType> = {
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
