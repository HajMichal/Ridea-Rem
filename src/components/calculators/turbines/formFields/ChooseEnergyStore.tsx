import { memo } from "react";
import { SelectComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";
import { api } from "~/utils/api";

const ChooseEnergyStore = () => {
  const { updateTurbinesStore, turbinesStore } = useTurbines();
  const { data: avaivableEnergyStores } =
    api.dataFlow.getEnergyStoreData.useQuery();

  const handleChange = (e: string | null) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const choosedStore: { name: string; price: number } | null = e
      ? JSON.parse(e)
      : null;
    updateTurbinesStore("energyStore", choosedStore);
  };

  const energyStore = avaivableEnergyStores?.energyStore
    ? Object.entries(avaivableEnergyStores.energyStore).map(([key, value]) => {
        return {
          label: key,
          value: JSON.stringify({ name: key, price: value }),
        };
      })
    : [];

  return (
    <SelectComponent
      title="MAGAZYN ENERGII"
      onChange={handleChange}
      value={JSON.stringify(turbinesStore.energyStore)}
      data={[
        { label: "Nie", value: JSON.stringify({ name: "", price: 0 }) },
        ...energyStore,
      ]}
    />
  );
};
export default memo(ChooseEnergyStore);
