import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const EnergyConsumption = () => {
  const { updatePhotovoltaic, photovoltaicStore } = usePhotovoltaic();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    updatePhotovoltaic(
      "recentYearTrendUsage",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };

  return (
    <InputComponent
      title="ILOŚĆ ENERGII ZUŻYWANEJ ŚREDNIO ROCZNIE"
      onChange={handleChange}
      step={500}
      value={
        photovoltaicStore.recentYearTrendUsage === 0
          ? ""
          : photovoltaicStore.recentYearTrendUsage
      }
    />
  );
};
export default memo(EnergyConsumption);
