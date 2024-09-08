import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const Promotion = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    store.updatePhotovoltaic(
      "promotionAmount",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };

  return (
    <InputComponent
      title="PROMOCJA"
      onChange={handleChange}
      step={100}
      value={photovoltaicStore.promotionAmount}
    />
  );
};
export default memo(Promotion);
