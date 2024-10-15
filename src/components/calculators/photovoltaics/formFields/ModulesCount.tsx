import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const ModulesCount = () => {
  const { photovoltaicStore: pvStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    updatePhotovoltaic(
      "modulesCount",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };

  return (
    <InputComponent
      title="LICZBA MODUŁÓW"
      onChange={handleChange}
      step={1}
      value={pvStore.modulesCount === 0 ? "" : pvStore.modulesCount}
    />
  );
};
export default memo(ModulesCount);
