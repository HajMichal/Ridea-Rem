import { memo } from "react";
import { SelectComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

const Phases = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) => {
    const isThreePhases = e === "3";
    updateTurbinesStore("threePhases", isThreePhases);

    if (isThreePhases) updateTurbinesStore("isThreePhasesInverter", false);
    else updateTurbinesStore("isHybridInverter", false);
  };
  return (
    <SelectComponent
      title="ILOŚC FAZ U KLIENTA"
      value={turbinesStore.threePhases ? "3" : "1"}
      onChange={handleChange}
      data={["1", "3"]}
    />
  );
};
export default memo(Phases);
