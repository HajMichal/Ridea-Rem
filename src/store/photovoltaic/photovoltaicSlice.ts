import { type StateCreator } from "zustand";
import { smallestPanel } from "~/constans/panelPowers";

export type EccentricsType =
  | "None"
  | "standardEccentrics"
  | "certifiedEccentrics";

export interface PhotovoltaicsSlice {
  photovoltaicStore: {
    southRoof: boolean;
    isGroundMontage: boolean;
    isRoofWeightSystem: boolean;
    heatStoreDotation: boolean;
    emsDotation: boolean;
    isEnergyStoreDotation: boolean;
    eccentrics: EccentricsType;
    isInwerterChoosed: boolean;
    isCarPort: boolean;
    isDotation_mojprad: boolean;
    isDotation_czpowietrze: boolean;
    isPromotion: boolean;
    twoInstallmentsFree: boolean;
    holidayVoucher: boolean;
    vat23: boolean;
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
    promotionAmount: number;
    tankSize: string;
    dotationStep_czpowietrze: "prog0" | "prog1" | "prog2" | "prog3";
    choosedCarPort:
      | "0_stan"
      | "stan1"
      | "stan2"
      | "stan4"
      | "stan6"
      | "stan8"
      | "stan10"
      | "stan12";
    energyStoreProducent: "SOLAX" | "HYPONTECH";
  };
  updatePhotovoltaic: (
    key: string,
    value: boolean | number | string | null
  ) => void;
}

export const photovoltaicsSlice: StateCreator<PhotovoltaicsSlice> = (set) => ({
  photovoltaicStore: {
    southRoof: false,
    isGroundMontage: false,
    isRoofWeightSystem: false,
    heatStoreDotation: false,
    isInwerterChoosed: false,
    emsDotation: false,
    isEnergyStoreDotation: false,
    isCarPort: false,
    isPromotion: false,
    isDotation_mojprad: true,
    isDotation_czpowietrze: false,
    twoInstallmentsFree: false,
    holidayVoucher: false,
    vat23: false,
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
    panelPower: smallestPanel,
    installmentNumber: 120,
    energyStorePower: 0,
    dotationStep_czpowietrze: "prog1",
    eccentrics: "None",
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
