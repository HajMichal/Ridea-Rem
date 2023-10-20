import { type StateCreator } from "zustand";

export interface ForCompanyCalculationSlice {
  forCompanyCalculationStore: {
    test: number;
  };
  updateForCompanyCalculation: (
    key: string,
    value: boolean | number | string
  ) => void;
}

export const forCompanyCalculationSlice: StateCreator<
  ForCompanyCalculationSlice
> = (set) => ({
  forCompanyCalculationStore: {
    test: 0,
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
