import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsDitching = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("isDitch", e == "true");
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
