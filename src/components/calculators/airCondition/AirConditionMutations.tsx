import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { useAirCondition } from "~/hooks/useAirCondition";

export function AirConditionMutations() {
  const { jsonData, mutations, airConditionStore, airConditionCalcStore } =
    useAirCondition();

  useEffect(() => {
    if (jsonData?.addons)
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
        montagePrice: jsonData?.addons.montage,
        syfonPrice: airConditionCalcStore.syfonPrice,
        dashPumpPrice: airConditionCalcStore.dashPump,
        consultantProvision: airConditionStore.consultantMarkup,
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
    airConditionStore.consultantMarkup,
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
