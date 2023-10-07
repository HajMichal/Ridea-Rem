import { type StateCreator } from "zustand";

export interface HeatPumpCalculations {
  kubatura: number;
  assumedHeatNeed: number;
  assumedHeatNeedPer1m: number;
  D34: number;

  heatingCostsWithPump: number;
  yearlySave: number;
  oncelyEnergeticCost: number;
  yearlyEnergeticCost: number;
  I13: number; // H13 - G13    H13 to stała wartość
  I28: number; // I30 - H30    Obie wartości to stałe
  B307: number;
  nettoPumpValue: number;
  nettoSystemValue: number;
  vatValue: number;
  checkDate: 1 | 7;
  grossSystemValue: number;
  termoModernizationRelif: number;
  finallGrossInstalationCost: number;
  G335: number;
  bufforCost: number;
  montagePumpInCascadeCost: number;
  placementWithBurstCost: number;
  newDrillingsCost: number;
  longerIsolationFromMineralWoolCost: number;
  preisolatedPipeCost: number;
  longerPreIsolatedPipeCost: number;
  circulationMontageCost: number;
  demontageOldBoilerCost: number;
  moveCwuCost: number;
  energeticConnectionCost: number;
  buforWithSupportCost: number;
  closeOpenedSystemCost: number;
}

export interface HeatPumpCalculationSlice {
  heatPumpCalculationStore: HeatPumpCalculations;
  updateHeatPumpCalcs: (
    key: string,
    value: number | undefined | object
  ) => void;
}

export const heatPumpCalculationSlice: StateCreator<
  HeatPumpCalculationSlice
> = (set) => ({
  heatPumpCalculationStore: {
    kubatura: 0,
    assumedHeatNeed: 0, // D34 / kubatura
    assumedHeatNeedPer1m: 0, // (assumedHeatNeed * roomHeight) / 100
    D34: 0, // kubatura * I13 * I28
    heatingCostsWithPump: 0,
    yearlySave: 0,
    oncelyEnergeticCost: 0, //C29
    yearlyEnergeticCost: 0, //D29 |   D34 * checkDate
    checkDate: 1, //C138
    I13: 0, // heatLost  H13 - G13    H13 to stała wartość
    I28: 0, // I30 - H30    Obie wartości to stałe
    B307: 0, //base of net value
    nettoPumpValue: 0, //B307 * checkDate
    nettoSystemValue: 0, // Kalkulacja! F193
    vatValue: 0,
    grossSystemValue: 0,
    termoModernizationRelif: 0,
    finallGrossInstalationCost: 0,
    montagePumpInCascadeCost: 0,
    G335: 0,
    bufforCost: 0,
    placementWithBurstCost: 0,
    newDrillingsCost: 0,
    longerIsolationFromMineralWoolCost: 0,
    preisolatedPipeCost: 0,
    longerPreIsolatedPipeCost: 0,
    circulationMontageCost: 0,
    demontageOldBoilerCost: 0,
    moveCwuCost: 0,
    energeticConnectionCost: 0,
    buforWithSupportCost: 0,
    closeOpenedSystemCost: 0,
  },
  updateHeatPumpCalcs: (key, value) =>
    set((state) => ({
      ...state,
      heatPumpCalculationStore: {
        ...state.heatPumpCalculationStore,
        [key]: value,
      },
    })),
});
