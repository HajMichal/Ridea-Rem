import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const data = [
  { value: "0", label: "0%" },
  { value: "0.12", label: "12%" },
  { value: "0.32", label: "32%" },
];

const ChooseTaxRelif = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("taxCredit", Number(e));

  return (
    <SelectComponent
      title="ULGA PODATKOWA"
      onChange={handleChange}
      value={photovoltaicStore.taxCredit}
      data={data}
    />
  );
};
export default memo(ChooseTaxRelif);
