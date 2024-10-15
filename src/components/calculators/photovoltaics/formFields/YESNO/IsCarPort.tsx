import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsCarPort = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isCarPort", e == "true");

  return (
    <SelectComponent
      title="CAR PORT"
      onChange={handleChange}
      value={photovoltaicStore.isCarPort}
      data={YESNO}
    />
  );
};
export default memo(IsCarPort);
