import { type StateCreator } from "zustand";

export interface HeatHomeType {
  areaToHeat: number;
  windowSillCount: number;
  plasterArea: number;
  topFinish: number;
  additionalAmount: number;
  dotationStep: string;
  installmentNumber: number;
  isEnergeticAudit: boolean;
}

export interface HeatHomeSlice {
  heatHomeStore: HeatHomeType;
  updateHeatHome: (
    key: string,
    value: string | number | boolean | undefined | object
  ) => void;
}

export const heatHomeSlice: StateCreator<HeatHomeSlice> = (set) => ({
  heatHomeStore: {
    areaToHeat: 0,
    windowSillCount: 0,
    plasterArea: 0,
    topFinish: 0,
    additionalAmount: 0,
    installmentNumber: 120,
    dotationStep: "prog0",
    isEnergeticAudit: true,
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
