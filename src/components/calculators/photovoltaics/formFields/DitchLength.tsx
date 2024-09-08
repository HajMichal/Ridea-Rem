import { type ChangeEvent, memo } from "react";
import { InputComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const DitchLength = () => {
  const { photovoltaicStore, photovoltaicData } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (value <= 0 || Number.isNaN(value)) {
      store.updatePhotovoltaic("ditchLength", 0);
      store.updatePhotovoltaicCalcs("ditchCost", 0);
    } else if (photovoltaicData?.addons) {
      const cost = e.target.valueAsNumber * photovoltaicData?.addons.przekopy;

      store.updatePhotovoltaic("ditchLength", e.target.valueAsNumber);
      store.updatePhotovoltaicCalcs("ditchCost", cost);
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
