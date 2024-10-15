import { memo, useEffect } from "react";
import { SelectComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

interface MastTypeType {
  steelMasts?: {
    trzy: number;
    szesc: number;
    dziewiec: number;
    dwanascie: number;
  };
  strunobeton?: number;
}
const MastType = ({ steelMasts, strunobeton }: MastTypeType) => {
  const { turbinesStore, updateTurbinesStore, updateTurbinesCalcStore } =
    useTurbines();

  const steelMastsNameMapper = steelMasts && {
    "0": 0,
    "3": steelMasts.trzy,
    "6": steelMasts.szesc,
    "9": steelMasts.dziewiec,
    "12": steelMasts.dwanascie,
  };

  const handleChange = (e: string | null) => {
    updateTurbinesStore("mastType", e);

    if (strunobeton) {
      if (e === "strunobetonowy") {
        updateTurbinesStore("steelMast", 0);
        updateTurbinesCalcStore("mastCost", strunobeton);
      } else {
        updateTurbinesCalcStore("mastCost", 0);
      }
    }
  };

  const handleSteelMastChange = (e: string | null) =>
    updateTurbinesStore("steelMast", Number(e));

  useEffect(() => {
    if (steelMastsNameMapper && turbinesStore.steelMast !== 0) {
      updateTurbinesCalcStore(
        "mastCost",
        steelMastsNameMapper[turbinesStore.steelMast]
      );
    }
  }, [turbinesStore.steelMast]);

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

      {turbinesStore.mastFoundation && turbinesStore.mastType === "stalowy" && (
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
