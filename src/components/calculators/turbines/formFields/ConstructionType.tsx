import { type ChangeEvent, memo } from "react";
import { InputString } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

const ConstructionType = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateTurbinesStore("roofConstruction", e.target.value);
  };

  return (
    <InputString
      onChange={handleChange}
      title="KONSTRUKCJA (KROKWIA, BETON)"
      value={turbinesStore.roofConstruction}
    />
  );
};
export default memo(ConstructionType);
