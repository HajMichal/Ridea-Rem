import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const DotationMojPrad = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) => {
    updatePhotovoltaic("isDotation_mojprad", e == "true");

    // Protection against activation 2 different dotations in the same time
    if (photovoltaicStore.isDotation_mojprad === false) {
      updatePhotovoltaic("isDotation_czpowietrze", false);
      updatePhotovoltaic("dotationStep_czpowietrze", "prog0");
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
