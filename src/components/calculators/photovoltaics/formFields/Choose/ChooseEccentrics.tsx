import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const data = [
  { label: "Nie", value: "None" },
  { label: "EKIERKI STANDARDOWE", value: "standardEccentrics" },
  {
    label: "EKIERKI CERTYFIKOWANE",
    value: "certifiedEccentrics",
  },
];
const ChooseEccentrics = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("eccentrics", e);
  return (
    <>
      {!photovoltaicStore.isGroundMontage && (
        <SelectComponent
          title="EKIERKI STANDARDOWE / CERTYFIKOWANE"
          onChange={handleChange}
          value={photovoltaicStore.eccentrics}
          data={data}
        />
      )}
    </>
  );
};
export default memo(ChooseEccentrics);
