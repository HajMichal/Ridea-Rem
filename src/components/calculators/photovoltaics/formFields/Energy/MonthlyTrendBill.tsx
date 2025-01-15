import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const MonthlyTrendBill = () => {
  const { updatePhotovoltaic, photovoltaicStore } = usePhotovoltaic();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    updatePhotovoltaic(
      "monthlyBill",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };

  return (
    <InputComponent
      title="DOTYCHCZASOWY RACHUNEK"
      onChange={handleChange}
      step={250}
      value={
        photovoltaicStore.monthlyBill === 0 ? "" : photovoltaicStore.monthlyBill
      }
    />
  );
};
export default memo(MonthlyTrendBill);
