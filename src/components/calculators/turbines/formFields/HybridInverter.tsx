import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const HybridInverter = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) =>
    updateTurbinesStore("isHybridInverter", e == "true");

  return (
    <>
      {(turbinesStore.threePhases || turbinesStore.threePhasesInverter) && (
        <SelectComponent
          title="DOPŁATA DO INWERTERA HYBRYDOWEGO"
          value={turbinesStore.isHybridInverter}
          onChange={handleChange}
          data={YESNO}
        />
      )}
    </>
  );
};
export default memo(HybridInverter);
