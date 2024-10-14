export type FeesNames =
  | "imposedFeePhotovoltaic"
  | "feePerkwPhotovoltaic"
  | "imposedFeeForCompany"
  | "feePerkwForCompany"
  | "imposedFeeHeatPump"
  | "feePerkwHeatPump"
  | "imposedFeeHeatHome"
  | "feePerkwHeatHome"
  | "imposedFeeAirCondition"
  | "feePerkwTurbines"
  | "imposedFeeTurbines";

export interface UserProvisionType {
  role: number;
  name: string | null;
  id: string;
  city: string;
  feePerkwForCompany: number;
  feePerkwHeatHome: number;
  feePerkwHeatPump: number;
  feePerkwPhotovoltaic: number;
  feePerkwTurbines: number;
  imposedFeeAirCondition: number;
  imposedFeeForCompany: number;
  imposedFeeHeatHome: number;
  imposedFeeHeatPump: number;
  imposedFeePhotovoltaic: number;
  imposedFeeTurbines: number;
  // workers?: UserProvisionType[];
}

export interface DataToProvisionEdit {
  provisionAmount: number;
  provisionName: string;
}
