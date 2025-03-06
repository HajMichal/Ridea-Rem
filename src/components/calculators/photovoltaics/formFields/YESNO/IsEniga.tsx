import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsEniga = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isEniga", e == "true");

  return (
    <SelectComponent
      title="PSTRYK ENERGIA"
      value={photovoltaicStore.isEniga}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(IsEniga);
