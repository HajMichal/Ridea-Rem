import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsEnergyStore = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isEnergyStoreDotation", e == "true");

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
