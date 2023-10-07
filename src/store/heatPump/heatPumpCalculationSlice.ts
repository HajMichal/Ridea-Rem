import { type StateCreator } from "zustand";

export interface HeatPumpCalculations {
  heatLost: number;
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
  buildingIsolationCalc: number;
  windowLayersCalc: number;
  glazingTypeCalc: number;
  isolatedCeilingCalc: number;
  isolatedFloorCalc: number;
  isolatedDoorCalc: number;
  G335: number;
  bufforCost: number;
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
    heatLost: 0,
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
    buildingIsolationCalc: 0, // G6
    windowLayersCalc: 0, // G7
    glazingTypeCalc: 0, // G8
    isolatedCeilingCalc: 0, // G9
    isolatedFloorCalc: 0, // G10
    isolatedDoorCalc: 0, // G12
    G335: 0,
    bufforCost: 0,
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