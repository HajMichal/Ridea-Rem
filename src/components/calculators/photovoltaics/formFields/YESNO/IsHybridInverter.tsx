import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

interface HybridInverterType {
  price?: number;
}
const IsHybridInverter = ({ price }: HybridInverterType) => {
  const { photovoltaicStore, updatePhotovoltaic, updatePhotovoltaicCalcs } =
    usePhotovoltaic();

  const handleChange = (e: string | null) => {
    updatePhotovoltaic("isInwerterChoosed", e == "true");
    if (price) {
      updatePhotovoltaicCalcs("hybridInwerter_price", e == "true" ? price : 0);
    }
  };

  return (
    <SelectComponent
      title="INWERTER HYBRYDOWY"
      onChange={handleChange}
      value={photovoltaicStore.isInwerterChoosed}
      data={YESNO}
    />
  );
};
export default memo(IsHybridInverter);
