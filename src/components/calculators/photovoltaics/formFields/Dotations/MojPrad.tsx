import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const DotationMojPrad = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) => {
    store.updatePhotovoltaic("isDotation_mojprad", e == "true");

    // Protection against activation 2 different dotations in the same time
    if (photovoltaicStore.isDotation_mojprad === false) {
      store.updatePhotovoltaic("isDotation_czpowietrze", false);
      store.updatePhotovoltaic("dotationStep_czpowietrze", "prog0");
    }
  };
  return (
    <SelectComponent
      title="KLIENT KWALIFIKUJE SIĘ DO PROGRAMU MÓJ PRĄD"
      onChange={handleChange}
      value={photovoltaicStore.isDotation_mojprad}
      data={YESNO}
    />
  );
};
export default memo(DotationMojPrad);
