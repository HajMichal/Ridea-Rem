import { useEffect } from "react";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export function AirConditionMutations() {
  const {
    sessionData,
    calcData,
    mutations,
    airConditionStore,
    airConditionCalcStore,
  } = useAirCondition();
  const store = useStore();

  useEffect(() => {
    if (calcData?.addons)
      mutations.setAddonSum({
        copperPipePrice: airConditionCalcStore.copperPipePrice,
        copperCable15Price: airConditionCalcStore.copperCable15Price,
        copperCable16Price: airConditionCalcStore.copperCable16Price,
        dashPipePrice: airConditionCalcStore.dashPipePrice,
        airConditionSupportPrice:
          airConditionCalcStore.airConditionerSupportPrice,
        gutterPrice: airConditionCalcStore.gutterPrice,
        pipeConnectorPrice: airConditionCalcStore.pipeConnectorPrice,
        elasticPipePrice: airConditionCalcStore.elasticPipePrice,
        tapePrice: airConditionCalcStore.tapePrice,
        wallPassPrice: airConditionCalcStore.wallPassPrice,
        montagePrice: calcData?.addons.montage,
        syfonPrice: airConditionCalcStore.syfonPrice,
        dashPumpPrice: airConditionCalcStore.dashPump,
        officeProvision: airConditionCalcStore.officeProvision.officeProvision,
      });
  }, [
    airConditionCalcStore.copperPipePrice,
    airConditionCalcStore.copperCable15Price,
    airConditionCalcStore.copperCable16Price,
    airConditionCalcStore.dashPipePrice,
    airConditionCalcStore.airConditionerSupportPrice,
    airConditionCalcStore.gutterPrice,
    airConditionCalcStore.pipeConnectorPrice,
    airConditionCalcStore.elasticPipePrice,
    airConditionCalcStore.tapePrice,
    airConditionCalcStore.wallPassPrice,
    airConditionCalcStore.syfonPrice,
    airConditionCalcStore.dashPump,
    airConditionCalcStore.officeProvision,
    airConditionStore.consultantMarkup,
  ]);
  useEffect(() => {
    if (sessionData?.user) {
      mutations.setOfficeProvision({
        officeFee: sessionData.user.imposedFeeAirCondition,
        creatorId: sessionData.user.creatorId ?? undefined,
        consultantMarkup: airConditionStore.consultantMarkup,
        hasUserContract: store.hasContract,
      });
    }
  }, [
    sessionData?.user,
    airConditionStore.consultantMarkup,
    store.hasContract,
  ]);

  useEffect(() => {
    if (airConditionStore.choosedAirConditioner) {
      mutations.setInstallationPrice({
        addonsSumPrice: airConditionCalcStore.addonsSumPrice,
        airConditionerPrice: airConditionStore.choosedAirConditioner?.price,
      });
    }
  }, [
    airConditionCalcStore.addonsSumPrice,
    airConditionStore.choosedAirConditioner,
  ]);
}
