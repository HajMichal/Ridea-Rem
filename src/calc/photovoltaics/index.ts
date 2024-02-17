import staticData from "../../static";

interface SystemPowerType {
  modulesCount: number;
  panelPower: number;
}
export function systemPower({ input }: { input: SystemPowerType }) {
  return Number(((input.modulesCount * input.panelPower) / 1000).toFixed(2));
}

export function priceTrend({ input }: { input: number }) {
  return Number((input * staticData.ENERGY_LIMIT_PERCENT + input).toFixed(2));
}

interface EstimatedKWHProdType {
  southRoof: boolean;
  system_power: number;
}
export function estimatedKWHProd({ input }: { input: EstimatedKWHProdType }) {
  if (input.southRoof) {
    return 1020 * input.system_power;
  } else {
    return 920 * input.system_power;
  }
}

interface AutoconsumptionType {
  autoconsumption_step: number;
  estimated_kWh_prod: number;
}
export function autoconsumption({ input }: { input: AutoconsumptionType }) {
  return Number(
    (input.autoconsumption_step * input.estimated_kWh_prod).toFixed(2)
  );
}

interface TotalPaymentEnergyTransferType {
  recentYearTrendUsage: number;
  autoconsumption: number;
  usageLimit: number;
  priceInLimit: number;
  priceOutOfLimit: number;
}
export function totalPaymentEnergyTransfer({
  input,
}: {
  input: TotalPaymentEnergyTransferType;
}) {
  const difference = input.recentYearTrendUsage - input.autoconsumption;
  if (difference > input.usageLimit) {
    return Number(
      (
        input.priceInLimit *
          staticData.ENERGY_LIMIT_PERCENT *
          input.usageLimit +
        input.priceOutOfLimit *
          staticData.ENERGY_LIMIT_PERCENT *
          (difference - input.usageLimit)
      ).toFixed(2)
    );
  } else {
    return Number(
      (
        difference *
        (input.priceInLimit * staticData.ENERGY_LIMIT_PERCENT)
      ).toFixed(2)
    );
  }
}

interface TotalEnergyTrendFeeType {
  recentYearTrendUsage: number;
  autoconsumption: number;
  usageLimit: number;
  priceInLimit: number;
  priceOutOfLimit: number;
  accumulated_funds_on_account: number;
}
export function totalEnergyTrendFee({
  input,
}: {
  input: TotalEnergyTrendFeeType;
}) {
  const difference = input.recentYearTrendUsage - input.autoconsumption;
  if (difference > input.usageLimit) {
    const firstPart =
      input.priceInLimit * input.usageLimit +
      input.priceOutOfLimit * (difference - input.usageLimit);
    const result = firstPart - input.accumulated_funds_on_account;
    return result < 0 ? 0 : Number(result.toFixed(2));
  } else {
    const secondPart = difference * input.priceInLimit;
    const result = secondPart - input.accumulated_funds_on_account;
    return result < 0 ? 0 : Number(result.toFixed(2));
  }
}

interface EnergySoldToDistributorType {
  estimated_kWh_prod: number;
  autoconsumption: number;
}
export function energySoldToDistributor({
  input,
}: {
  input: EnergySoldToDistributorType;
}) {
  return Number(Math.round(input.estimated_kWh_prod - input.autoconsumption));
}

interface AccumulatedFundsOnAccountType {
  estiamtedSellPriceToOsd: number;
  autoconsumption: number;
}
export function accumulated_funds_on_account({
  input,
}: {
  input: AccumulatedFundsOnAccountType;
}) {
  return Number(
    (input.autoconsumption * input.estiamtedSellPriceToOsd).toFixed(2)
  );
}

interface YearlyBillWithoutPhotovolaticsType {
  recentYearTrendUsage: number;
  usageLimit: number;
  limit_price_trend: number;
  outOfLimit_price_trend: number;
}
export function yearlyBillWithoutPhotovolatics({
  input,
}: {
  input: YearlyBillWithoutPhotovolaticsType;
}) {
  if (input.recentYearTrendUsage > input.usageLimit) {
    return Number(
      (
        input.limit_price_trend * input.usageLimit +
        input.outOfLimit_price_trend *
          (input.recentYearTrendUsage - input.usageLimit)
      ).toFixed(2)
    );
  } else {
    return Number(
      (input.recentYearTrendUsage * input.limit_price_trend).toFixed(2)
    );
  }
}

