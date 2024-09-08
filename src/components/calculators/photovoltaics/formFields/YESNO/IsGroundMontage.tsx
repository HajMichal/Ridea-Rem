import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsGroundMontage = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isGroundMontage", e == "true");

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
