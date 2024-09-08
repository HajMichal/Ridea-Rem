import { memo, type ChangeEvent } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const CablesAC = () => {
  const { photovoltaicStore, photovoltaicData } = usePhotovoltaic();

  const store = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;

    if (value <= 0 || Number.isNaN(value)) {
      store.updatePhotovoltaic("cableAC", 0);
      store.updatePhotovoltaicCalcs("cableACCost", 0);
    } else if (photovoltaicData?.addons) {
      store.updatePhotovoltaic("cableAC", value);

      const price = e.target.valueAsNumber * photovoltaicData.addons.kableAC;
      store.updatePhotovoltaicCalcs("cableACCost", price);
    }
  };

  return (
    <InputComponent
      title="DŁUGOŚĆ PRZEWODU AC NAD STAN"
      onChange={handleChange}
      step={1}
      value={photovoltaicStore.cableAC === 0 ? "" : photovoltaicStore.cableAC}
    />
  );
};
export default memo(CablesAC);
