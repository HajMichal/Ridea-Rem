import { useSession } from "next-auth/react";
import { type AirConditionDataToCalculation } from "~/server/api/routers/airCondition/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

export const useAirCondition = () => {
  const store = useStore();
  const { data: sessionData } = useSession();

  const { airConditionStore, airConditionCalcStore } = store;
  const { data: jsonData } =
    api.airConditionDataFlowRouter.downloadFile.useQuery<AirConditionDataToCalculation>(
      sessionData?.user.id
    );

  return {
    jsonData: jsonData,
    airConditionSlice: airConditionStore,
    airConditionCalcSlice: airConditionCalcStore,
    mutations: {},
  };
};