interface YearlyTotalFeesType {
  energyPriceOutOfLimit: number;
  recentYearTrendUsage: number;
  energyPriceInLimit: number;
  usageLimit: number;
}
export function yearlyTotalFees({ input }: { input: YearlyTotalFeesType }) {
  if (input.recentYearTrendUsage > input.usageLimit) {
    return {
      yearly_total_trend_fee: Number(
        (
          input.energyPriceInLimit * input.usageLimit +
          input.energyPriceOutOfLimit *
            (input.recentYearTrendUsage - input.usageLimit)
        ).toFixed(2)
      ),
      yearly_total_fee_for_energy_transfer: Number(
        (
          input.energyPriceInLimit *
            staticData.ENERGY_LIMIT_PERCENT *
            input.usageLimit +
          input.energyPriceOutOfLimit *
            staticData.ENERGY_LIMIT_PERCENT *
            (input.recentYearTrendUsage - input.usageLimit)
        ).toFixed(2)
      ),
    };
  } else {
    return {
      yearly_total_trend_fee: Number(
        (input.recentYearTrendUsage * input.energyPriceInLimit).toFixed(2)
      ),
      yearly_total_fee_for_energy_transfer: Number(
        (
          input.recentYearTrendUsage *
          input.energyPriceInLimit *
          staticData.ENERGY_LIMIT_PERCENT
        ).toFixed(2)
      ),
    };
  }
}

interface YearlyCostsWithPhotovoltaicsType {
  total_energy_trend_fee: number;
  total_payment_energy_transfer: number;
}
export function yearlyCostsWithPhotovoltaics({
  input,
}: {
  input: YearlyCostsWithPhotovoltaicsType;
}) {
  return Number(
    (
      input.total_energy_trend_fee + input.total_payment_energy_transfer
    ).toFixed(2)
  );
}

interface TotalSaveType {
  yearly_costs_with_photovoltaics: number;
  yearly_bill_without_photovolatics: number;
}
export function totalSave({ input }: { input: TotalSaveType }) {
  return Number(
    (
      input.yearly_bill_without_photovolatics -
      input.yearly_costs_with_photovoltaics
    ).toFixed(2)
  );
}

interface PriceFor1KWType {
  system_power: number;
  dane: {
    dwa: number;
    cztery: number;
    szesc: number;
    osiem: number;
    dwanascie: number;
    dwadziescia: number;
    trzydziesci: number;
    piecdziesiat: number;
  };
}
export function priceFor1KW({ input }: { input: PriceFor1KWType }) {
  if (input.system_power <= 2) {
    return {
      price_per_1KW: input.dane.dwa,
      base_installation_price: input.system_power * input.dane.dwa,
    };
  } else if (input.system_power <= 4) {
    return {
      price_per_1KW: input.dane.cztery,
      base_installation_price: input.system_power * input.dane.cztery,
    };
  } else if (input.system_power <= 6) {
    return {
      price_per_1KW: input.dane.szesc,
      base_installation_price: input.system_power * input.dane.szesc,
    };
  } else if (input.system_power <= 8) {
    return {
      price_per_1KW: input.dane.osiem,
      base_installation_price: input.system_power * input.dane.osiem,
    };
  } else if (input.system_power <= 12) {
    return {
      price_per_1KW: input.dane.dwanascie,
      base_installation_price: input.system_power * input.dane.dwanascie,
    };
  } else if (input.system_power <= 20) {
    return {
      price_per_1KW: input.dane.dwadziescia,
      base_installation_price: input.system_power * input.dane.dwadziescia,
    };
  } else if (input.system_power <= 30) {
    return {
      price_per_1KW: input.dane.trzydziesci,
      base_installation_price: input.system_power * input.dane.trzydziesci,
    };
  } else if (input.system_power <= 50) {
    return {
      price_per_1KW: input.dane.piecdziesiat,
      base_installation_price: input.system_power * input.dane.piecdziesiat,
    };
  }
}

interface AddonTigoType {
  tigo_price: number;
  tigo_count: number;
}
export function addonTigo({ input }: { input: AddonTigoType }) {
  return input.tigo_price * input.tigo_count;
}

interface AddonEkierkiType {
  isChoosed: boolean;
  price: number;
  modules_count: number;
}
export function addonEkierkiAndSolarEdge({
  input,
}: {
  input: AddonEkierkiType;
}) {
  if (!input.isChoosed) return 0;
  return input.price * input.modules_count;
}

interface AddonGruntAndBloczkiType {
  isChoosed: boolean;
  price: number;
  system_power: number;
}
export function addonGruntAndBloczki({
  input,
}: {
  input: AddonGruntAndBloczkiType;
}) {
  if (!input.isChoosed) return 0;
  return input.price * input.system_power;
}

interface AddonHybridInwerterType {
  isHybridInwerterChoosed: boolean;
  hybridInwerter_price: number;
}
export function addonHybridInwerter({
  input,
}: {
  input: AddonHybridInwerterType;
}) {
  if (!input.isHybridInwerterChoosed) return 0;
  return input.hybridInwerter_price;
}

