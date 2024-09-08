import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const Installments = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    store.updatePhotovoltaic(
      "installmentNumber",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };

  return (
    <InputComponent
      title="LICZBA RAT"
      onChange={handleChange}
      step={10}
      value={photovoltaicStore.installmentNumber}
    />
  );
};
export default memo(Installments);
