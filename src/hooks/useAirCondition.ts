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
  const { mutate: setCopperCable15Price } =
    api.airCondition.setCopperCable15Price.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("copperCable15Price", data);
      },
    });
  const { mutate: setCopperCable16Price } =
    api.airCondition.setCopperCable16Price.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("copperCable16Price", data);
      },
    });
  const { mutate: setDashPipePrice } =
    api.airCondition.setDashPipePrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("dashPipePrice", data);
      },
    });
  const { mutate: setAirConditionerSupportPrice } =
    api.airCondition.setAirConditionerSupportPrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("airConditionerSupportPrice", data);
      },
    });
  const { mutate: setGutterPrice } =
    api.airCondition.setGutterPrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("gutterPrice", data);
      },
    });
  const { mutate: setPipeConnectorPrice } =
    api.airCondition.setPipeConnectorPrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("pipeConnectorPrice", data);
      },
    });
  const { mutate: setElasticPipePrice } =
    api.airCondition.setElasticPipePrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("elasticPipePrice", data);
      },
    });
  const { mutate: setTapePrice } = api.airCondition.setTapePrice.useMutation({
    onSuccess: (data) => {
      updateAirConditionCalculation("tapePrice", data);
    },
  });
  const { mutate: setWallPassPrice } =
    api.airCondition.setWallPassPrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("wallPassPrice", data);
      },
    });
  const { mutate: setAddonSum } = api.airCondition.setAddonSum.useMutation({
    onSuccess: (data) => {
      updateAirConditionCalculation("addonsSumPrice", data);
    },
  });
  const { mutate: setInstallationPrice } =
    api.airCondition.setInstallationPrice.useMutation({
      onSuccess: (data) => {
        updateAirConditionCalculation("installationPricing", data);
      },
    });

  return {
    jsonData: jsonData,
    airConditionStore: airConditionStore,
    airConditionCalcStore: airConditionCalcStore,
    mutations: {
      setCopperPipePrice,
      setCopperCable15Price,
      setCopperCable16Price,
      setDashPipePrice,
      setAirConditionerSupportPrice,
      setGutterPrice,
      setPipeConnectorPrice,
      setElasticPipePrice,
      setTapePrice,
      setWallPassPrice,
      setAddonSum,
      setInstallationPrice,
    },
  };
};
