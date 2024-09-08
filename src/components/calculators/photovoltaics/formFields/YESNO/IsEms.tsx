import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsEms = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("emsDotation", e == "true");
  return (
    <SelectComponent
      title="EMS"
      onChange={handleChange}
      value={photovoltaicStore.emsDotation}
      data={YESNO}
    />
  );
};
export default memo(IsEms);
