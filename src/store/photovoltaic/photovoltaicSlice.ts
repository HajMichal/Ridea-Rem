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
    isHeatStore: boolean;
    emsDotation: boolean;
    isEnergyStoreDotation: boolean;
    eccentrics: EccentricsType;
    isInwerterChoosed: boolean;
    isCarPort: boolean;
    isDotation_mojprad: boolean;
    isDotation_czpowietrze: boolean;
    isPromotion: boolean;
    holidayVoucher: boolean;
    vat23: boolean;
    isMatebox: boolean;
    isDitch: boolean;
    isEniga: boolean;
    ditchLength: number;
    taxCredit: number;
    trendPrice: number;
    modulesCount: number;
    autoconsumptionInPercent: number;
    energyPriceInLimit: number;
    energyPrice: number;
    monthlyBill: number;
    energyStore: {
      name: string;
      price: number;
    };
    cableAC: number;
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
    isHeatStore: false,
    isInwerterChoosed: false,
    emsDotation: false,
    isEnergyStoreDotation: false,
    isCarPort: false,
    isPromotion: false,
    isDotation_mojprad: true,
    isDotation_czpowietrze: false,
    holidayVoucher: false,
    vat23: false,
    isMatebox: false,
    isDitch: true,
    isEniga: false,
    ditchLength: 0,
    promotionAmount: 0,
    taxCredit: 0.12,
    trendPrice: 0,
    modulesCount: 0,
    autoconsumptionInPercent: 0.1,
    energyPriceInLimit: 0,
    energyPrice: 0,
    monthlyBill: 0,
    tigoCount: 0,
    cableAC: 0,
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
