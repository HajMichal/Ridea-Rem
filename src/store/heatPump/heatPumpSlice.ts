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

export interface HeatPumpSlice {
  heatPumpStore: {
    auditHeatSupply: boolean;
    isBufor: boolean;
    isVoucher: boolean;
    isFee: boolean;
    forCompany: boolean;
    steeringModuleLCD: boolean;
    isLongerGuarantee: boolean;
    isAnotherHeatPumpInCascade: boolean;
    isPumpPlacementOnCobblestone: boolean;
    newDrillings: boolean;
    isPreIsolatedPipe: boolean;
    isMontageCirculationCWU: boolean;
    demontageOldBoiler: boolean;
    cleanMontagePlacement: boolean;
    moveCwu: boolean;
    makeEnergeticConnection: boolean;
    mergeNewBufforWithOld: boolean;
    closingOpenSytem: boolean;
    isEnergeticAudit: boolean;

    longerPreIsolatedPipe: number;
    longerIsolationFromMineralWool: number;
    oneTonneOfResourceCost: number;
    minimalWorkingTemp: number;
    yearlyHeatingHomeCost: number;
    consultantMarkup: number;
    installmentNumber: number;

    suggestedPump: PumpsOffer | "";
    buforType: BuforTypes | "";
    currentFuelToHeat: currentFuelToHeat;
    choosedHeatPumpDotation: "prog1" | "prog2" | "prog3" | "mojPrad";
  };
  updateHeatPump: (key: string, value: boolean | number | string) => void;
}

export const heatPumpSlice: StateCreator<HeatPumpSlice> = (set) => ({
  heatPumpStore: {
    auditHeatSupply: false,
    isBufor: false,
    isVoucher: false,
    isFee: false,
    forCompany: false,
    steeringModuleLCD: false,
    isLongerGuarantee: false,
    isAnotherHeatPumpInCascade: false,
    isPumpPlacementOnCobblestone: false,
    newDrillings: false,
    isPreIsolatedPipe: false,
    isMontageCirculationCWU: false,
    demontageOldBoiler: false,
    cleanMontagePlacement: false,
    moveCwu: false,
    makeEnergeticConnection: false,
    mergeNewBufforWithOld: false,
    closingOpenSytem: false,
    isEnergeticAudit: true,

    yearlyHeatingHomeCost: 0,
    longerPreIsolatedPipe: 0,
    oneTonneOfResourceCost: 0,
    longerIsolationFromMineralWool: 0,
    minimalWorkingTemp: -7,
    consultantMarkup: 0,

    installmentNumber: 120,

    buforType: "",
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
