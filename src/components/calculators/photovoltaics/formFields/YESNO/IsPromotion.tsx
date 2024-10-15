import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsPromotion = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isPromotion", e == "true");

  return (
    <SelectComponent
      title="UWZGLĘDNIJ PROMOCJĘ"
      onChange={handleChange}
      value={photovoltaicStore.isPromotion}
      data={YESNO}
    />
  );
};
export default memo(IsPromotion);
