import { memo, type ChangeEvent } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

interface CablesACType {
  price?: number;
}
const CablesAC = ({ price }: CablesACType) => {
  const { photovoltaicStore, updatePhotovoltaicCalcs, updatePhotovoltaic } =
    usePhotovoltaic();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;

    if (value <= 0 || Number.isNaN(value)) {
      updatePhotovoltaic("cableAC", 0);
      updatePhotovoltaicCalcs("cableACCost", 0);
    } else if (price) {
      updatePhotovoltaic("cableAC", value);

      const finallPrice = e.target.valueAsNumber * price;
      updatePhotovoltaicCalcs("cableACCost", finallPrice);
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
