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

export * as default from "./index";
