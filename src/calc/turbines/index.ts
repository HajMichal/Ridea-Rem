import { tax8 } from "~/constans/taxPercentage";

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
    t30ControllerCost: number;
    energyCounterCost: number;
    mateboxCost: number;
    batterCost: number;
  };
}
export function setEnergyStoreTotalCost({ input }: EnergyStoreTotalCostType) {
  const values = Object.values(input);
  const netCost = values.reduce((acc, value) => acc + value, 0);
  const taxValue = netCost * tax8;
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

  const totalPower = power500 + power1000 + power1500 + power3000;
  const smallBaseCount =
    input.turbine500Count + input.turbine1000Count + input.turbine1500Count;
  return {
    totalPower,
    turbinesCount: smallBaseCount + input.turbine3000Count,
    smallBaseCount,
    biggerBaseCount: input.turbine3000Count,
  };
}

export * as default from "./index";
