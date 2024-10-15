import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import {
  largestPanel,
  mediumPanel,
  smallestPanel,
} from "~/constans/panelPowers";

const data = [
  {
    value: smallestPanel.toString(),
    label: `${smallestPanel}W DASSOLAR`,
  },
  {
    value: mediumPanel.toString(),
    label: `${mediumPanel}W NORD DASSOLAR`,
  },
  { value: largestPanel.toString(), label: `${largestPanel}W` },
];

const ChooseSolar = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("panelPower", Number(e));

  return (
    <SelectComponent
      title="MOC POJEDYŃCZEGO PANELA W KW"
      onChange={handleChange}
      value={photovoltaicStore.panelPower}
      data={data}
    />
  );
};
export default memo(ChooseSolar);
