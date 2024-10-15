import React from "react";
import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

interface BoilersType {
  boilersData?: Record<string, number>;
}
const ChooseBoiler = ({ boilersData }: BoilersType) => {
  const { photovoltaicStore, updatePhotovoltaic, updatePhotovoltaicCalcs } =
    usePhotovoltaic();

  const handleChange = (e: string | null) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const choosedBoiler: { name: string; price: number } | null = e
      ? JSON.parse(e)
      : null;

    updatePhotovoltaic("cwuTank", choosedBoiler);
    updatePhotovoltaicCalcs("heatStoreCost", choosedBoiler?.price);
  };

  const boilers = boilersData
    ? Object.entries(boilersData).map(([key, value]) => {
        return {
          label: key,
          value: JSON.stringify({ name: key, price: value }),
        };
      })
    : [];

  return (
    <>
      {photovoltaicStore.isHeatStore && (
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
