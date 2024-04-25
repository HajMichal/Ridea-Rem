import { type StateCreator } from "zustand";

export interface HeatHomeType {
  heatThickness: "cm_15" | "cm_20" | "cm_25";
  areaToHeat: number;
  windowSillCount: number;
  plasterArea: number;
  topFinish: number;
  consultantMarkup: number;
  additionalAmount: number;
  dotationStep: string;
  installmentNumber: number;
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
    heatThickness: "cm_15",
    areaToHeat: 0,
    windowSillCount: 0,
    plasterArea: 0,
    topFinish: 0,
    consultantMarkup: 0,
    additionalAmount: 0,
    dotationStep: "prog0",
    installmentNumber: 120,
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
