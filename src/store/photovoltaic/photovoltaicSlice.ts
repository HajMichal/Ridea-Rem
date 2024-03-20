import { type StateCreator } from "zustand";

export interface PhotovoltaicsSlice {
  photovoltaicStore: {
    southRoof: boolean;
    isGroundMontage: boolean;
    isRoofWeightSystem: boolean;
    isSolarEdgeChoosed: boolean;
    heatStoreDotation: boolean;
    emsDotation: boolean;
    energyStoreDotation: boolean;
    isEccentricsChoosed: boolean;
    isInwerterChoosed: boolean;
    isCarPort: boolean;
    taxCredit: number;
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
    choosedCarPort:
      | "0_stan"
      | "stan1"
      | "stan2"
      | "stan4"
      | "stan6"
      | "stan8"
      | "stan10"
      | "stan12";
    energyStoreProducent: "SOLAX" | "HIPONTECH";
    promotionAmount: number;
    isPromotion: boolean;
    isDotation: boolean;
  };
  updatePhotovoltaic: (key: string, value: boolean | number | string) => void;
}

export const photovoltaicsSlice: StateCreator<PhotovoltaicsSlice> = (set) => ({
  photovoltaicStore: {
    southRoof: false,
    isGroundMontage: false,
    isRoofWeightSystem: false,
    isSolarEdgeChoosed: false,
    heatStoreDotation: false,
    isEccentricsChoosed: false,
    isInwerterChoosed: false,
    emsDotation: false,
    energyStoreDotation: false,
    isCarPort: false,
    isPromotion: false,
    isDotation: true,
    promotionAmount: 0,
    taxCredit: 0.12,
    usageLimit: 0,
    modulesCount: 0,
    consultantMarkup: 0,
    autoconsumptionInPercent: 0.1,
    energyPriceInLimit: 0,
    energyPriceOutOfLimit: 0,
    recentYearTrendUsage: 0,
    tigoCount: 0,
    panelPower: 415,
    installmentNumber: 120,
    energyStorePower: 0,
    tankSize: "Brak",
    choosedCarPort: "0_stan",
    energyStoreProducent: "SOLAX",
  },
  updatePhotovoltaic: (key, value) =>
    set((state) => {
      return {
        ...state,
        photovoltaicStore: { ...state.photovoltaicStore, [key]: value },
      };
    }),
});
