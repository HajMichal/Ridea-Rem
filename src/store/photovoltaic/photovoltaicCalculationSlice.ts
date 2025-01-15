import { type StateCreator } from "zustand";

export interface PhotovoltaicCalculations {
  system_power: number;
  estimated_kWh_prod: number;
  autoconsumption: number;
  autoconsumptionProfit: number;
  overproducedTrendInKw: number;
  energy_sold_to_distributor: number;
  futureProfitsWithPV: {
    monthlyProfit: number;
    yearlyProfit: number;
    tenYearsProfit: number;
  };
  installationAndPer1KW_price:
    | {
        price_per_1KW: number;
        base_installation_price: number;
      }
    | undefined;
  tigo_price: number;
  ekierki_price: number;
  certEkierki_price: number;
  bloczki_price: number;
  grunt_price: number;
  hybridInwerter_price: number;
  addon_cost: number;
  markup_costs: {
    officeFeeValue: number;
    consultantFeeValue: number;
    markupSumValue: number;
    officeFeeForBoss: number;
  };
  totalInstallationCosts: {
    total_installation_cost: number;
    total_gross_cost: number;
    fee_value: number;
  };
  dotations_sum: number;
  amount_after_dotation: number;

  heatStoreCost: number;
  finall_installation_cost: number;
  heatStore_energyManager_costs: number;
  payment_return_time: { years: number; months: number };
  termoModernization: number;
  loanForPurcharse: {
    finallInstalmentPice: number;
    instalmentBeforeDotations: number;
  };
  energyStoreDotationValue: number;
  energyMenagerDotationValue: number;
  photovoltaicDotation_mojprad: number;
  photovoltaicDotation_czpowietrze: number;
  energyManagerCost: number;
  carPortCost: number;
  cableACCost: number;
  mateboxCost: number;
  ditchCost: number;
  // PROMOCJA
  // promotionTotalInstallationCosts: {
  //   total_installation_cost: number;
  //   total_gross_cost: number;
  //   fee_value: number;
  // };
}

export interface PhotovoltaicCalculationSlice {
  photovoltaicCalculations: PhotovoltaicCalculations;
  updatePhotovoltaicCalcs: (
    key: string,
    value: number | undefined | object
  ) => void;
}

export const photovoltaicCalculationSlice: StateCreator<
  PhotovoltaicCalculationSlice
> = (set) => ({
  photovoltaicCalculations: {
    system_power: 0,
    estimated_kWh_prod: 0,
    autoconsumption: 0,
    autoconsumptionProfit: 0,
    energy_sold_to_distributor: 0,
    overproducedTrendInKw: 0,
    futureProfitsWithPV: {
      monthlyProfit: 0,
      yearlyProfit: 0,
      tenYearsProfit: 0,
    },
    installationAndPer1KW_price: {
      base_installation_price: 0,
      price_per_1KW: 0,
    },
    tigo_price: 0,
    ekierki_price: 0,
    certEkierki_price: 0,
    bloczki_price: 0,
    grunt_price: 0,
    hybridInwerter_price: 0,
    addon_cost: 0,
    markup_costs: {
      officeFeeValue: 0,
      consultantFeeValue: 0,
      markupSumValue: 0,
      officeFeeForBoss: 0,
    },
    totalInstallationCosts: {
      total_installation_cost: 0,
      total_gross_cost: 0,
      fee_value: 0,
    },
    dotations_sum: 0,
    amount_after_dotation: 0,
    heatStoreCost: 0,
    finall_installation_cost: 0,
    heatStore_energyManager_costs: 0,
    payment_return_time: { years: 0, months: 0 },
    termoModernization: 0,
    loanForPurcharse: {
      finallInstalmentPice: 0,
      instalmentBeforeDotations: 0,
    },
    energyStoreDotationValue: 0,
    energyMenagerDotationValue: 0,
    photovoltaicDotation_mojprad: 6000,
    photovoltaicDotation_czpowietrze: 0,
    energyManagerCost: 0,
    carPortCost: 0,
    cableACCost: 0,
    mateboxCost: 0,
    ditchCost: 0,
  },
  updatePhotovoltaicCalcs: (key, value) =>
    set((state) => ({
      ...state,
      photovoltaicCalculations: {
        ...state.photovoltaicCalculations,
        [key]: value,
      },
    })),
});
