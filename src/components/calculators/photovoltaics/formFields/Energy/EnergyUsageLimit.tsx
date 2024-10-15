import { memo, type ChangeEvent } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const EnergyUsageLimit = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleUsageLimit = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    updatePhotovoltaic(
      "usageLimit",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };
  return (
    <InputComponent
      title="LIMIT ZUŻYCIA"
      onChange={handleUsageLimit}
      step={500}
      value={
        photovoltaicStore.usageLimit === 0 ? "" : photovoltaicStore.usageLimit
      }
    />
  );
};
export default memo(EnergyUsageLimit);
