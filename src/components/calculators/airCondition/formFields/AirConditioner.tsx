import React from "react";
import { SelectComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import { airConditionMapper } from "~/mappers/airCondition";
import useStore from "~/store";

export const AirConditioner = () => {
  const { jsonData, airConditionStore } = useAirCondition();

  const store = useStore();

  const airConditioners = jsonData?.airConditioner.map((item) => item.type);

  const updateAirConditioner = (airConditioner: string | null) => {
    const choosedAirConditioner = jsonData?.airConditioner.find(
      (item) => item.type === airConditioner && airConditionMapper(item)
    );
    if (!choosedAirConditioner) return;
    store.updateAirCondition("choosedAirConditioner", choosedAirConditioner);
  };

  return (
    <SelectComponent
      title="KLIMATYZATOR"
      onChange={(e) => updateAirConditioner(e)}
      value={airConditionStore.choosedAirConditioner?.type ?? null}
      data={airConditioners ? airConditioners : []}
    />
  );
};
