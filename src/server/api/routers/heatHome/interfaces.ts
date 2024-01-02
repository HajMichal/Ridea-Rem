export interface HeatHomeDataCalculationType {
  ocieplenia: number;
  m2_ocieplenia: number;
  parapety: number;
  tynk: number;
  wykonczenie: number;
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface EachMenagerHeatHome {
  [key: string]: HeatHomeDataCalculationType;
}
export interface HeatHomeCalculatorType {
  kalkulator: EachMenagerHeatHome[];
}
