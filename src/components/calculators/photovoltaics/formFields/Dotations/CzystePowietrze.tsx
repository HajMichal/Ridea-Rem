import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const DotationCzystePowietrze = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) => {
    updatePhotovoltaic("isDotation_czpowietrze", e == "true");

    // Protection against activation 2 different dotations in the same time
    if (photovoltaicStore.isDotation_czpowietrze === false)
      updatePhotovoltaic("isDotation_mojprad", false);
  };
  return (
    <SelectComponent
      title="KLIENT KWALIFIKUJE SIĘ DO PROGRAMU CZYSTE POWIETRZE"
      onChange={handleChange}
      value={photovoltaicStore.isDotation_czpowietrze}
      data={YESNO}
    />
  );
};
export default memo(DotationCzystePowietrze);
