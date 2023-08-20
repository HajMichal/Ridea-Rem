import { create } from "zustand";

import {
  photovoltaicsSlice,
  type PhotovoltaicsSlice,
} from "./photovoltaicSlice";

type Store = PhotovoltaicsSlice;

// ...a is set and get cb from zustand
const useStore = create<Store>()((...a) => ({
  ...photovoltaicsSlice(...a),
}));

export default useStore;
