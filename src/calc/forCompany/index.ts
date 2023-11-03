interface CalculateModuleCountType {
  wantedInstaltionPower: number;
}
export function calculateModuleCount({
  input,
}: {
  input: CalculateModuleCountType;
}) {
  const panelCount400 = Math.floor((input.wantedInstaltionPower * 1000) / 400);
  const panelCount455 = Math.floor((input.wantedInstaltionPower * 1000) / 455);
  const panelCount500 = Math.floor((input.wantedInstaltionPower * 1000) / 500);

  return {
    modulesCount400: panelCount400,
    modulesCount455: panelCount455,
    modulesCount500: panelCount500,
  };
}

interface SystemPowerType {
  calculateModuleCount: {
    modulesCount400: number;
    modulesCount455: number;
    modulesCount500: number;
  };
}
export function systemPower({ input }: { input: SystemPowerType }) {
  return {
    systemPower400: Number(
      ((input.calculateModuleCount.modulesCount400 * 400) / 1000).toFixed(2)
    ),
    systemPower455: Number(
      ((input.calculateModuleCount.modulesCount455 * 455) / 1000).toFixed(2)
    ),
    systemPower500: Number(
      ((input.calculateModuleCount.modulesCount500 * 500) / 1000).toFixed(2)
    ),
  };
}

interface EstimatedKWHProdType {
  systemPower: number;
}
export function estimatedKWHProd({ input }: { input: EstimatedKWHProdType }) {
  return 1020 * input.systemPower;
}

interface AutoconsumptionType {
  autoconsumptionStep: number;
  estimatedKWHProd: number;
}
export function autoconsumption({ input }: { input: AutoconsumptionType }) {
  return Number(
    (input.autoconsumptionStep * input.estimatedKWHProd).toFixed(2)
  );
}

interface For1KwAndBaseInstallationPriceType {
  system_power: number;
  dane: {
    szesc: number;
    osiem: number;
    dwanascie: number;
    dwadziescia: number;
    trzydziesci: number;
    piecdziesiat: number;
  };
}
export function for1KwAndBaseInstallationPrice({
  input,
}: {
  input: For1KwAndBaseInstallationPriceType;
}) {
  if (input.system_power <= 6) {
    return {
      pricePer1kW: input.dane.szesc,
      baseInstallationPrice: input.system_power * input.dane.szesc,
    };
  } else if (input.system_power <= 8) {
    return {
      pricePer1kW: input.dane.osiem,
      baseInstallationPrice: input.system_power * input.dane.osiem,
    };
  } else if (input.system_power <= 12) {
    return {
      pricePer1kW: input.dane.dwanascie,
      baseInstallationPrice: input.system_power * input.dane.dwanascie,
    };
  } else if (input.system_power <= 20) {
    return {
      pricePer1kW: input.dane.dwadziescia,
      baseInstallationPrice: input.system_power * input.dane.dwadziescia,
    };
  } else if (input.system_power <= 30) {
    return {
      pricePer1kW: input.dane.trzydziesci,
      baseInstallationPrice: input.system_power * input.dane.trzydziesci,
    };
  } else if (input.system_power <= 50) {
    return {
      pricePer1kW: input.dane.piecdziesiat,
      baseInstallationPrice: input.system_power * input.dane.piecdziesiat,
    };
  } else {
    return {
      pricePer1kW: 0,
      baseInstallationPrice: 0,
    };
  }
}

interface AddonPricingType {
  isChoosed: boolean;
  price: number;
  modules_count: number;
}
export function addonPricing({ input }: { input: AddonPricingType }) {
  if (!input.isChoosed) return 0;
  return input.price * input.modules_count;
}

interface AddonSumType {
  ekierkiPrice: number;
  bloczkiPrice: number;
  tigoPrice: number;
  groundMontagePrice: number;
  markupSumValue: number;
}
export function addonSum({ input }: { input: AddonSumType }) {
  return (
    input.bloczkiPrice +
    input.ekierkiPrice +
    input.groundMontagePrice +
    input.tigoPrice +
    input.markupSumValue
  );
}
interface TotalInstallationCostsType {
  baseInstallationCost: number;
  addonsSum: number;
}
export function totalInstallationCosts({
  input,
}: {
  input: TotalInstallationCostsType;
}) {
  const total_cost = input.addonsSum + input.baseInstallationCost;

  const feeValue = Number((total_cost * 0.23).toFixed(2));
  return {
    feeValue: feeValue,
    netPrice: total_cost,
    grossPrice: total_cost + feeValue,
  };
}
interface LoanForPurcharseType {
  finallInstallationCost: number;
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
    (input.finallInstallationCost * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -input.instalmentNumber));
  return {
    finallInstalmentPice: Number(monthlyPayment.toFixed(2)),
    instalmentBeforeDotations: Number(monthlyPaymentBeforeDotations.toFixed(2)),
  };
}

export * as default from "./index";
