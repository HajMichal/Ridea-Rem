import { StateCreator } from "zustand";

type currentFuelToHeat =
  | "ENERGIA ELEKTRYCZNA"
  | "WĘGIEL KAMIENNY"
  | "MIAŁ WĘGLOWY 23 KWK CHWAŁOWICE"
  | "FLOT 20 KWK CHWAŁOWICE"
  | "GROSZEK"
  | "BIOMASA / PELET"
  | "OLEJ OPAŁOWY"
  | "GAZ PŁYNNY LPG"
  | "GAZ ZIEMNY"
  | "POMPA CIEPŁA COP= WG. J13"
  | "KOLEKTORY SŁONECZNE"
  | "PEC";

export type BuildingIsolationTypes =
  | "OCIEPLENIE STYROPIAN / WEŁNA 5 CM"
  | "OCIEPLENIE STYROPIAN / WEŁNA 10 CM"
  | "OCIEPLENIE STYROPIAN / WEŁNA 15 CM"
  | "OCIEPLENIE STYROPIAN / WEŁNA 20 CM"
  | "OCIEPLENIE STYROPIAN / WEŁNA 25 CM";
type WindowLayersTypes =
  | "OKNA CIEPŁE 1 SZYBOWE"
  | "OKNA CIEPŁE 2 SZYBOWE"
  | "OKNA CIEPŁE 3 SZYBOWE";

type PumpsOffer =
  | "Z-PRO.5.3/4.Mitsubishi.Inv.11-16"
  | "Z-PRO.5.3/4.Mitsubishi.IHO.11-16"
  | "SAT.6.3.Danfoss.Inv.14-23"
  | "SAT.6.3.Danfoss.IHO.14-24"
  | "SAT.ELI.8.2.P19i.17-29"
  | "SAT.ELI.8.3.P23i.20-32"
  | "SAT.ELI.8.3.P26i.23-34"
  | "SAT.ELI.8.3.P30i.25-37"
  | "SAT.ELI.8.2.P19iHO.25-35"
  | "SAT.ELI.8.3.P23iHO.30-41"
  | "SAT.ELI.8.3.P26iHO.35-45"
  | "SAT.ELI.8.3.P30iHO.37-48";
export interface HeatPumpSliceType {
  heatPumpStore: {
    glazingType: "STANDARDOWE PRZESZKLENIA" | "DUŻE PRZESZKLENIA";
    isolatedCeiling: "NIEIZOLOWANY STROP" | "IZOLOWANY STROP";
    isolatedFloor: "NIEIZOLOWANA PODŁOGA" | "IZOLOWANA PODŁOGA";
    isolatedDoor: "NIEIZOLOWANE DRZWI" | "IZOLOWANE DRZWI";
    heatersType:
      | "GRZEJNIKI WYSOKOTEMPERATUROWE"
      | "GRZEJNIKI NISKOTEMPERATUROWE";
    auditHeatSupply: boolean;
    isBufor300L: boolean;
    isVoucher: boolean;
    isFee: boolean;
    forCompany: boolean;
    steeringModuleLCD: boolean;
    isLongerGuarantee: boolean;
    isAnotherHeatPumpInCascade: boolean;
    isPumpPlacementOnCobblestone: boolean;
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

    suggestedPumpPower: number;
    longerPreIsolatedPipe: number;
    longerIsolationFromMineralWool: number;
    oneTonneOfResourceCost: number;
    heatedArea: number;
    roomHeight: number;
    minimalWorkingTemp: number;
    yearlyHeatingHomeCost: number;

    suggestedPump: PumpsOffer;

    windowLayers: WindowLayersTypes;
    buildingIsolation: BuildingIsolationTypes;
    currentFuelToHeat: currentFuelToHeat;
  };
  updateHeatPump: (key: string, value: boolean | number | string) => void;
}

export const heatPumpSlice: StateCreator<HeatPumpSliceType> = (set) => ({
  heatPumpStore: {
    glazingType: "STANDARDOWE PRZESZKLENIA",
    isolatedCeiling: "IZOLOWANY STROP",
    isolatedFloor: "IZOLOWANA PODŁOGA",
    isolatedDoor: "IZOLOWANE DRZWI",
    heatersType: "GRZEJNIKI NISKOTEMPERATUROWE",
    auditHeatSupply: false, //C140
    isBufor300L: false, //C141
    isVoucher: false, //C142
    isFee: false, // C143
    forCompany: false, // C144
    steeringModuleLCD: false, // C145
    isLongerGuarantee: false, // C146
    isAnotherHeatPumpInCascade: false, // C150
    isPumpPlacementOnCobblestone: false, // C151
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

    yearlyHeatingHomeCost: 5000,
    suggestedPumpPower: 0,
    longerPreIsolatedPipe: 0, // C158
    oneTonneOfResourceCost: 0,
    longerIsolationFromMineralWool: 0, // C156
    heatedArea: 0,
    roomHeight: 0,
    windowLayers: "OKNA CIEPŁE 2 SZYBOWE",
    minimalWorkingTemp: -7,

    buildingIsolation: "OCIEPLENIE STYROPIAN / WEŁNA 5 CM",
    currentFuelToHeat: "WĘGIEL KAMIENNY",
    suggestedPump: "Z-PRO.5.3/4.Mitsubishi.Inv.11-16",
  },
  updateHeatPump: (key, value) =>
    set((state) => ({
      ...state,
      heatPumpStore: { ...state.heatPumpStore, [key]: value },
    })),
});
