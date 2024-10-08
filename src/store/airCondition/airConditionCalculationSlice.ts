import { type StateCreator } from "zustand";

export interface AirConditionCalculationStore {
  copperPipePrice: number;
  copperCable15Price: number;
  copperCable16Price: number;
  dashPipePrice: number;
  airConditionerSupportPrice: number;
  gutterPrice: number;
  pipeConnectorPrice: number;
  elasticPipePrice: number;
  tapePrice: number;
  wallPassPrice: number;
  syfonPrice: number;
  dashPump: number;
  addonsSumPrice: number;
  officeProvision: {
    officeProvision: number;
    bossProvision: number;
  };
  installationPricing: {
    netInstallationPrice: number;
    vatValue: number;
    grossInstallationPrice: number;
  };
}

export interface AirConditionCalcualtionSlice {
  airConditionCalcStore: AirConditionCalculationStore;
  updateAirConditionCalculation: (
    key: string,
    value: string | number | boolean | object
  ) => void;
}

export const airConditionCalculationSlice: StateCreator<
  AirConditionCalcualtionSlice
> = (set) => ({
  airConditionCalcStore: {
    copperPipePrice: 0,
    copperCable15Price: 0,
    copperCable16Price: 0,
    dashPipePrice: 0,
    airConditionerSupportPrice: 0,
    gutterPrice: 0,
    pipeConnectorPrice: 0,
    elasticPipePrice: 0,
    tapePrice: 0,
    wallPassPrice: 0,
    syfonPrice: 0,
    dashPump: 0,
    addonsSumPrice: 0,
    officeProvision: {
      officeProvision: 0,
      bossProvision: 0,
    },
    installationPricing: {
      netInstallationPrice: 0,
      vatValue: 0,
      grossInstallationPrice: 0,
    },
  },
  updateAirConditionCalculation: (key, value) =>
    set((state) => ({
      ...state,
      airConditionCalcStore: { ...state.airConditionCalcStore, [key]: value },
    })),
});
