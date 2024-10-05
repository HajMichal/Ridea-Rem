import { memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const EnergyPrice = () => {
  const { photovoltaicStore, mutations } = usePhotovoltaic();

  const store = useStore();

  const handleChange = (e: { target: { valueAsNumber: number } }) => {
    const value = e.target.valueAsNumber;
    if (value) {
      mutations.set_outOfLimit_price_trend(value);
    }
    store.updatePhotovoltaic(
      "energyPrice",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };

  return (
    <InputComponent
      title="CENA ENERGII"
      onChange={handleChange}
      // onChange={mutations.handleInLimitOnChange}
      step={0.1}
      value={
        photovoltaicStore.energyPrice === 0 ? "" : photovoltaicStore.energyPrice
      }
      // value={photovoltaicStore.energyPriceInLimit}
    />
  );
};
export default memo(EnergyPrice);
