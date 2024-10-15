import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsRoofSystem = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isRoofWeightSystem", e == "true");

  return (
    <>
      {!photovoltaicStore.isGroundMontage && (
        <SelectComponent
          title="SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY"
          onChange={handleChange}
          value={photovoltaicStore.isRoofWeightSystem}
          data={YESNO}
        />
      )}
    </>
  );
};
export default memo(IsRoofSystem);
