import { type StateCreator } from "zustand";

export interface TurbinesCalculationSlice {
  turbinesCalcStore: {
    // turbines
    turbine500Cost: number;
    turbine1000Cost: number;
    turbine1500Cost: number;
    turbine3000Cost: number;

    turbinesBasesCost: number;
    turbinesMontageCost: number;

    turbinesTotalCosts: {
      netCost: number;
      taxValue: number;
      grossCost: number;
    };
    turbinesAfterDotationCost: number;

    // dotations
    turbinesDotationAmount: number;
    energyStoreDotationAmount: number;

    // addons
    inverterCost: number;
    inverterBaseCost: number;
    mastCost: number;
    transportCost: number;
    greaterPowerFee: number;

    // energy store
    t30ControllerCost: number;
    energyCounterCost: number;
    mateboxCost: number;
    batteryCost: number;

    energyStoreTotalCosts: {
      netCost: number;
      taxValue: number;
      grossCost: number;
    };
    energyStoreAfterDotationCost: number;

    // General
    loanForPurcharse: {
      finallInstalmentPice: number;
      instalmentBeforeDotations: number;
    };
    officeMarkup: {
      officeFeeValue: number;
      officeFeeForBoss: number;
      consultantFeeValue: number;
      markupSumValue: number;
    };
  };
  updateTurbinesCalc: (
    key: string,
    value: boolean | number | string | object | null
  ) => void;
}

export const turbinesCalcSlice: StateCreator<TurbinesCalculationSlice> = (
  set
) => ({
  turbinesCalcStore: {
    // turbines
    turbine500Cost: 0,
    turbine1000Cost: 0,
    turbine1500Cost: 0,
    turbine3000Cost: 0,

    turbinesBasesCost: 0,
    turbinesMontageCost: 0,

    turbinesTotalCosts: {
      netCost: 0,
      taxValue: 0,
      grossCost: 0,
    },
    turbinesAfterDotationCost: 0,

    // dotations
    turbinesDotationAmount: 0,
    energyStoreDotationAmount: 0,

    // addons
    inverterCost: 0,
    inverterBaseCost: 0,
    mastCost: 0,
    transportCost: 0,
    greaterPowerFee: 0,

    // energy store
    t30ControllerCost: 0,
    energyCounterCost: 0,
    mateboxCost: 0,
    batteryCost: 0,

    energyStoreTotalCosts: {
      netCost: 0,
      taxValue: 0,
      grossCost: 0,
    },
    energyStoreAfterDotationCost: 0,

    // General
    loanForPurcharse: {
      finallInstalmentPice: 0,
      instalmentBeforeDotations: 0,
    },
    officeMarkup: {
      officeFeeValue: 0,
      officeFeeForBoss: 0,
      consultantFeeValue: 0,
      markupSumValue: 0,
    },
  },
  updateTurbinesCalc: (key, value) =>
    set((state) => {
      return {
        ...state,
        turbinesCalcStore: { ...state.turbinesCalcStore, [key]: value },
      };
    }),
});
