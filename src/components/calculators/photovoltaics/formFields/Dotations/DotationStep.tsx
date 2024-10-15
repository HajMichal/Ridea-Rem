import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const data = [
  { label: "PRÓG 0", value: "prog0" },
  { label: "PRÓG 1", value: "prog1" },
  { label: "PRÓG 2", value: "prog2" },
  { label: "PRÓG 3", value: "prog3" },
];

const DotationStep = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("dotationStep_czpowietrze", String(e));
  return (
    <>
      {photovoltaicStore.isDotation_czpowietrze && (
        <SelectComponent
          title="DOTACJA"
          onChange={handleChange}
          value={photovoltaicStore.dotationStep_czpowietrze}
          data={data}
        />
      )}
    </>
  );
};
export default memo(DotationStep);
