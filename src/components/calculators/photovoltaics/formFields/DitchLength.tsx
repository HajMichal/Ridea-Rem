import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

interface DitchLengthType {
  price?: number;
}
const DitchLength = ({ price }: DitchLengthType) => {
  const { photovoltaicStore, updatePhotovoltaic, updatePhotovoltaicCalcs } =
    usePhotovoltaic();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (value <= 0 || Number.isNaN(value)) {
      updatePhotovoltaic("ditchLength", 0);
      updatePhotovoltaicCalcs("ditchCost", 0);
    } else if (price) {
      const cost = e.target.valueAsNumber * price;

      updatePhotovoltaic("ditchLength", e.target.valueAsNumber);
      updatePhotovoltaicCalcs("ditchCost", cost);
    }
  };

  return (
    <>
      {photovoltaicStore.isGroundMontage && !photovoltaicStore.isDitch && (
        <InputComponent
          title="DŁUGOŚĆ PRZEKOPU"
          onChange={handleChange}
          step={1}
          value={
            photovoltaicStore.ditchLength == 0
              ? ""
              : photovoltaicStore.ditchLength
          }
        />
      )}
    </>
  );
};
export default memo(DitchLength);
