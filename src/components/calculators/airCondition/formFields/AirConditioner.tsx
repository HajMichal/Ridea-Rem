import React from "react";
import { SelectComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";
import { type AirConditionData } from "~/server/api/routers/airCondition/interfaces";

export const AirConditioner = () => {
  const { calcData, airConditionStore } = useAirCondition();

  const store = useStore();

  const airConditioners =
    calcData?.airConditioners &&
    Object.entries(calcData.airConditioners).map(([key, value]) => key);
  // const airConditioners = calcData?.airConditioners.map((item) => item.type);

  const updateAirConditioner = (airConditioner: string | null) => {
    const availableAirConditioners = calcData?.airConditioners;
    if (!availableAirConditioners) return;

    const choosedAirConditioner = airConditioners?.find(
      (item) => item === airConditioner
    );
    if (!choosedAirConditioner) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const airConditionerDetails: AirConditionData =
      availableAirConditioners[choosedAirConditioner]!;

    store.updateAirCondition("choosedAirConditioner", {
      ...airConditionerDetails,
      type: choosedAirConditioner,
    });
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
