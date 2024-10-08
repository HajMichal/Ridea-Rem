import React from "react";
import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";

const EstimatedDotationSum = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.valueAsNumber;
    if (Number.isNaN(value)) value = 0;
    updateTurbinesStore("estimatedDotationSum", value);
  };

  return (
    <>
      {!turbinesStore.isVat23 && (
        <InputComponent
          title="SZACUNKOWA SUMA DOTACJI"
          value={turbinesStore.estimatedDotationSum}
          step={1000}
          onChange={handleChange}
        />
      )}
    </>
  );
};
export default memo(EstimatedDotationSum);
