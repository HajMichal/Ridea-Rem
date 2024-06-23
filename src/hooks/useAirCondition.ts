import { useSession } from "next-auth/react";
import { type AirConditionDataToCalculation } from "~/server/api/routers/airCondition/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

export const useAirCondition = () => {
  const store = useStore();
  const { data: sessionData } = useSession();

  const {
    airConditionStore,
    airConditionCalcStore,
    updateAirConditionCalculation,
  } = store;
  const { data: jsonData } =
    api.airConditionDataFlowRouter.downloadFile.useQuery<AirConditionDataToCalculation>(
      sessionData?.user.id
    );

  const { mutate: setCopperPipePrice } =
    api.airCondition.setCopperPipePrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("copperPipePrice", data);
      },
    });

  return {
    jsonData: jsonData,
    airConditionStore: airConditionStore,
    airConditionCalcStore: airConditionCalcStore,
    mutations: {
      setCopperPipePrice,
    },
  };
};
