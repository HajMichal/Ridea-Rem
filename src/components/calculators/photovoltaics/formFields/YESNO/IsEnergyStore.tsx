import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsEnergyStore = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isEnergyStoreDotation", e == "true");

  return (
    <SelectComponent
      title="MAGAZYN ENERGII"
      onChange={handleChange}
      value={photovoltaicStore.isEnergyStoreDotation}
      data={YESNO}
    />
  );
};
export default memo(IsEnergyStore);