interface TotalAddonCostType {
  promotionAmount?: number;
  ekierki?: number;
  hybridInwerter?: number;
  tigo?: number;
  bloczki?: number;
  grunt?: number;
  solarEdge?: number;
  carPort: number;
  markup_costs: number;
}
export function totalAddonCost({ input }: { input: TotalAddonCostType }) {
  return Number(
    (
      (input.ekierki ? input.ekierki : 0) +
      (input.hybridInwerter ? input.hybridInwerter : 0) +
      (input.tigo ? input.tigo : 0) +
      (input.bloczki ? input.bloczki : 0) +
      (input.grunt ? input.grunt : 0) +
      (input.solarEdge ? input.solarEdge : 0) +
      (input.promotionAmount ? input.promotionAmount : 0) +
      input.carPort +
      input.markup_costs
    ).toFixed(2)
  );
}

interface TotalInstallationCostType {
  addon_costs: number;
  base_installation_costs: number;
  heatStore_energyManager_costs: number;
  energyStoreCost: number;
}
export function totalInstallationCosts({
  input,
}: {
  input: TotalInstallationCostType;
}) {
  const total_cost =
    input.addon_costs +
    input.base_installation_costs +
    input.heatStore_energyManager_costs +
    input.energyStoreCost;

  const fee_value = total_cost * 0.08;

  return {
    total_installation_cost: Number(total_cost.toFixed(2)),
    total_gross_cost: Number((total_cost + fee_value).toFixed(2)),
    fee_value: Number(fee_value.toFixed(2)),
  };
}

interface DotationsSumType {
  photovoltaics_dotation: number;
  heatStore_dotation: number;
  energyMenagerDotation: number;
  energyStoreDotation: number;
}
export function dotationsSum({ input }: { input: DotationsSumType }) {
  return (
    input.photovoltaics_dotation +
    input.energyMenagerDotation +
    input.energyStoreDotation
  );
}

interface AmountAfterDotationType {
  gross_instalation_cost: number;
  summed_dotations: number;
}
export function amountAfterDotation({
  input,
}: {
  input: AmountAfterDotationType;
}) {
  return input.gross_instalation_cost - input.summed_dotations;
}

interface HeatStoreCostType {
  choosed_tank_type: string;
  tanks_costs: {
    zbiornik_100L: number;
    zbiornik_140L: number;
    zbiornik_140L_z_wezem: number;
    zbiornik_200L: number;
    zbiornik_200L_z_wezem: number;
  };
}
export function heatStoreCost({ input }: { input: HeatStoreCostType }) {
  if (input.choosed_tank_type === "Zbiornik 100L") {
    return input.tanks_costs.zbiornik_100L;
  } else if (input.choosed_tank_type === "Zbiornik 140L") {
    return input.tanks_costs.zbiornik_140L;
  } else if (input.choosed_tank_type === "Zbiornik 140L z wężownicą") {
    return input.tanks_costs.zbiornik_140L_z_wezem;
  } else if (input.choosed_tank_type === "Zbiornik 200L") {
    return input.tanks_costs.zbiornik_200L;
  } else if (input.choosed_tank_type === "Zbiornik 200L z wężownicą") {
    return input.tanks_costs.zbiornik_200L_z_wezem;
  }
}

interface HeatStoreWithEnergyManagerCostType {
  isHeatStoreSystem: boolean;
  heatStore_cost: number;
}
export function heatStoreWithEnergyManagerCost({
  input,
}: {
  input: HeatStoreWithEnergyManagerCostType;
}) {
  return input.isHeatStoreSystem ? input.heatStore_cost : 0;
}
interface EnergyManagerCostType {
  isEnergyMenagerSystem: boolean;
  energyMenagerCost: number;
}
export function energyManagerCost({ input }: { input: EnergyManagerCostType }) {
  return input.isEnergyMenagerSystem ? input.energyMenagerCost : 0;
}

interface FinallInstallationCostType {
  amount_after_dotation: number;
}
export function finallInstallationCost({
  input,
}: {
  input: FinallInstallationCostType;
}) {
  return Number(input.amount_after_dotation.toFixed(2));
}

interface EstiamtedPriceForTrendIn1KWHType {
  recentYearTrendUsage: number;
  yearly_bill_without_photovolatics: number;
}
export function estiamtedPriceForTrendIn1KWH({
  // A4 E28
  input,
}: {
  input: EstiamtedPriceForTrendIn1KWHType;
}) {
  return Number(
    (
      input.yearly_bill_without_photovolatics / input.recentYearTrendUsage
    ).toFixed(2)
  );
}

interface SaveOnAutoconsumption {
  autoconsumption: number;
  estiamtedPriceForTrendIn1KWH: number;
}
export function saveOnAutoconsumption({
  //A4 F20
  input,
}: {
  input: SaveOnAutoconsumption;
}) {
  return Number(
    (input.autoconsumption * input.estiamtedPriceForTrendIn1KWH).toFixed(2)
  );
}

