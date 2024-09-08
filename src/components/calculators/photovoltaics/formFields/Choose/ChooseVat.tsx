import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const ChooseVat = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("vat23", e == "true");

  return (
    <SelectComponent
      title="MONTAŻ NA FIRMĘ"
      value={photovoltaicStore.vat23}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(ChooseVat);
