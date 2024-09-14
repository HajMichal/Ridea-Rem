import { type StateCreator } from "zustand";

export interface TurbinesSlice {
  turbinesStore: {
    turbine500Count: number;
    turbine1000Count: number;
    turbine1500Count: number;
    turbine3000Count: number;

    turbinesDetails: {
      totalPower: number;
      roundedTotalPower: number;
      turbinesCount: number;
      smallBaseCount: number;
      biggerBaseCount: number;
    };

    steelMast: 0 | 3 | 6 | 9 | 12;
    batteryCapacity: 0 | 3 | 6 | 9 | 12;
    installmentNumber: number;
    consultantMarkup: number;

    threePhases: boolean;
    isThreePhasesInverter: boolean;
    isHybridInverter: boolean;
    mastFoundation: boolean;
    isMatebox: boolean;
    isEnergyMenagerCounter: boolean;
    isBatteryController: boolean;
    mastType: "strunobetonowy" | "stalowy" | "nie wybrano";
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
    turbinesDetails: {
      totalPower: 0,
      roundedTotalPower: 0,
      turbinesCount: 0,
      smallBaseCount: 0,
      biggerBaseCount: 0,
    },

    steelMast: 0,
    batteryCapacity: 0,
    installmentNumber: 120,
    consultantMarkup: 120,

    threePhases: false,
    isThreePhasesInverter: false,
    isHybridInverter: false,
    mastFoundation: false,
    isMatebox: false,
    isEnergyMenagerCounter: false,
    isBatteryController: false,
    mastType: "nie wybrano",
  },
  updateTurbines: (key, value) =>
    set((state) => {
      return {
        ...state,
        turbinesStore: { ...state.turbinesStore, [key]: value },
      };
    }),
});
