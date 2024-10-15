import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsDitching = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("isDitch", e == "true");
  return (
    <>
      {photovoltaicStore.isGroundMontage && (
        <SelectComponent
          title="PRZEKOP W ZAKRESIE KLIENTA"
          onChange={handleChange}
          value={photovoltaicStore.isDitch}
          data={YESNO}
        />
      )}
    </>
  );
};
export default memo(IsDitching);
