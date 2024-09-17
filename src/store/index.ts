import { create } from "zustand";

import {
  photovoltaicsSlice,
  type PhotovoltaicsSlice,
} from "./photovoltaic/photovoltaicSlice";
import {
  photovoltaicCalculationSlice,
  type PhotovoltaicCalculationSlice,
} from "./photovoltaic/photovoltaicCalculationSlice";
import { heatPumpSlice, type HeatPumpSlice } from "./heatPump/heatPumpSlice";
import {
  heatPumpCalculationSlice,
  type HeatPumpCalculationSlice,
} from "./heatPump/heatPumpCalculationSlice";
import {
  forCompanySlice,
  type ForCompanySlice,
} from "./forCompany/forCompanySlice";
import {
  forCompanyCalculationSlice,
  type ForCompanyCalculationSlice,
} from "./forCompany/forCompanyCalculationSlice";
import { heatHomeSlice, type HeatHomeSlice } from "./homeHeat/heatHomeSlice";
import {
  heatHomeCalculationSlice,
  type HeatHomeCalculationSlice,
} from "./homeHeat/heatHomeCalculationSlice";
import {
  airConditionCalculationSlice,
  type AirConditionCalcualtionSlice,
} from "./airCondition/airConditionCalculationSlice";
import {
  airConditionSlice,
  type AirConditionSlice,
} from "./airCondition/airConditionSlice";
import { turbinesSlice, type TurbinesSlice } from "./turbines/turbinesSlice";
import {
  turbinesCalcSlice,
  type TurbinesCalculationSlice,
} from "./turbines/turbinesCalculationSlice";

type Store = PhotovoltaicsSlice &
  PhotovoltaicCalculationSlice &
  HeatPumpSlice &
  HeatPumpCalculationSlice &
  ForCompanySlice &
  ForCompanyCalculationSlice &
  HeatHomeSlice &
  HeatHomeCalculationSlice &
  AirConditionSlice &
  AirConditionCalcualtionSlice &
  TurbinesSlice &
  TurbinesCalculationSlice;

// ...a is set and get cb from zustand
const useStore = create<Store>()((...a) => ({
  ...photovoltaicsSlice(...a),
  ...photovoltaicCalculationSlice(...a),
  ...heatPumpSlice(...a),
  ...heatPumpCalculationSlice(...a),
  ...forCompanySlice(...a),
  ...forCompanyCalculationSlice(...a),
  ...heatHomeSlice(...a),
  ...heatHomeCalculationSlice(...a),
  ...airConditionSlice(...a),
  ...airConditionCalculationSlice(...a),
  ...turbinesSlice(...a),
  ...turbinesCalcSlice(...a),
}));

export default useStore;
