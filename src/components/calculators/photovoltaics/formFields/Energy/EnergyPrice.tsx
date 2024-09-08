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
      "energyPriceOutOfLimit",
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
        photovoltaicStore.energyPriceOutOfLimit === 0
          ? ""
          : photovoltaicStore.energyPriceOutOfLimit
      }
      // value={photovoltaicStore.energyPriceInLimit}
    />
  );
  {
    /* <InputComponent
    title="CENA ENERGII"
    onChange={mutations.handleOutOfLimitOnChange}
    // onChange={mutations.handleInLimitOnChange}
    step={0.1}
    value={photovoltaicStore.energyPriceOutOfLimit}
    // value={photovoltaicStore.energyPriceInLimit}
    /> */
  }
  {
    /* <InputComponent
    title="POZA LIMICIE"
    onChange={mutations.handleOutOfLimitOnChange}
    step={0.1}
    value={photovoltaicStore.energyPriceOutOfLimit}
    /> */
  }
};
export default memo(EnergyPrice);
