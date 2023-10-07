import useStore from "~/store";
import { api } from "~/utils/api";

export const useHeatPump = () => {
  const store = useStore();

  const { mutate: setBufforCost } = api.heatPump.bufforCost.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("bufforCost", data);
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
    },
  };
};
