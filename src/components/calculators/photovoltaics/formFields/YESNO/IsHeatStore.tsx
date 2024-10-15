import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsHeatStore = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isHeatStore", e == "true");

  return (
    <SelectComponent
      title="MAGAZYN CIEPŁA"
      onChange={handleChange}
      value={photovoltaicStore.isHeatStore}
      data={YESNO}
    />
  );
};
export default memo(IsHeatStore);
