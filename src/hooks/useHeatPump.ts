import useStore from "~/store";
import { api } from "~/utils/api";

export const useHeatPump = () => {
  const store = useStore();

  const setHeatedArea = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("heatedArea", e.target.valueAsNumber);
    }
  };
  const setRoomHeight = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("roomHeight", e.target.valueAsNumber);
    }
  };
  const setSuggestedPower = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("suggestedPumpPower", e.target.valueAsNumber);
    }
  };
  const setYearlyHeatingCosts = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("yearlyHeatingHomeCost", e.target.valueAsNumber);
    }
  };
  const setOneTonneOfResourceCost = (e: {
    target: { valueAsNumber: number };
  }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("oneTonneOfResourceCost", e.target.valueAsNumber);
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
    }
  };
  const setLongerPreIsolatedPipe = (e: {
    target: { valueAsNumber: number };
  }) => {
    if (e.target.valueAsNumber) {
      store.updateHeatPump("longerPreIsolatedPipe", e.target.valueAsNumber);
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
    },
  };
};
