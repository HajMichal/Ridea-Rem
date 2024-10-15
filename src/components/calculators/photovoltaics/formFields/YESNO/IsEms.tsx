import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsEms = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("emsDotation", e == "true");
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
