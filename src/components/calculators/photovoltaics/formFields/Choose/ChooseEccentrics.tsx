import { memo } from "react";
import { SelectComponent } from "~/components";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const data = [
  { label: "Nie", value: "None" },
  { label: "EKIERKI STANDARDOWE", value: "standardEccentrics" },
  {
    label: "EKIERKI CERTYFIKOWANE",
    value: "certifiedEccentrics",
  },
];
const ChooseEccentrics = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("eccentrics", e);
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
