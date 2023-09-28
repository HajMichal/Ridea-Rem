import { StateCreator } from "zustand";

export interface HeatPumpSlice {
  heatPumpStore: {
    glazingType: boolean;
    isIsolatedCeiling: boolean;
    isIsolatedFloor: boolean;
    isIsolatedDoor: boolean;
    isHighTemperatureHeater: boolean;

    heatedArea: number;
    roomHeight: number;
    windowLayers: number;
    minimalWorkingTemp: number;

    buildingIsolation: string;
  };
  updatePhotovoltaic: (key: string, value: boolean | number | string) => void;
}

export const photovoltaicsSlice: StateCreator<HeatPumpSlice> = (set) => ({
  heatPumpStore: {
    glazingType: false,
    isIsolatedCeiling: false,
    isIsolatedFloor: false,
    isIsolatedDoor: false,
    isHighTemperatureHeater: false,

    heatedArea: 0,
    roomHeight: 0,
    windowLayers: 1,
    minimalWorkingTemp: -7,

    buildingIsolation: "welna 5cm",
  },
  updatePhotovoltaic: (key, value) =>
    set((state) => ({
      ...state,
      heatPumpStore: { ...state.heatPumpStore, [key]: value },
    })),
});
