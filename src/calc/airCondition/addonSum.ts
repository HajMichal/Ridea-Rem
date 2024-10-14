interface AddonsSum {
  input: {
    copperPipePrice: number;
    copperCable15Price: number;
    copperCable16Price: number;
    dashPipePrice: number;
    airConditionSupportPrice: number;
    gutterPrice: number;
    pipeConnectorPrice: number;
    elasticPipePrice: number;
    tapePrice: number;
    wallPassPrice: number;
    montagePrice: number;
    syfonPrice: number;
    dashPumpPrice: number;
    officeProvision: number;
  };
}
export function addonsSum({ input }: AddonsSum) {
  const values = Object.values(input);
  return values.reduce((acc, value) => acc + value, 0);
}
