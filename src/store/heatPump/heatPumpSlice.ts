import { StateCreator } from "zustand";

type currentFuelToHeat =
  | "Wegiel kamienny"
  | "Energia elektryczna"
  | "Mial weglowy 23 KWK Chwalowice"
  | "Flot 20 KWK Chwalowice"
  | "Groszek"
  | "Biomasa / Pelet"
  | "Olej opalowy"
  | "Gaz plynny LPG"
  | "Gaz ziemny"
  | "Pompa ciepla COP= wg. J13"
  | "Kolektory słoneczne"
  | "PEC";

export type BuildingIsolationTypes =
  | "Ocieplenie styropian / wełna 5 cm"
  | "Ocieplenie styropian / wełna 10 cm"
  | "Ocieplenie styropian / wełna 15 cm"
  | "Ocieplenie styropian / wełna 20 cm"
  | "Ocieplenie styropian / wełna 25 cm";
type WindowLayersTypes =
  | "Okna ciepłe 1 szybowe"
  | "Okna ciepłe 2 szybowe"
  | "Okna ciepłe 3 szybowe";
export interface HeatPumpSlice {
  heatPumpStore: {
    glazingType: boolean;
    isIsolatedCeiling: boolean;
    isIsolatedFloor: boolean;
    isIsolatedDoor: boolean;
    isHighTemperatureHeater: boolean;
    auditHeatSupply: boolean;
    isBufor100L: boolean;
    isVoucher: boolean;
    isFee: boolean;
    forCompany: boolean;
    steeringModuleLCD: boolean;
    isLongerGuarantee: boolean;
    isAnotherHeatPumpInCascade: boolean;
    isGoodPumpPlacement: boolean;
    isPlacemnetWithBurst: boolean;
    newDrillings: boolean;
    isPreIsolatedPipe: boolean;
    isMontageCirculationCWU: boolean;
    demontageOldBoiler: boolean;
    cleanMontagePlacement: boolean;
    moveCwu: boolean;
    makeEnergeticConnection: boolean;
    mergeNewBufforWithOld: boolean;
    closingOpenSytem: boolean;

    longerPreIsolatedPipe: number;
    C156: number;
    heatedArea: number;
    roomHeight: number;
    minimalWorkingTemp: number;

    suggestedPump: string;

    windowLayers: WindowLayersTypes;
    buildingIsolation: BuildingIsolationTypes;
    currentFuelToHeat: currentFuelToHeat;
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
    auditHeatSupply: false, //C140
    isBufor100L: false, //C141
    isVoucher: false, //C142
    isFee: false, // C143
    forCompany: false, // C144
    steeringModuleLCD: false, // C145
    isLongerGuarantee: false, // C146
    isAnotherHeatPumpInCascade: false, // C150
    isGoodPumpPlacement: false, // C151
    isPlacemnetWithBurst: false, // C152
    newDrillings: false, // C155
    isPreIsolatedPipe: false, // C157
    isMontageCirculationCWU: false, // C160
    demontageOldBoiler: false, // C161
    cleanMontagePlacement: false, // C162
    moveCwu: false, // C163
    makeEnergeticConnection: false, // C164
    mergeNewBufforWithOld: false, // C165
    closingOpenSytem: false, // C166

    longerPreIsolatedPipe: 0, // C158
    C156: 0, // C156
    heatedArea: 0,
    roomHeight: 0,
    windowLayers: "Okna ciepłe 2 szybowe",
    minimalWorkingTemp: -7,

    buildingIsolation: "Ocieplenie styropian / wełna 5 cm",
    currentFuelToHeat: "Wegiel kamienny",
    suggestedPump: "Z-PRO.5.3/4.Mitsubishi.Inv.11-16",
  },
  updatePhotovoltaic: (key, value) =>
    set((state) => ({
      ...state,
      heatPumpStore: { ...state.heatPumpStore, [key]: value },
    })),
});
