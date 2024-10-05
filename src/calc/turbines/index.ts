import { tax23, tax8 } from "~/constans/taxPercentage";

interface InverterType {
  isThreePhasesInverter: boolean;
  isHybridInverter: boolean;
  threePhaseInvCost: number;
  hybridInvCost: number;
}
export function setInverterCost({ input }: { input: InverterType }) {
  if (input.isThreePhasesInverter && !input.isHybridInverter) {
    return input.threePhaseInvCost;
  } else if (!input.isThreePhasesInverter && input.isHybridInverter) {
    return input.hybridInvCost;
  } else if (input.isThreePhasesInverter && input.isHybridInverter) {
    return input.threePhaseInvCost + input.hybridInvCost;
  } else {
    return 0;
  }
}

interface EnergyStoreTotalCostType {
  input: {
    choosedEnergyStore: number;
    t30ControllerCost: number;
    energyCounterCost: number;
    mateboxCost: number;
    batteryCost: number;

    isVat23: boolean;
  };
}
export function setEnergyStoreTotalCost({ input }: EnergyStoreTotalCostType) {
  const values: number[] = Object.values(input).filter(
    (val) => typeof val === "number"
  );
  const netCost = values.reduce((acc, value) => acc + value, 0);
  const taxValue = netCost * (input.isVat23 ? tax23 : tax8);
  const grossCost = netCost + taxValue;

  return {
    netCost: Number(netCost.toFixed(2)),
    taxValue: Number(taxValue.toFixed(2)),
    grossCost: Number(grossCost.toFixed(2)),
  };
}

interface TurbinesDetailsType {
  input: {
    turbine500Count: number;
    turbine1000Count: number;
    turbine1500Count: number;
    turbine3000Count: number;
  };
}
export function setTurbinesDetails({ input }: TurbinesDetailsType) {
  const power500 = input.turbine500Count * 500;
  const power1000 = input.turbine1000Count * 1000;
  const power1500 = input.turbine1500Count * 1500;
  const power3000 = input.turbine3000Count * 3000;

  const totalPower = (power500 + power1000 + power1500 + power3000) / 1000;
  const smallBaseCount =
    input.turbine500Count + input.turbine1000Count + input.turbine1500Count;
  return {
    totalPower,
    roundedTotalPower: Math.floor(totalPower * 2) / 2,
    turbinesCount: smallBaseCount + input.turbine3000Count,
    smallBaseCount,
    biggerBaseCount: input.turbine3000Count,
  };
}

interface TurbinesTotalCost {
  input: {
    turbine500Cost: number;
    turbine1000Cost: number;
    turbine1500Cost: number;
    turbine3000Cost: number;

    turbinesBasesCost: number;
    turbinesMontageCost: number;
    inverterCost: number;
    mastCost: number;
    transportCost: number;
    greaterPowerFee: number;
    inverterBase: number;
    feesAmount: number;

    isVat23: boolean;
  };
}
export function setTurbinesTotalCost({ input }: TurbinesTotalCost) {
  const values: number[] = Object.values(input).filter(
    (val) => typeof val === "number"
  );
  const netCost = values.reduce((acc, value) => acc + value, 0);
  const taxValue = netCost * (input.isVat23 ? tax23 : tax8);
  const grossCost = netCost + taxValue;

  return {
    netCost: Number(netCost.toFixed(2)),
    taxValue: Number(taxValue.toFixed(2)),
    grossCost: Number(grossCost.toFixed(2)),
  };
}

interface LoanForPurcharseType {
  input: {
    finallInstallationCost: number;
    creditPercentage: number;
    instalmentNumber: number;
    grossInstalltaionBeforeDotationsCost: number;
  };
}
export function loanForPurcharse({ input }: LoanForPurcharseType) {
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
