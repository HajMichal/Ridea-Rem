import { boolean } from "zod";
import { type StateCreator } from "zustand";

export interface TurbinesSlice {
  turbinesStore: {
    turbine500Count: number;
    turbine1000Count: number;
    turbine1500Count: number;
    turbine3000Count: number;
    threePhases: boolean;
  };
  updateTurbines: (
    key: string,
    value: boolean | number | string | object | null
  ) => void;
}

export const turbinesSlice: StateCreator<TurbinesSlice> = (set) => ({
  turbinesStore: {
    turbine500Count: 0,
    turbine1000Count: 0,
    turbine1500Count: 0,
    turbine3000Count: 0,
    threePhases: false,
  },
  updateTurbines: (key, value) =>
    set((state) => {
      return {
        ...state,
        turbinesStore: { ...state.turbinesStore, [key]: value },
      };
    }),
});
