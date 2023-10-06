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

type Store = PhotovoltaicsSlice &
  PhotovoltaicCalculationSlice &
  HeatPumpSliceType &
  HeatPumpCalculationSlice;

// ...a is set and get cb from zustand
const useStore = create<Store>()((...a) => ({
  ...photovoltaicsSlice(...a),
  ...photovoltaicCalculationSlice(...a),
  ...heatPumpSlice(...a),
  ...heatPumpCalculationSlice(...a),
}));

export default useStore;
