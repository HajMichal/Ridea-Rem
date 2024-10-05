import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsHeatStore = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isHeatStore", e == "true");

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
