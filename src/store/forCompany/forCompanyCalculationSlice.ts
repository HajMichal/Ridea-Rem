import { type StateCreator } from "zustand";

export interface ForCompanyCalculation {
  calculateModuleCount: {
    modulesCount400: number;
    modulesCount455: number;
    modulesCount500: number;
  };
  allSystemPowers: {
    systemPower400: number;
    systemPower455: number;
    systemPower500: number;
  };
  sysPower: number;
  modulesCount: number;
  estimatedKWHProd: number;
  autoconsumption: number;
  for1KwAndBaseInstallationPrice: {
    pricePer1kW: number;
    baseInstallationPrice: number;
  };
  addonEkierkiPrice: number;
  addonTigoPrice: number;
  addonGruntPrice: number;
  addonBloczkiPrice: number;
  addonSum: number;
  officeMarkup: {
    officeFeeValue: number;
    officeFeeForBoss: number;
    consultantFeeValue: number;
    markupSumValue: number;
  };
  totalInstallationCosts: {
    feeValue: number;
    netPrice: number;
    grossPrice: number;
  };
  loanForPurcharse: {
    finallInstalmentPice: number;
    instalmentBeforeDotations: number;
  };
}

export interface ForCompanyCalculationSlice {
  forCompanyCalculationStore: ForCompanyCalculation;
  updateForCompanyCalculation: (
    key: string,
    value: number | undefined | object
  ) => void;
}

export const forCompanyCalculationSlice: StateCreator<
  ForCompanyCalculationSlice
> = (set) => ({
  forCompanyCalculationStore: {
    calculateModuleCount: {
      modulesCount400: 0,
      modulesCount455: 0,
      modulesCount500: 0,
    },
    allSystemPowers: {
      systemPower400: 0,
      systemPower455: 0,
      systemPower500: 0,
    },
    sysPower: 0,
    modulesCount: 0,
    estimatedKWHProd: 0,
    autoconsumption: 0,
    for1KwAndBaseInstallationPrice: {
      pricePer1kW: 0,
      baseInstallationPrice: 0,
    },
    addonEkierkiPrice: 0,
    addonTigoPrice: 0,
    addonGruntPrice: 0,
    addonBloczkiPrice: 0,
    addonSum: 0,
    officeMarkup: {
      officeFeeValue: 0,
      officeFeeForBoss: 0,
      consultantFeeValue: 0,
      markupSumValue: 0,
    },
    totalInstallationCosts: {
      feeValue: 0,
      netPrice: 0,
      grossPrice: 0,
    },
    loanForPurcharse: {
      finallInstalmentPice: 0,
      instalmentBeforeDotations: 0,
    },
  },
  updateForCompanyCalculation: (key, value) =>
    set((state) => {
      return {
        ...state,
        forCompanyCalculationStore: {
          ...state.forCompanyCalculationStore,
          [key]: value,
        },
      };
    }),
});
