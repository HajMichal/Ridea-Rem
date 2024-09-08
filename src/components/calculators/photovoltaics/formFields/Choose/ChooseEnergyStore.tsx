import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const ChooseEnergyStore = () => {
  const { photovoltaicStore, photovoltaicData } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const choosedStore: { name: string; price: number } | null = e
      ? JSON.parse(e)
      : null;
    store.updatePhotovoltaic("energyStore", choosedStore);
  };

  const energyStore = photovoltaicData?.energyStore
    ? Object.entries(photovoltaicData.energyStore).map(([key, value]) => {
        return {
          label: key,
          value: JSON.stringify({ name: key, price: value }),
        };
      })
    : [];

  return (
    <>
      {photovoltaicData?.energyStore &&
        photovoltaicStore.isEnergyStoreDotation && (
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
