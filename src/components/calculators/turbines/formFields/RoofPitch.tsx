import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components/InputComponent";
import { useTurbines } from "~/hooks/useTurbines";

const RoofPitch = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.valueAsNumber;
    if (Number.isNaN(value) || value < 0) value = 0;
    updateTurbinesStore("roofPitch", value);
  };

  return (
    <InputComponent
      onChange={handleChange}
      title="KĄT NACHYLENIA DACHU"
      value={turbinesStore.roofPitch}
      step={5}
    />
  );
};
export default memo(RoofPitch);