interface YearlyProfitForInstallationType {
  accumulated_funds_on_account: number;
  saveOnAutoconsumption: number;
}
export function yearlyProfitForInstallation({
  input,
}: {
  input: YearlyProfitForInstallationType;
}) {
  return Number(
    (input.accumulated_funds_on_account + input.saveOnAutoconsumption).toFixed(
      2
    )
  );
}

interface PaymentReturnTimeType {
  yearlyProfit: number;
  finallInstallationCost: number;
}
export function paymentReturnTime({ input }: { input: PaymentReturnTimeType }) {
  const result = input.finallInstallationCost / input.yearlyProfit;
  const years: number = Math.floor(result);
  const remainingMonths = (result - years) * 12;
  const months: number = Math.round(remainingMonths);

  return { years: Number(years), months: Number(months) };
}

interface EnergyStoreDotationValueType {
  gross_instalation_cost: number;
}
export function energyStoreDotationValue({
  input,
}: {
  input: EnergyStoreDotationValueType;
}) {
  const value =
    input.gross_instalation_cost - staticData.VALUE_TO_HEATSTORE_DOTATION;

  if (value < 0) {
    return 0;
  }
  if (value >= 32000) {
    return 16000;
  }

  if (value < 32000) {
    return Number(
      (value * staticData.PERCENT_TO_HEATSTORE_DOTATION).toFixed(2)
    );
  }
}

interface TermoModernizationType {
  amount_after_dotation: number;
  tax_credit: number;
}
export function termoModernization({
  input,
}: {
  input: TermoModernizationType;
}) {
  return Number((input.amount_after_dotation * input.tax_credit).toFixed(2));
}

interface LoanForPurcharseType {
  finall_installation_cost: number;
  creditPercentage: number;
  instalmentNumber: number;
  grossInstalltaionBeforeDotationsCost: number;
}
export function loanForPurcharse({ input }: { input: LoanForPurcharseType }) {
  const monthlyInterestRate = input.creditPercentage / 12 / 100;

  const monthlyPaymentBeforeDotations =
    (input.grossInstalltaionBeforeDotationsCost * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -input.instalmentNumber));

  const monthlyPayment =
    (input.finall_installation_cost * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -input.instalmentNumber));
  return {
    finallInstalmentPice: Number(monthlyPayment.toFixed(2)),
    instalmentBeforeDotations: Number(monthlyPaymentBeforeDotations.toFixed(2)),
  };
}
interface EnergyStoreCostType {
  energyStorePower: number;
  energyStorePowersCost: {
    prog0: number;
    prog1: number;
    prog2: number;
    prog3: number;
    prog4: number;
    prog5: number;
    prog6: number;
    prog7: number;
    prog8: number;
  };
  hipontechCost: {
    prog0: number;
    prog1: number;
    prog2: number;
  };
}
export function energyStoreCost({ input }: { input: EnergyStoreCostType }) {
  if (input.energyStorePower === 6.2) return input.energyStorePowersCost.prog1;
  else if (input.energyStorePower === 3.1)
    return input.energyStorePowersCost.prog0;
  else if (input.energyStorePower === 11.6)
    return input.energyStorePowersCost.prog2;
  else if (input.energyStorePower === 17.4)
    return input.energyStorePowersCost.prog3;
  else if (input.energyStorePower === 23.2)
    return input.energyStorePowersCost.prog4;
  else if (input.energyStorePower === 29)
    return input.energyStorePowersCost.prog5;
  else if (input.energyStorePower === 34.8)
    return input.energyStorePowersCost.prog6;
  else if (input.energyStorePower === 40.6)
    return input.energyStorePowersCost.prog7;
  else if (input.energyStorePower === 46.4)
    return input.energyStorePowersCost.prog8;
  // hipontech
  else if (input.energyStorePower === 7.2) return input.hipontechCost.prog0;
  else if (input.energyStorePower === 10.8) return input.hipontechCost.prog1;
  else if (input.energyStorePower === 14.4) return input.hipontechCost.prog2;
}

// PROMOCJA
interface PromotionTotalInstallationCostsType {
  totalInstallationCosts: {
    total_installation_cost: number;
    total_gross_cost: number;
    fee_value: number;
  };
  oneInstallmentAmount: number;
}
export function promotionTotalInstallationCosts({
  input,
}: {
  input: PromotionTotalInstallationCostsType;
}) {
  const total_cost =
    input.totalInstallationCosts.total_installation_cost +
    2 * input.oneInstallmentAmount;

  const fee_value = total_cost * staticData.VATRATE;

  return {
    total_installation_cost: total_cost,
    total_gross_cost: Number((total_cost + fee_value).toFixed(2)),
    fee_value: Number(fee_value.toFixed(2)),
  };
}

export * as default from "./index";
