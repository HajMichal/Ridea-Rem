import { memo, type ChangeEvent } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const EnergyUsageLimit = () => {
  const { photovoltaicStore } = usePhotovoltaic();

  const store = useStore();

  const handleUsageLimit = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    store.updatePhotovoltaic(
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
