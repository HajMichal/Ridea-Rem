import React from "react";
import { SelectComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import { type AirConditionData } from "~/server/api/routers/airCondition/interfaces";

interface AirConditionerType {
  airConditionersData?: Record<string, AirConditionData>;
}
export const AirConditioner = ({ airConditionersData }: AirConditionerType) => {
  const { airConditionStore, updateAirCondition } = useAirCondition();

  const airConditioners =
    airConditionersData &&
    Object.entries(airConditionersData).map(([key]) => key);

  const updateAirConditioner = (airConditioner: string | null) => {
    if (!airConditionersData) return;

    const choosedAirConditioner = airConditioners?.find(
      (item) => item === airConditioner
    );
    if (!choosedAirConditioner) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const airConditionerDetails: AirConditionData =
      airConditionersData[choosedAirConditioner]!;

    updateAirCondition("choosedAirConditioner", {
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
