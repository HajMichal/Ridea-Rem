import { type StateCreator } from "zustand";

export interface HeatHomeCalculations {
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
  totalCost: {
    nett: number;
    gross: number;
    vat: number;
  };
  dotationValue: number;
  amountAfterDotation: number;
  termoModernization: number;
  finallPrice: number;
  energeticAuditCost: number;
  installmentPrice: {
    finallInstalmentPice: number;
    instalmentBeforeDotations: number;
  };
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
    totalCost: {
      nett: 0,
      gross: 0,
      vat: 0,
    },
    dotationValue: 0,
    amountAfterDotation: 0,
    termoModernization: 0,
    finallPrice: 0,
    energeticAuditCost: 0,
    installmentPrice: {
      finallInstalmentPice: 0,
      instalmentBeforeDotations: 0,
    },
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
