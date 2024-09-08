import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsPromotion = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isPromotion", e == "true");

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
