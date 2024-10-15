import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

interface MateboxType {
  price?: number;
}
const IsMatebox = ({ price }: MateboxType) => {
  const { photovoltaicStore, updatePhotovoltaic, updatePhotovoltaicCalcs } =
    usePhotovoltaic();

  const handleChange = (e: string | null) => {
    updatePhotovoltaic("isMatebox", e == "true");
    updatePhotovoltaicCalcs("mateboxCost", e == "true" ? price : 0);
  };

  return (
    <>
      {photovoltaicStore.isEnergyStoreDotation ||
        (photovoltaicStore.isInwerterChoosed && (
          <SelectComponent
            title="MATEBOX"
            onChange={handleChange}
            value={photovoltaicStore.isMatebox}
            data={YESNO}
          />
        ))}
    </>
  );
};
export default memo(IsMatebox);
