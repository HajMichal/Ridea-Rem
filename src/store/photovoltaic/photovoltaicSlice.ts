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
    energyStore: {
      name: string;
      price: number;
    };
    tigoCount: number;
    panelPower: number;
    installmentNumber: number;
    promotionAmount: number;
    cwuTank: {
      name: string;
      price: number;
    };
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
  };
  updatePhotovoltaic: (
    key: string,
    value: boolean | number | string | object | null
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
    energyStore: {
      name: "",
      price: 0,
    },
    dotationStep_czpowietrze: "prog1",
    eccentrics: "None",
    cwuTank: {
      name: "",
      price: 0,
    },
    choosedCarPort: "0_stan",
  },
  updatePhotovoltaic: (key, value) =>
    set((state) => {
      return {
        ...state,
        photovoltaicStore: { ...state.photovoltaicStore, [key]: value },
      };
    }),
});
