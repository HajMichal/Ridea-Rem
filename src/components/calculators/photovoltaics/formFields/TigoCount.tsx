import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const TigoCount = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    store.updatePhotovoltaic(
      "tigoCount",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };

  return (
    <InputComponent
      title="OPTYMALIZATORY TIGO DO ZACIEMNIONYCH MODUŁÓW"
      onChange={handleChange}
      step={1}
      value={
        photovoltaicStore.tigoCount == 0 ? "" : photovoltaicStore.tigoCount
      }
    />
  );
};
export default memo(TigoCount);
