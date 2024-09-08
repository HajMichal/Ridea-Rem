import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsSouthRoof = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("southRoof", e == "true");

  return (
    <>
      {!photovoltaicStore.isGroundMontage && (
        <SelectComponent
          title="DACH SKIEROWANY NA POŁUDNIE"
          onChange={handleChange}
          value={photovoltaicStore.southRoof}
          data={YESNO}
        />
      )}
    </>
  );
};
export default memo(IsSouthRoof);
