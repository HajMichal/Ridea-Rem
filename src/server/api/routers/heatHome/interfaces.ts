export interface HeatHomeDataCalculationType {
  m2_ocieplenia: number;
  parapety: number;
  tynk: number;
  wykonczenie: number;
  audytEnergetyczny: number;
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface EachMenagerHeatHome {
  [key: string]: HeatHomeDataCalculationType;
}
export interface HeatHomeCalculatorType {
  kalkulator: EachMenagerHeatHome[];
}
