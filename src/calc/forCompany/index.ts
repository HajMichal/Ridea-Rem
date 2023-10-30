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

interface PriceFor1KWType {
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
export function priceFor1KW({ input }: { input: PriceFor1KWType }) {
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

export * as default from "./index";
