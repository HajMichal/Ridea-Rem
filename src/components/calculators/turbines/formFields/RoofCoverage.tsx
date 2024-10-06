import { type ChangeEvent, memo } from "react";
import { InputString } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

const RoofCoverage = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateTurbinesStore("roofCoverage", e.target.value);
  };

  return (
    <InputString
      onChange={handleChange}
      title="POKRYCIE DACHOWE"
      value={turbinesStore.roofCoverage}
    />
  );
};
export default memo(RoofCoverage);
