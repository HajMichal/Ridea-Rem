import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsGroundMontage = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isGroundMontage", e == "true");

  return (
    <SelectComponent
      title="MONTAŻ NA GRUNCIE"
      onChange={handleChange}
      value={photovoltaicStore.isGroundMontage}
      data={YESNO}
    />
  );
};
export default memo(IsGroundMontage);
