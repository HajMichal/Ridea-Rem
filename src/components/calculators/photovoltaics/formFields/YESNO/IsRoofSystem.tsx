import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsRoofSystem = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isRoofWeightSystem", e == "true");

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
