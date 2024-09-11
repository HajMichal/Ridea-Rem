import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useTurbines } from "~/hooks/useTurbines";

const Matebox = () => {
  const { turbinesStore, updateTurbinesStore } = useTurbines();

  const handleChange = (e: string | null) =>
    updateTurbinesStore("isMatebox", e == "true");

  return (
    <SelectComponent
      title="MATE BOX"
      value={turbinesStore.isMatebox}
      onChange={handleChange}
      data={YESNO}
    />
  );
};
export default memo(Matebox);
