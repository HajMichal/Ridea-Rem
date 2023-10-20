import { type StateCreator } from "zustand";

export interface ForCompanySlice {
  forCompanyStore: {
    southRoof: boolean;
    voucher: boolean;
    isGroundMontage: boolean;
    isRoofWeightSystem: boolean;
    isSolarEdgeChoosed: boolean;
    heatStoreDotation: boolean;
    emsDotation: boolean;
    energyStoreDotation: boolean;
    isEccentricsChoosed: boolean;
    isInwerterChoosed: boolean;

    usageLimit: number;
    modulesCount: number;
    consultantMarkup: number;
    autoconsumptionInPercent: number;
    energyPriceInLimit: number;
    energyPriceOutOfLimit: number;
    recentYearTrendUsage: number;
    energyStorePower: number;
    tigoCount: number;
    panelPower: number;
    installmentNumber: number;
    tankSize: string;
  };
  updateForCompany: (key: string, value: boolean | number | string) => void;
}

export const forCompanySlice: StateCreator<ForCompanySlice> = (set) => ({
  forCompanyStore: {
    southRoof: false,
    voucher: false,
    isGroundMontage: false,
    isRoofWeightSystem: false,
    isSolarEdgeChoosed: false,
    heatStoreDotation: false,
    emsDotation: false,
    energyStoreDotation: false,
    isEccentricsChoosed: false,
    isInwerterChoosed: false,

    usageLimit: 0,
    modulesCount: 0,
    consultantMarkup: 0,
    autoconsumptionInPercent: 0.1,
    energyPriceInLimit: 0,
    energyPriceOutOfLimit: 0,
    recentYearTrendUsage: 0,
    energyStorePower: 0,
    tigoCount: 0,
    panelPower: 400,
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
