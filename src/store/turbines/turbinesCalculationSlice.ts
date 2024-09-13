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

    // addons
    inverterCost: number;
    mastCost: number;

    // energy store
    t30ControllerCost: number;
    energyCounterCost: number;
    mateboxCost: number;
    batterCost: number;

    energyStoreTotalCosts: {
      netCost: number;
      taxValue: number;
      grossCost: number;
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

    // addons
    inverterCost: 0,
    mastCost: 0,

    // energy store
    t30ControllerCost: 0,
    energyCounterCost: 0,
    mateboxCost: 0,
    batterCost: 0,

    energyStoreTotalCosts: {
      netCost: 0,
      taxValue: 0,
      grossCost: 0,
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
