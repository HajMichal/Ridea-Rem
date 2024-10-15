import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const ChooseVat = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("vat23", e == "true");

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
