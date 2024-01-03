import { type StateCreator } from "zustand";

export interface HeatHomeType {
  heatThickness: number;
  areaToHeat: number;
  windowSillCount: number;
  plasterArea: number;
  topFinish: number;
  consultantMarkup: number;
  additionalAmount: number;
  dotationStep: string;
}

export interface HeatHomeSliceType {
  heatHomeStore: HeatHomeType;
  updateHeatHome: (
    key: string,
    value: string | number | undefined | object
  ) => void;
}

export const heatHomeSlice: StateCreator<HeatHomeSliceType> = (set) => ({
  heatHomeStore: {
    heatThickness: 0,
    areaToHeat: 0,
    windowSillCount: 0,
    plasterArea: 0,
    topFinish: 0,
    consultantMarkup: 0,
    additionalAmount: 0,
    dotationStep: "prog0",
  },
  updateHeatHome: (key, value) =>
    set((state) => ({
      ...state,
      heatHomeStore: {
        ...state.heatHomeStore,
        [key]: value,
      },
    })),
});
