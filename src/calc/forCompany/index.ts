import {
  largestPanel,
  mediumPanel,
  smallestPanel,
} from "~/constans/panelPowers";

interface CalculateModuleCountType {
  wantedInstaltionPower: number;
}
export function calculateModuleCount({
  input,
}: {
  input: CalculateModuleCountType;
}) {
  const panelCount400 = Math.floor(
    (input.wantedInstaltionPower * 1000) / smallestPanel
  );
  const panelCount455 = Math.floor(
    (input.wantedInstaltionPower * 1000) / mediumPanel
  );
  const panelCount500 = Math.floor(
    (input.wantedInstaltionPower * 1000) / largestPanel
  );

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
      (
        (input.calculateModuleCount.modulesCount400 * smallestPanel) /
        1000
      ).toFixed(2)
    ),
    systemPower455: Number(
      (
        (input.calculateModuleCount.modulesCount455 * mediumPanel) /
        1000
      ).toFixed(2)
    ),
    systemPower500: Number(
      (
        (input.calculateModuleCount.modulesCount500 * largestPanel) /
        1000
      ).toFixed(2)
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

interface BaseInstallationsPricing {
  system_power: {
    systemPower400: number;
    systemPower455: number;
    systemPower500: number;
  };
  dane: {
    czterysta: {
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
      overpiecdziesiat: number;
    };
    czterysta_piecdziesiat: {
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
      overpiecdziesiat: number;
    };
    piecset: {
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
      overpiecdziesiat: number;
    };
  };
  officeMarkup: number;
}
export function baseInstallationsPricing({
  input,
}: {
  input: BaseInstallationsPricing;
}) {
  const panelTypes = ["systemPower400", "systemPower455", "systemPower500"];

  const panelPrices: Record<string, number> = {};

  panelTypes.forEach((panelType) => {
    const power =
      input.system_power[panelType as keyof typeof input.system_power];
    const panelData =
      input.dane[
        panelType === "systemPower400"
          ? "czterysta"
          : panelType === "systemPower455"
          ? "czterysta_piecdziesiat"
          : "piecset"
      ];

    if (power <= 6) {
      panelPrices[panelType] = Number(
        (panelData["szesc"] * power + input.officeMarkup).toFixed(2)
      );
    } else if (power <= 8) {
      panelPrices[panelType] = Number(
        (panelData["osiem"] * power + input.officeMarkup).toFixed(2)
      );
    } else if (power <= 12) {
      panelPrices[panelType] = Number(
        (panelData["dwanascie"] * power + input.officeMarkup).toFixed(2)
      );
    } else if (power <= 20) {
      panelPrices[panelType] = Number(
        (panelData["dwadziescia"] * power + input.officeMarkup).toFixed(2)
      );
    } else if (power <= 30) {
      panelPrices[panelType] = Number(
        (panelData["trzydziesci"] * power + input.officeMarkup).toFixed(2)
      );
    } else if (power <= 50) {
      panelPrices[panelType] = Number(
        (panelData["piecdziesiat"] * power + input.officeMarkup).toFixed(2)
      );
    } else if (power > 50) {
      panelPrices[panelType] = Number(
        (panelData["overpiecdziesiat"] * power + input.officeMarkup).toFixed(2)
      );
    } else {
      panelPrices[panelType] = panelData["szesc"] * 0;
    }
  });

  return panelPrices;
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
    overpiecdziesiat: number;
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
  } else if (input.system_power > 50) {
    return {
      pricePer1kW: input.dane.overpiecdziesiat,
      baseInstallationPrice: input.system_power * input.dane.overpiecdziesiat,
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
  vatValue: number;
}
export function totalInstallationCosts({
  input,
}: {
  input: TotalInstallationCostsType;
}) {
  const total_cost = input.addonsSum + input.baseInstallationCost;

  const feeValue = Number((total_cost * input.vatValue).toFixed(2));
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
