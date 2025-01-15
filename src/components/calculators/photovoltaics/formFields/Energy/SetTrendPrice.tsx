import { memo, type ChangeEvent } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const SetTrendPrice = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleTrendPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    updatePhotovoltaic(
      "trendPrice",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };
  return (
    <InputComponent
      title="CENA PRĄDU"
      onChange={handleTrendPrice}
      step={0.1}
      value={
        photovoltaicStore.trendPrice === 0 ? "" : photovoltaicStore.trendPrice
      }
    />
  );
};
export default memo(SetTrendPrice);
