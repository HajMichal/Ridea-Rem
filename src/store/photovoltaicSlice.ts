import { type StateCreator } from "zustand";

export interface PhotovoltaicsSlice {
  photovoltaicStore: {
    southRoof: boolean;
    voucher: boolean;
    isGroundMontage: boolean;
    isRoofWeightSystem: boolean;
    isSolarEdgeChoosed: boolean;
    energyManageSystem: boolean;
    isEccentricsChoosed: boolean;
    isInwerterChoosed: boolean;
    taxCredit: number;
    usageLimit: number;
    modulesCount: number;
    consultantMarkup: number;
    autoconsumptionInPercent: number;
    energyPriceInLimit: number;
    energyPriceOutOfLimit: number;
    recentYearTrendUsage: number;
    tigoCount: number;
    tankSize: string;
    panelPower: number;
  };
  updatePhotovoltaic: (key: string, value: boolean | number | string) => void;
}

export const photovoltaicsSlice: StateCreator<PhotovoltaicsSlice> = (set) => ({
  photovoltaicStore: {
    southRoof: false,
    voucher: false,
    isGroundMontage: false,
    isRoofWeightSystem: false,
    isSolarEdgeChoosed: false,
    energyManageSystem: false,
    isEccentricsChoosed: false,
    isInwerterChoosed: false,
    taxCredit: 0.12,
    usageLimit: 0,
    modulesCount: 0,
    consultantMarkup: 0,
    autoconsumptionInPercent: 0.1,
    energyPriceInLimit: 0,
    energyPriceOutOfLimit: 0,
    recentYearTrendUsage: 0,
    tigoCount: 0,
    panelPower: 400,
    tankSize: "Zbiornik 100L",
  },
  updatePhotovoltaic: (key, value) =>
    set((state) => ({
      ...state,
      photovoltaicStore: { ...state.photovoltaicStore, [key]: value },
    })),
});
