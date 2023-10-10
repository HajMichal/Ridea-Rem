import useStore from "~/store";
import { api } from "~/utils/api";

export const useHeatPump = () => {
  const store = useStore();

  const { mutate: setBufforCost } = api.heatPump.bufforCost.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("bufforCost", data);
    },
  });
  const { mutate: setMontageInCascadeCost } =
    api.heatPump.montageAnotherPumpInCascade.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("montagePumpInCascadeCost", data);
      },
    });
  const { mutate: setPlacementWithBurstCost } =
    api.heatPump.placementWithBurst.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("placementWithBurstCost", data);
      },
    });
  const { mutate: setNewDrillings } = api.heatPump.newDrillings.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("newDrillingsCost", data);
    },
  });
  const { mutate: setLongerIsolationFromMineralWoolCost } =
    api.heatPump.longerIsolationFromMineralWool.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("longerIsolationFromMineralWoolCost", data);
      },
    });
  const { mutate: setpreisolatedPipeCost } =
    api.heatPump.preisolatedPipe.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("preisolatedPipeCost", data);
      },
    });
  const { mutate: setLongerPreIsolatedPipeCost } =
    api.heatPump.longerPreIsolatedPipe.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("longerPreIsolatedPipeCost", data);
      },
    });
  const { mutate: setCirculationMontageCost } =
    api.heatPump.circulationMontage.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("circulationMontageCost", data);
      },
    });
  const { mutate: setDemontageOldBoilerCost } =
    api.heatPump.demontageOldBoiler.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("demontageOldBoilerCost", data);
      },
    });
  const { mutate: setCleaningPlacementCost } =
    api.heatPump.cleanPlacement.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("cleanPlacementCost", data);
      },
    });
  const { mutate: setMoveCwuCost } = api.heatPump.moveCwu.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("moveCwuCost", data);
    },
  });
  const { mutate: setEnergeticConnectionCost } =
    api.heatPump.makeEnergeticConnection.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("energeticConnectionCost", data);
      },
    });
  const { mutate: setBuforWithSupportCost } =
    api.heatPump.buforWithSupport.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("buforWithSupportCost", data);
      },
    });
  const { mutate: setCloseOpenedSystemCost } =
    api.heatPump.closeOpenedSystem.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("closeOpenedSystemCost", data);
      },
    });
  const { mutate: setHeatPumpCostAndKwFee } =
    api.heatPump.heatPumpCostAndKwFee.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("heatPumpAndFeesCost", data);
      },
    });
  const { mutate: setAddonsSumCost } = api.heatPump.addonsSumCost.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("addonSumCost", data);
    },
  });
  const { mutate: setHeatPumpPricingBeforeDotations } =
    api.heatPump.heatPumpPricingBeforeDotations.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("heatPumpPricingBeforeDotations", data);
      },
    });
  const { mutate: setTermoModernizationRelif } =
    api.heatPump.termoModernizationRelif.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("termoModernizationRelif", data);
      },
    });
  const { mutate: setFinallGrossInstalationCost } =
    api.heatPump.finallGrossInstalationCost.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("finallGrossInstalationCost", data);
      },
    });

  const setHeatedArea = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("heatedArea", e.target.valueAsNumber);
    } else {
      store.updateHeatPump("heatedArea", 0);
    }
  };
  const setRoomHeight = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("roomHeight", e.target.valueAsNumber);
    } else {
      store.updateHeatPump("roomHeight", 0);
    }
  };
  const setSuggestedPower = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("suggestedPumpPower", e.target.valueAsNumber);
    } else {
      store.updateHeatPump("suggestedPumpPower", 0);
    }
  };
  const setYearlyHeatingUsage = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("yearlyHeatingUsage", e.target.valueAsNumber);
    } else {
      store.updateHeatPump("yearlyHeatingUsage", 0);
    }
  };
  const setYearlyHeatingCosts = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("yearlyHeatingHomeCost", e.target.valueAsNumber);
    } else {
      store.updateHeatPump("yearlyHeatingHomeCost", 0);
    }
  };
  const setOneTonneOfResourceCost = (e: {
    target: { valueAsNumber: number };
  }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("oneTonneOfResourceCost", e.target.valueAsNumber);
    } else {
      store.updateHeatPump("oneTonneOfResourceCost", 0);
    }
  };
  const setLongerIsolationFromMineralWool = (e: {
    target: { valueAsNumber: number };
  }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump(
        "longerIsolationFromMineralWool",
        e.target.valueAsNumber
      );
    } else {
      store.updateHeatPump("longerIsolationFromMineralWool", 0);
    }
  };
  const setLongerPreIsolatedPipe = (e: {
    target: { valueAsNumber: number };
  }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("longerPreIsolatedPipe", e.target.valueAsNumber);
    } else {
      store.updateHeatPump("longerPreIsolatedPipe", 0);
    }
  };

  return {
    heatPumpStore: store.heatPumpStore,
    heatPumpCalcStore: store.heatPumpCalculationStore,
    mutations: {
      setHeatedArea,
      setRoomHeight,
      setSuggestedPower,
      setYearlyHeatingCosts,
      setOneTonneOfResourceCost,
      setLongerIsolationFromMineralWool,
      setLongerPreIsolatedPipe,

      setBufforCost,
      setMontageInCascadeCost,
      setPlacementWithBurstCost,
      setNewDrillings,
      setLongerIsolationFromMineralWoolCost,
      setpreisolatedPipeCost,
      setLongerPreIsolatedPipeCost,
      setCirculationMontageCost,
      setDemontageOldBoilerCost,
      setMoveCwuCost,
      setEnergeticConnectionCost,
      setBuforWithSupportCost,
      setCloseOpenedSystemCost,
      setHeatPumpCostAndKwFee,
      setAddonsSumCost,
      setCleaningPlacementCost,
      setHeatPumpPricingBeforeDotations,
      setTermoModernizationRelif,
      setFinallGrossInstalationCost,
      setYearlyHeatingUsage,
    },
  };
};
