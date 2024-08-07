import { type StateCreator } from "zustand";
import { smallestPanel } from "~/constans/panelPowers";

export interface ForCompanySlice {
  forCompanyStore: {
    isGroundMontage: boolean;
    isRoofWeightSystem: boolean;
    isEccentricsChoosed: boolean;
    isTigoChoosed: boolean;

    wantedInstalationPower: number;
    eccentricsCount: number;
    groundPanelCount: number;
    roofWeightSystemCount: number;
    consultantMarkup: number;
    autoconsumptionInPercent: number;
    energyStorePower: number;
    tigoCount: number;
    panelPower: number;
    installmentNumber: number;
    tankSize: string;
    vatValue: 0.23 | 0.08;
  };
  updateForCompany: (key: string, value: boolean | number | string) => void;
}

export const forCompanySlice: StateCreator<ForCompanySlice> = (set) => ({
  forCompanyStore: {
    isGroundMontage: false,
    isRoofWeightSystem: false,
    isEccentricsChoosed: false,
    isTigoChoosed: false,

    wantedInstalationPower: 0,

    consultantMarkup: 0,
    autoconsumptionInPercent: 0.1,
    recentYearTrendUsage: 0,
    vatValue: 0.23,
    energyStorePower: 0,
    eccentricsCount: 0,
    groundPanelCount: 0,
    roofWeightSystemCount: 0,
    tigoCount: 0,
    panelPower: smallestPanel,
    installmentNumber: 120,
    tankSize: "Brak",
  },
  updateForCompany: (key, value) =>
    set((state) => {
      return {
        ...state,
        forCompanyStore: { ...state.forCompanyStore, [key]: value },
      };
    }),
});
