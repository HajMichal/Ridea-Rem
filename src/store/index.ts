import { create } from "zustand";

import {
  photovoltaicsSlice,
  type PhotovoltaicsSlice,
} from "./photovoltaicSlice";
import {
  photovoltaicCalculationSlice,
  type PhotovoltaicCalculationSlice,
} from "./photovoltaicCalculationSlice";

type Store = PhotovoltaicsSlice & PhotovoltaicCalculationSlice;

// ...a is set and get cb from zustand
const useStore = create<Store>()((...a) => ({
  ...photovoltaicsSlice(...a),
  ...photovoltaicCalculationSlice(...a),
}));

export default useStore;
