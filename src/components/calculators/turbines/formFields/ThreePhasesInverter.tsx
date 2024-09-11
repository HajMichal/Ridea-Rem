import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const ThreePhasesInverter = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("threePhasesInverter", e == "true");

    if (e != "true") {
      updateTurbinesStore("isHybridInverter", false);
    }
  };

  return (
    <>
      {!turbinesStore.threePhases && (
        <SelectComponent
          title="DOPŁATA DO INWERTERA 3 FAZOWEGO"
          value={turbinesStore.threePhasesInverter}
          onChange={handleChange}
          data={YESNO}
        />
      )}
    </>
  );
};
export default memo(ThreePhasesInverter);
