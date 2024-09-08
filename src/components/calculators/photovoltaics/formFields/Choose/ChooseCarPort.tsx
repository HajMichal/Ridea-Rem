import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const data = [
  { value: "0_stan", label: "BRAK" },
  { value: "stan1", label: "1 STAN. 10 MODUŁÓW" },
  { value: "stan2", label: "2 STAN. 15 MODUŁÓW" },
  { value: "stan4", label: "4 STAN. 30 MODUŁÓW" },
  { value: "stan6", label: "6 STAN. 45 MODUŁÓW" },
  { value: "stan8", label: "8 STAN. 60 MODUŁÓW" },
  { value: "stan10", label: "10 STAN. 75 MODUŁÓW" },
  { value: "stan12", label: "12 STAN. 90 MODUŁÓW" },
];

const ChooseCarPort = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("choosedCarPort", String(e));

  return (
    <>
      {photovoltaicStore.isCarPort && (
        <SelectComponent
          title="WIELKOŚĆ CAR PORTU"
          onChange={handleChange}
          value={photovoltaicStore.choosedCarPort}
          data={data}
        />
      )}
    </>
  );
};
export default memo(ChooseCarPort);
