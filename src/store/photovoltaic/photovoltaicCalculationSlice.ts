import { type StateCreator } from "zustand";

export interface PhotovoltaicCalculations {
  limit_price_trend: number;
  outOfLimit_price_trend: number;
  system_power: number;
  estimated_kWh_prod: number;
  autoconsumption: number;
  total_payment_energy_transfer: number;
  energy_sold_to_distributor: number;
  accumulated_funds_on_account: number;
  total_energy_trend_fee: number;
  yearly_bill_without_photovolatics: number;
  yearly_total_fees: number;
  yearly_costs_with_photovoltaics: number;
  total_save: number;
  installationAndPer1KW_price:
    | {
        price_per_1KW: number;
        base_installation_price: number;
      }
    | undefined;
  tigo_price: number;
  ekierki_price: number;
  bloczki_price: number;
  grunt_price: number;
  hybridInwerter_price: number;
  solarEdge_price: number;
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

  heatStore_cost: number | undefined;
  finall_installation_cost: number;
  heatStore_energyManager_costs: number;
  estiamted_price_for_trend_in_1KWH: number;
  save_on_autoconsumption: number;
  yearly_profit_for_installation: number;
  payment_return_time: { years: number; months: number };
  heatStoreCalcDotation: number;
  termoModernization: number;
  loanForPurcharse: {
    finallInstalmentPice: number;
    instalmentBeforeDotations: number;
  };
  energyStoreCost: number;
  energyStoreDotationValue: number;
  energyManagerCost: number;
  carPortCost: number;
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
    limit_price_trend: 0,
    outOfLimit_price_trend: 0,
    system_power: 0,
    estimated_kWh_prod: 0,
    autoconsumption: 0,
    total_payment_energy_transfer: 0,
    energy_sold_to_distributor: 0,
    accumulated_funds_on_account: 0,
    total_energy_trend_fee: 0,
    yearly_bill_without_photovolatics: 0,
    yearly_total_fees: 0,
    yearly_costs_with_photovoltaics: 0,
    total_save: 0,
    installationAndPer1KW_price: {
      base_installation_price: 0,
      price_per_1KW: 0,
    },
    tigo_price: 0,
    ekierki_price: 0,
    bloczki_price: 0,
    grunt_price: 0,
    hybridInwerter_price: 0,
    solarEdge_price: 0,
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
    energyStoreCost: 0,
    heatStore_cost: 0,
    finall_installation_cost: 0,
    heatStore_energyManager_costs: 0,
    estiamted_price_for_trend_in_1KWH: 0,
    save_on_autoconsumption: 0,
    yearly_profit_for_installation: 0,
    payment_return_time: { years: 0, months: 0 },
    heatStoreCalcDotation: 0,
    termoModernization: 0,
    loanForPurcharse: {
      finallInstalmentPice: 0,
      instalmentBeforeDotations: 0,
    },
    energyStoreDotationValue: 0,
    energyManagerCost: 0,
    carPortCost: 0,
    // PROMOCJA
    // promotionTotalInstallationCosts: {
    //   total_installation_cost: 0,
    //   total_gross_cost: 0,
    //   fee_value: 0,
    // },
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
