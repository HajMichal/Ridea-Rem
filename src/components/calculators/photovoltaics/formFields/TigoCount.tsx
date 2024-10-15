import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const TigoCount = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    updatePhotovoltaic(
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
