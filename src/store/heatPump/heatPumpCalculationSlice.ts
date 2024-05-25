import { type StateCreator } from "zustand";

export interface HeatPumpCalculations {
  bufforCost: number;
  montagePumpInCascadeCost: number;
  newDrillingsCost: number;
  longerIsolationFromMineralWoolCost: number;
  preisolatedPipeCost: number;
  longerPreIsolatedPipeCost: number;
  circulationMontageCost: number;
  demontageOldBoilerCost: number;
  cleanPlacementCost: number;
  moveCwuCost: number;
  energeticConnectionCost: number;
  buforWithSupportCost: number;
  closeOpenedSystemCost: number;
  heatPumpCost: number;
  addonSumCost: number;
  energeticAuditCost: number;
  heatPumpPricingBeforeDotations: {
    netSystemValue: number;
    vatValue: number;
    grossSystemValue: number;
  };
  termoModernizationRelif: number;
  finallGrossInstalationCost: number;
  heatStoreDotations: {
    heatStoreDotationValue: number;
    modernizationDotation: number;
    dotationSum: number;
  };
  loanForPurcharse: {
    finallInstalmentPice: number;
    instalmentBeforeDotations: number;
  };

  markupCosts: {
    officeFeeValue: number;
    consultantFeeValue: number;
    markupSumValue: number;
    officeFeeForBoss: number;
  };
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
    montagePumpInCascadeCost: 0,
    termoModernizationRelif: 0,
    bufforCost: 0,
    newDrillingsCost: 0,
    longerIsolationFromMineralWoolCost: 0,
    preisolatedPipeCost: 0,
    longerPreIsolatedPipeCost: 0,
    circulationMontageCost: 0,
    demontageOldBoilerCost: 0,
    cleanPlacementCost: 0,
    moveCwuCost: 0,
    energeticConnectionCost: 0,
    buforWithSupportCost: 0,
    closeOpenedSystemCost: 0,
    heatPumpCost: 0,
    addonSumCost: 0,
    energeticAuditCost: 0,
    heatPumpPricingBeforeDotations: {
      netSystemValue: 0,
      vatValue: 0,
      grossSystemValue: 0,
    },
    finallGrossInstalationCost: 0,
    heatStoreDotations: {
      heatStoreDotationValue: 0,
      modernizationDotation: 0,
      dotationSum: 0,
    },
    loanForPurcharse: {
      finallInstalmentPice: 0,
      instalmentBeforeDotations: 0,
    },

    markupCosts: {
      officeFeeValue: 0,
      consultantFeeValue: 0,
      markupSumValue: 0,
      officeFeeForBoss: 0,
    },
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
