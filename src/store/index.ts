import { create } from "zustand";

import {
  photovoltaicsSlice,
  type PhotovoltaicsSlice,
} from "./photovoltaic/photovoltaicSlice";
import {
  photovoltaicCalculationSlice,
  type PhotovoltaicCalculationSlice,
} from "./photovoltaic/photovoltaicCalculationSlice";

import {
  heatPumpSlice,
  type HeatPumpSliceType,
} from "./heatPump/heatPumpSlice";
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

type Store = PhotovoltaicsSlice &
  PhotovoltaicCalculationSlice &
  HeatPumpSliceType &
  HeatPumpCalculationSlice &
  ForCompanySlice &
  ForCompanyCalculationSlice;

// ...a is set and get cb from zustand
const useStore = create<Store>()((...a) => ({
  ...photovoltaicsSlice(...a),
  ...photovoltaicCalculationSlice(...a),
  ...heatPumpSlice(...a),
  ...heatPumpCalculationSlice(...a),
  ...forCompanySlice(...a),
  ...forCompanyCalculationSlice(...a),
}));

export default useStore;
