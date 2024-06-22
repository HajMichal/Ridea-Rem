import { StateCreator } from "zustand";

export interface AirConditionCalculationStore {
  test: number;
}

export interface AirConditionCalcualtionSlice {
  airConditionCalcStore: AirConditionCalculationStore;
  updateAirConditionCalculation: (
    key: string,
    value: string | number | boolean
  ) => void;
}

export const airConditionCalculationSlice: StateCreator<
  AirConditionCalcualtionSlice
> = (set) => ({
  airConditionCalcStore: {
    test: 0,
  },
  updateAirConditionCalculation: (key, value) =>
    set((state) => ({
      ...state,
      airConditionCalcStore: { ...state.airConditionCalcStore, [key]: value },
    })),
});
