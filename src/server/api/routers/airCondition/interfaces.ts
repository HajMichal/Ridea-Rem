export interface AirConditionData {
  power: number;
  option: string;
  area: string;
  energyType: string;
  price: number;
}
export interface AirConditionDataToCalculation {
  id: string;
  userId: string;
  userName: string;
  airConditioners: Record<string, AirConditionData>;
  addons: {
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
  createdAt: string;
  editedAt: string;
}
