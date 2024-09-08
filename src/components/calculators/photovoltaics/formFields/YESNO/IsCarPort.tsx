import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsCarPort = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isCarPort", e == "true");

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
