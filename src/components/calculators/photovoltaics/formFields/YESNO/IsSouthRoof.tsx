import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsSouthRoof = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("southRoof", e == "true");

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
