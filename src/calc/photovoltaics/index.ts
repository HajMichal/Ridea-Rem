import { tax23, tax8 } from "~/constans/taxPercentage";
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

interface AddonEccentricsType {
  isEccentrics: boolean;
  modules_count: number;
  price: number;
}
export function addonEccentrics({ input }: { input: AddonEccentricsType }) {
  if (!input.isEccentrics) return 0;
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
  promotionAmount: number;
  twoInstallmentsFree: number;
  voucherholiday: number;
  ekierki?: number;
  hybridInwerter?: number;
  tigo?: number;
  bloczki?: number;
  grunt?: number;
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
      input.promotionAmount +
      input.carPort +
      input.markup_costs +
      input.twoInstallmentsFree +
      input.voucherholiday
    ).toFixed(2)
  );
}

interface TotalInstallationCostType {
  addon_costs: number;
  base_installation_costs: number;
  heatStore_energyManager_costs: number;
  energyStoreCost: number;
  isVat23: boolean;
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

  const fee_value = total_cost * (input.isVat23 ? tax23 : tax8);

  return {
    total_installation_cost: Number(total_cost.toFixed(2)),
    total_gross_cost: Number((total_cost + fee_value).toFixed(2)),
    fee_value: Number(fee_value.toFixed(2)),
  };
}

interface DotationsSumType {
  photovoltaicDotation_mojprad: number;
  photovoltaicDotation_czpowietrze: number;
  energyMenagerDotation: number;
  energyStoreDotationValue: number;
  isVat23: boolean;
}
export function dotationsSum({ input }: { input: DotationsSumType }) {
  if (input.isVat23) return 0;
  return (
    input.photovoltaicDotation_mojprad +
    input.photovoltaicDotation_czpowietrze +
    input.energyMenagerDotation +
    input.energyStoreDotationValue
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

interface HeatStoreWithEnergyManagerCostType {
  isHeatStoreSystem: boolean;
  heatStoreCost: number;
}
export function heatStoreWithEnergyManagerCost({
  input,
}: {
  input: HeatStoreWithEnergyManagerCostType;
}) {
  return input.isHeatStoreSystem ? input.heatStoreCost : 0;
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

interface DotationMojPradType {
  isEnergyStoreDotation: boolean;
  isDotation_mojprad: boolean;
  mp_mc: number;
  mojPrad: number;
}
export function dotation_mojprad({ input }: { input: DotationMojPradType }) {
  if (!input.isDotation_mojprad) return 0;
  if (input.isEnergyStoreDotation) {
    return input.mp_mc;
  } else return input.mojPrad;
}

interface DotationValueType {
  isDotation_czpowietrze: boolean;
  dotationStep: string;
  totalCost: number;
}
export function dotation_czpowietrze({ input }: { input: DotationValueType }) {
  const { dotationStep, totalCost } = input;
  if (!input.isDotation_czpowietrze) return 0;
  if (dotationStep === "prog0") return 0;
  if (dotationStep === "prog1") {
    const dotationValue = Number((0.4 * totalCost).toFixed(2));
    if (dotationValue > 6000) return 6000;
    else return dotationValue;
  }
  if (dotationStep === "prog2") {
    const dotationValue = Number((0.7 * totalCost).toFixed(2));
    if (dotationValue > 9000) return 9000;
    else return dotationValue;
  }
  if (dotationStep === "prog3")
    if (totalCost > 15000) return 15000;
    else return totalCost;
}

interface EnergyMenagerDotationType {
  emsDotation: boolean;
  heatStoreDotation: boolean;
  isEnergyStoreDotation: boolean;
  energyMenager: number;
}

export function energyMenagerDotation({
  input,
}: {
  input: EnergyMenagerDotationType;
}) {
  if (
    (input.emsDotation && input.heatStoreDotation) ||
    (input.emsDotation && input.isEnergyStoreDotation)
  ) {
    return input.energyMenager;
  } else return 0;
}

interface EnergyStoreDotationValueType {
  gross_instalation_cost: number;
  isEnergyStoreDotation: boolean;
}
export function energyStoreDotationValue({
  input,
}: {
  input: EnergyStoreDotationValueType;
}) {
  const value =
    input.gross_instalation_cost - staticData.VALUE_TO_HEATSTORE_DOTATION;

  if (value < 0 || !input.isEnergyStoreDotation) {
    return 0;
  }
  if (value >= 32000) {
    return 17000;
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
