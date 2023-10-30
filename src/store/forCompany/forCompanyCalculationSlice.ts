import { type StateCreator } from "zustand";

export interface ForCompanyCalculation {
  calculateModuleCount: {
    modulesCount400: number;
    modulesCount455: number;
    modulesCount500: number;
  };
  systemPower: {
    systemPower400: number;
    systemPower455: number;
    systemPower500: number;
  };
  estimatedKWHProd: number;
  autoconsumption: number;
  priceFor1KW: number;
}

export interface ForCompanyCalculationSlice {
  forCompanyCalculationStore: ForCompanyCalculation;
  updateForCompanyCalculation: (
    key: string,
    value: number | undefined | object
  ) => void;
}

export const forCompanyCalculationSlice: StateCreator<
  ForCompanyCalculationSlice
> = (set) => ({
  forCompanyCalculationStore: {
    calculateModuleCount: {
      modulesCount400: 0,
      modulesCount455: 0,
      modulesCount500: 0,
    },
    systemPower: {
      systemPower400: 0,
      systemPower455: 0,
      systemPower500: 0,
    },
    estimatedKWHProd: 0,
    autoconsumption: 0,
    priceFor1KW: 0,
  },
  updateForCompanyCalculation: (key, value) =>
    set((state) => {
      return {
        ...state,
        forCompanyCalculationStore: {
          ...state.forCompanyCalculationStore,
          [key]: value,
        },
      };
    }),
});
