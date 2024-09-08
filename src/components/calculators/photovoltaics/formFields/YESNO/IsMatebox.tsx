import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsMatebox = () => {
  const { photovoltaicStore, photovoltaicData } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) => {
    store.updatePhotovoltaic("isMatebox", e == "true");
    store.updatePhotovoltaicCalcs(
      "mateboxCost",
      e == "true" ? photovoltaicData?.addons.matebox : 0
    );
  };

  return (
    <>
      {photovoltaicStore.isEnergyStoreDotation ||
        (photovoltaicStore.isInwerterChoosed && (
          <SelectComponent
            title="MATEBOX"
            onChange={handleChange}
            value={photovoltaicStore.isMatebox}
            data={YESNO}
          />
        ))}
    </>
  );
};
export default memo(IsMatebox);
