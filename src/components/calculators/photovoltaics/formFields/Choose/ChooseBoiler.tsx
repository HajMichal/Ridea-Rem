import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const ChooseBoiler = () => {
  const { photovoltaicStore, photovoltaicData } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const choosedBoiler: { name: string; price: number } | null = e
      ? JSON.parse(e)
      : null;

    store.updatePhotovoltaic("cwuTank", choosedBoiler);
    store.updatePhotovoltaicCalcs("heatStoreCost", choosedBoiler?.price);
  };

  const boilers = photovoltaicData?.boilers
    ? Object.entries(photovoltaicData.boilers).map(([key, value]) => {
        return {
          label: key,
          value: JSON.stringify({ name: key, price: value }),
        };
      })
    : [];

  return (
    <>
      {photovoltaicStore.heatStoreDotation && (
        <SelectComponent
          title={"WIELKOŚĆ ZBIORNIKA CWU"}
          onChange={handleChange}
          value={JSON.stringify(photovoltaicStore.cwuTank)}
          data={boilers}
        />
      )}
    </>
  );
};
export default memo(ChooseBoiler);
