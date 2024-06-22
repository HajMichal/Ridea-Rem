import { type StateCreator } from "zustand";

export interface AirConditionStore {
  choosedAirCondition: string | null;
  copperPipeLen: number;
  copperCableLen15: number;
  copperCableLen16: number;
  pipeDashLen: number;
  airConditionerSupport: number;
  gutterLen: number;
  pipeConnector: number;
  elasticPipeLen: number;
  tape: number;
  wallPass: number;
  syfon: number;
  dashPump: number;
}

export interface AirConditionSlice {
  airConditionStore: AirConditionStore;
  updateAirCondition: (key: string, value: boolean | number | string) => void;
}

export const airConditionSlice: StateCreator<AirConditionSlice> = (set) => ({
  airConditionStore: {
    choosedAirCondition: null,
    copperPipeLen: 10,
    copperCableLen15: 10,
    copperCableLen16: 10,
    pipeDashLen: 10,
    airConditionerSupport: 10,
    gutterLen: 10,
    pipeConnector: 10,
    elasticPipeLen: 10,
    tape: 10,
    wallPass: 10,
    syfon: 0,
    dashPump: 0,
  },
  updateAirCondition: (key, value) =>
    set((state) => {
      return {
        ...state,
        airConditionStore: { ...state.airConditionStore, [key]: value },
      };
    }),
});
