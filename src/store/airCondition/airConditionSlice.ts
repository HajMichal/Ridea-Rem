import { type StateCreator } from "zustand";

export interface AirConditionStore {
  test: boolean;
}

export interface AirConditionSlice {
  airConditionStore: AirConditionStore;
  updateAirCondition: (key: string, value: boolean | number | string) => void;
}

export const airConditionSlice: StateCreator<AirConditionSlice> = (set) => ({
  airConditionStore: {
    test: false,
  },
  updateAirCondition: (key, value) =>
    set((state) => {
      return {
        ...state,
        airConditionStore: { ...state.airConditionStore, [key]: value },
      };
    }),
});
