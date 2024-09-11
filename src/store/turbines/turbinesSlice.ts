import { boolean } from "zod";
import { type StateCreator } from "zustand";

export interface TurbinesSlice {
  turbinesStore: {
    turbine500Count: number;
    turbine1000Count: number;
    turbine1500Count: number;
    turbine3000Count: number;
    steelMast: 0 | 3 | 6 | 9 | 12;
    batteryCapacity: 0 | 3 | 6 | 9 | 12;
    threePhases: boolean;
    threePhasesInverter: boolean;
    isHybridInverter: boolean;
    mastFoundation: boolean;
    isMatebox: boolean;
    isEnergyMenagerCounter: boolean;
    isBatteryController: boolean;
    mastType: "strunobetonowy" | "stalowy";
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
    steelMast: 0,
    batteryCapacity: 0,
    threePhases: false,
    threePhasesInverter: false,
    isHybridInverter: false,
    mastFoundation: false,
    isMatebox: false,
    isEnergyMenagerCounter: false,
    isBatteryController: false,
    mastType: "strunobetonowy",
  },
  updateTurbines: (key, value) =>
    set((state) => {
      return {
        ...state,
        turbinesStore: { ...state.turbinesStore, [key]: value },
      };
    }),
});
