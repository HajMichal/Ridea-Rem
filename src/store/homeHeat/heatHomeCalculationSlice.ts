import { type StateCreator } from "zustand";

interface HeatHomeCalculations {
  heatedAreaCost: number;
  heatingThicknessCost: number;
  windowSillCost: number;
  plasterAreaCost: number;
  topFinishCost: number;
  markupCosts: {
    officeFeeValue: number;
    consultantFeeValue: number;
    markupSumValue: number;
    officeFeeForBoss: number;
  };
  totalCost: number;
  dotationValue: number;
}

export interface HeatHomeCalculationSliceType {
  heatHomeCalculationsStore: HeatHomeCalculations;
  updateHeatHomeCalcs: (
    key: string,
    value: number | undefined | object
  ) => void;
}

export const heatHomeCalculationSlice: StateCreator<
  HeatHomeCalculationSliceType
> = (set) => ({
  heatHomeCalculationsStore: {
    heatedAreaCost: 0,
    heatingThicknessCost: 0,
    windowSillCost: 0,
    plasterAreaCost: 0,
    topFinishCost: 0,
    markupCosts: {
      officeFeeValue: 0,
      consultantFeeValue: 0,
      markupSumValue: 0,
      officeFeeForBoss: 0,
    },
    totalCost: 0,
    dotationValue: 0,
  },
  updateHeatHomeCalcs: (key, value) =>
    set((state) => ({
      ...state,
      heatHomeCalculationsStore: {
        ...state.heatHomeCalculationsStore,
        [key]: value,
      },
    })),
});
