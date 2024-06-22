export interface AirConditionDataToCalculation {
  airConditioner: {
    type: string;
    power: number;
    option: string;
    area: string;
    energyType: string;
    price: number;
  }[];
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
}
/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
export interface EachMenagerAirCondition {
  [key: string]: AirConditionDataToCalculation;
}
export interface AirConditionCalculatorType {
  kalkulator: EachMenagerAirCondition[];
}
