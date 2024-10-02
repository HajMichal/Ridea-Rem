declare global {
  namespace PrismaJson {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type AirConditionersType = {
      type: string;
      power: number;
      option: string;
      area: string;
      energyType: string;
      price: number;
    }[];

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type AirConditionerAddonsType = {
      "copperPipe1/4+3/8": number;
      "copperCable1/5": number;
      "copperCable1/6": number;
      dashPipe: number;
      airConditionerSupport: number;
      gutter: number;
      connector: number;
      elasticPipe: number;
      installationTape: number;
      wallHole: number;
      montage: number;
      syfon: number;
      dashPump: number;
    };
  }
}
export {};
