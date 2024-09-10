import { type StateCreator } from "zustand";

export interface TurbinesCalculationSlice {
  turbinesCalcStore: {
    turbine500Cost: number;
    turbine1000Cost: number;
    turbine1500Cost: number;
    turbine3000Cost: number;
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
    turbine500Cost: 0,
    turbine1000Cost: 0,
    turbine1500Cost: 0,
    turbine3000Cost: 0,
  },
  updateTurbinesCalc: (key, value) =>
    set((state) => {
      return {
        ...state,
        turbinesCalcStore: { ...state.turbinesCalcStore, [key]: value },
      };
    }),
});
