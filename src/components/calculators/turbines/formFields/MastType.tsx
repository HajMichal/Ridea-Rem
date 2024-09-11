import { memo } from "react";
import { SelectComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

const MastType = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) => {
    updateTurbinesStore("mastType", e);

    if (e !== "stalowy") {
      updateTurbinesStore("steelMast", 0);
    }
  };

  const handleSteelMastChange = (e: string | null) =>
    updateTurbinesStore("steelMast", Number(e));

  return (
    <>
      {turbinesStore.mastFoundation && (
        <SelectComponent
          title="RODZAJ MASZTU"
          value={turbinesStore.mastType}
          onChange={handleChange}
          data={["strunobetonowy", "stalowy"]}
        />
      )}

      {turbinesStore.mastType === "stalowy" && (
        <SelectComponent
          title="MASZT STALOWY"
          value={turbinesStore.steelMast}
          onChange={handleSteelMastChange}
          data={["0", "3", "6", "9", "12"]}
        />
      )}
    </>
  );
};
export default memo(MastType);
