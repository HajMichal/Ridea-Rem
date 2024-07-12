import { type StateCreator } from "zustand";

export interface AirConditionStore {
  choosedAirConditioner: {
    type: string;
    power: number;
    option: string;
    area: string;
    energyType: string;
    price: number;
  } | null;
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
  consultantMarkup: number;
  syfon: boolean;
  dashPump: boolean;
}

export interface AirConditionSlice {
  airConditionStore: AirConditionStore;
  updateAirCondition: (
    key: string,
    value: boolean | number | string | object
  ) => void;
}

export const airConditionSlice: StateCreator<AirConditionSlice> = (set) => ({
  airConditionStore: {
    choosedAirConditioner: null,
    copperPipeLen: 10,
    copperCableLen15: 10,
    copperCableLen16: 10,
    pipeDashLen: 10,
    airConditionerSupport: 1,
    gutterLen: 10,
    pipeConnector: 1,
    elasticPipeLen: 1,
    tape: 1,
    wallPass: 1,
    consultantMarkup: 500,
    syfon: false,
    dashPump: false,
  },
  updateAirCondition: (key, value) =>
    set((state) => {
      return {
        ...state,
        airConditionStore: { ...state.airConditionStore, [key]: value },
      };
    }),
});
