import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsHybridInverter = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isInwerterChoosed", e == "true");
  return (
    <SelectComponent
      title="INWERTER HYBRYDOWY"
      onChange={handleChange}
      value={photovoltaicStore.isInwerterChoosed}
      data={YESNO}
    />
  );
};
export default memo(IsHybridInverter);
