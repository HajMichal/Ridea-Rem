import { type StateCreator } from "zustand";

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

export type PumpsOffer =
  | "JGB2-PC10KW"
  | "JGB2-PC15KW"
  | "LAZAR-HTi20V8KW"
  | "LAZAR-HTi20V12KW"
  | "LAZAR-HTi20V16KW"
  | "ZEO-VCP-PRO10KW"
  | "ZEO-VCP-PRO15KW"
  | "ZEO-VCP-H4516KW"
  | "ZEO-SATELLITE16KW"
  | "POMPACIEPLA-czystepowietrze";

type BuforTypes =
  | "Bufor 100l Szeregowo przyłącze schemat 17"
  | "Bufor 100l Szeregowo przyłącze schemat 24"
  | "Bufor 100l Szeregowo przyłącze schemat 34"
  | "Bufor 300l Szeregowo przyłącze schemat 17"
  | "Bufor 300l Szeregowo przyłącze schemat 24"
  | "Bufor 300l Szeregowo przyłącze schemat 34"
  | "Bufor 500l Szeregowo przyłącze schemat 17"
  | "Bufor 500l Szeregowo przyłącze schemat 24"
  | "Bufor 500l Szeregowo przyłącze schemat 34";
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
    isBufor: boolean;
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
    consultantMarkup: number;
    installmentNumber: number;

    suggestedPump: PumpsOffer | "";
    buforType: BuforTypes | "";
    windowLayers: WindowLayersTypes;
    buildingIsolation: BuildingIsolationTypes;
    currentFuelToHeat: currentFuelToHeat;
    yearlyHeatingUsage: number;
    choosedHeatPumpDotation: "prog1" | "prog2" | "prog3" | "mojPrad";
  };
  updateHeatPump: (key: string, value: boolean | number | string) => void;
}

export const heatPumpSlice: StateCreator<HeatPumpSliceType> = (set) => ({
  heatPumpStore: {
    auditHeatSupply: false, //C140
    isBufor: false, //C141
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

    yearlyHeatingHomeCost: 0,
    suggestedPumpPower: 0,
    longerPreIsolatedPipe: 0, // C158
    oneTonneOfResourceCost: 0,
    longerIsolationFromMineralWool: 0, // C156
    heatedArea: 0,
    roomHeight: 0,
    minimalWorkingTemp: -7,
    consultantMarkup: 0,
    yearlyHeatingUsage: 0,
    installmentNumber: 120,

    glazingType: "STANDARDOWE PRZESZKLENIA",
    isolatedCeiling: "IZOLOWANY STROP",
    isolatedFloor: "IZOLOWANA PODŁOGA",
    isolatedDoor: "IZOLOWANE DRZWI",
    heatersType: "GRZEJNIKI NISKOTEMPERATUROWE",
    windowLayers: "OKNA CIEPŁE 2 SZYBOWE",
    buforType: "",
    buildingIsolation: "OCIEPLENIE STYROPIAN / WEŁNA 5 CM",
    currentFuelToHeat: "WĘGIEL KAMIENNY",
    suggestedPump: "",
    choosedHeatPumpDotation: "prog1",
  },
  updateHeatPump: (key, value) =>
    set((state) => ({
      ...state,
      heatPumpStore: { ...state.heatPumpStore, [key]: value },
    })),
});
