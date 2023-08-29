import staticData from "../../static";

export function systemPower({ input }: { input: number }) {
  // C11 -> moc systemu = E11 * (moc panela = 400) / 1000
  return (input * 400) / 1000;
}

export function priceTrend({ input }: { input: number }) {
  return Number((input * staticData.ENERGY_LIMIT_PERCENT + input).toFixed(2));
}

interface EstimatedKWHProdType {
  southRoof: boolean;
  system_power: number;
}
export function estimatedKWHProd({ input }: { input: EstimatedKWHProdType }) {
  //      D18 -> szacowana produkcja -> if(F9){ 1020 * C11 } esle if(!F9) {920 * C11}
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
  return input.autoconsumption_step * input.estimated_kWh_prod;
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
  // D13 -> Łączna opłata za przesył energii elektrycznej  if( (D5 - D20) > H3 ) { (G3 * H3) + (G4 * (D5 - D20 - H3)) } else { (D5 - D20) * G3 }

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
  // D12 -> Łączna opłata energii elektrycznej
  const innerCondition =
    input.recentYearTrendUsage - input.autoconsumption > input.usageLimit;
  const innerValue = innerCondition
    ? input.priceInLimit * staticData.ENERGY_LIMIT_PERCENT * input.usageLimit +
      input.priceOutOfLimit *
        staticData.ENERGY_LIMIT_PERCENT *
        (input.recentYearTrendUsage - input.autoconsumption - input.usageLimit)
    : (input.recentYearTrendUsage - input.autoconsumption) *
      (input.priceInLimit * staticData.ENERGY_LIMIT_PERCENT);

  const result = innerValue - input.accumulated_funds_on_account;

  if (result < 0) {
    return 0;
  } else {
    return result;
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
  // D18 - D20  -> Ilośc energii odsprzedanej do Operatora Sieci Dystrybucyjnej (OSD)
  return input.estimated_kWh_prod - input.autoconsumption;
}
export function accumulated_funds_on_account({ input }: { input: number }) {
  // D21 * D22 -> Zgromadzone środki na koncie rozliczeniowym u OSD
  return Number((input * staticData.ESTIMATED_SELL_PRICE_TO_OSD).toFixed(2)); // spytac czy wartosc 0.72 to stala wartosc czy modyfikowalna
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
  voucher?: boolean;
  ekierki?: number;
  hybridInwerter?: number;
  tigo?: number;
  bloczki?: number;
  grunt?: number;
  solarEdge?: number;
  markup_costs: number;
}
export function totalAddonCost({ input }: { input: TotalAddonCostType }) {
  return Number(
    (
      (input.voucher ? 900 : 0) +
      (input.ekierki ? input.ekierki : 0) +
      (input.hybridInwerter ? input.hybridInwerter : 0) +
      (input.tigo ? input.tigo : 0) +
      (input.bloczki ? input.bloczki : 0) +
      (input.grunt ? input.grunt : 0) +
      (input.solarEdge ? input.solarEdge : 0) +
      input.markup_costs
    ).toFixed(2)
  );
}

interface OfficeMarkupType {
  officeFee: number;
  system_power: number;
  consultantFee: number;
  constantFee: number;
}
export function officeMarkup({ input }: { input: OfficeMarkupType }) {
  return Number(
    (
      input.officeFee * input.system_power +
      input.consultantFee * input.system_power +
      input.constantFee
    ).toFixed(2)
  );
}

interface TotalInstallationCostType {
  addon_costs: number;
  base_installation_costs: number;
  heatStore_energyManager_costs: number;
}
export function totalInstallationCosts({
  input,
}: {
  input: TotalInstallationCostType;
}) {
  const total_cost =
    input.addon_costs +
    input.base_installation_costs +
    input.heatStore_energyManager_costs;
  const fee_value = total_cost * 0.08;
  return {
    total_installation_cost: total_cost,
    total_gross_cost: total_cost + fee_value,
    fee_value: Number(fee_value.toFixed(2)),
  };
}

interface DotationsSumType {
  photovoltaics_dotation: number;
  heatStore_dotation: number;
  energyStore_dotation: number;
}
export function dotationsSum({ input }: { input: DotationsSumType }) {
  return (
    input.photovoltaics_dotation +
    input.heatStore_dotation +
    input.energyStore_dotation
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

interface AmountTaxCreditType {
  amount_after_dotation: number;
  tax_credit: number;
}
export function amountTaxCredit({ input }: { input: AmountTaxCreditType }) {
  return Number((input.amount_after_dotation * input.tax_credit).toFixed(2));
}

interface HeatStoreCostType {
  choosed_tank_type: string;
}
export function heatStoreCost({ input }: { input: HeatStoreCostType }) {
  if (input.choosed_tank_type === "Zbiornik 100L") {
    return 4900;
  } else if (input.choosed_tank_type === "Zbiornik 140L") {
    return 5300;
  } else if (input.choosed_tank_type === "Zbiornik 200L") {
    return 5599;
  } else if (input.choosed_tank_type === "Zbiornik 200L z wężownicą") {
    return 6200;
  }
}

interface HeatStoreWithEnergyManagerCostType {
  isEnergyManagerSystem: boolean;
  heatStore_cost: number;
}
export function heatStoreWithEnergyManagerCost({
  input,
}: {
  input: HeatStoreWithEnergyManagerCostType;
}) {
  return input.isEnergyManagerSystem ? input.heatStore_cost + 1500 : 0;
}

interface FinallInstallationCostType {
  amount_tax_credit: number;
  amount_after_dotation: number;
}
export function finallInstallationCost({
  input,
}: {
  input: FinallInstallationCostType;
}) {
  return Number(
    (input.amount_after_dotation - input.amount_tax_credit).toFixed(2)
  );
}

export * as default from "./index";