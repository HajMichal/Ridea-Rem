import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import useStore from "~/store";

const EnergyConsumption = () => {
  const store = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    store.updatePhotovoltaic(
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
        store.photovoltaicStore.recentYearTrendUsage === 0
          ? ""
          : store.photovoltaicStore.recentYearTrendUsage
      }
    />
  );
};
export default memo(EnergyConsumption);
