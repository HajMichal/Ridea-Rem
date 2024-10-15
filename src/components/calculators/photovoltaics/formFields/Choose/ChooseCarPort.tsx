import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { type CarPort } from "~/server/api/routers/photovoltaic/interfaces";

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

interface CarPortType {
  carPort?: CarPort;
}
const ChooseCarPort = ({ carPort }: CarPortType) => {
  const { photovoltaicStore, updatePhotovoltaic, updatePhotovoltaicCalcs } =
    usePhotovoltaic();

  const handleChange = (e: string | null) => {
    updatePhotovoltaic("choosedCarPort", String(e));
    if (carPort) {
      const carPortCost =
        photovoltaicStore.choosedCarPort !== "0_stan"
          ? carPort[photovoltaicStore.choosedCarPort]
          : 0;
      updatePhotovoltaicCalcs("carPortCost", carPortCost);
    }
  };

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
