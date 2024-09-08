import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const DotationCzystePowietrze = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) => {
    store.updatePhotovoltaic("isDotation_czpowietrze", e == "true");

    // Protection against activation 2 different dotations in the same time
    if (photovoltaicStore.isDotation_czpowietrze === false)
      store.updatePhotovoltaic("isDotation_mojprad", false);
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
