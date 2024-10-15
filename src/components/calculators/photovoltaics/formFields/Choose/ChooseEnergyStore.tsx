import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

interface EnergyStoreData {
  energyStoreData?: Record<string, number>;
}
const ChooseEnergyStore = ({ energyStoreData }: EnergyStoreData) => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const choosedStore: { name: string; price: number } | null = e
      ? JSON.parse(e)
      : null;
    updatePhotovoltaic("energyStore", choosedStore);
  };

  const energyStore = energyStoreData
    ? Object.entries(energyStoreData).map(([key, value]) => {
        return {
          label: key,
          value: JSON.stringify({ name: key, price: value }),
        };
      })
    : [];

  return (
    <>
      {energyStoreData && photovoltaicStore.isEnergyStoreDotation && (
        <SelectComponent
          title="MAGAZYN ENERGII"
          onChange={handleChange}
          value={JSON.stringify(photovoltaicStore.energyStore)}
          data={energyStore}
        />
      )}
    </>
  );
};
export default memo(ChooseEnergyStore);
