import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const data = [
  { value: "0.1", label: "10%" },
  { value: "0.2", label: "20%" },
  { value: "0.3", label: "30%" },
  { value: "0.4", label: "40%" },
  { value: "0.5", label: "50%" },
  { value: "0.6", label: "60%" },
  { value: "0.7", label: "70%" },
  { value: "0.8", label: "80%" },
];

const Autoconsumption = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("autoconsumptionInPercent", Number(e));

  return (
    <SelectComponent
      title="STOPIEŃ AUTOKONSUMPCJI ENERGII Z PV"
      onChange={handleChange}
      value={photovoltaicStore.autoconsumptionInPercent}
      data={data}
    />
  );
};
export default memo(Autoconsumption);
