interface BuildingIsolationCalcType {
  buildingIsolation: string;
  heatingType: {
    wool5cm: number;
    wool10cm: number;
    wool15cm: number;
    wool20cm: number;
    wool25cm: number;
  };
}
export function buildingIsolationCalc({
  input,
}: {
  input: BuildingIsolationCalcType;
}) {
  if (input.buildingIsolation === "Ocieplenie styropian / wełna 5 cm") {
    return input.heatingType.wool5cm;
  } else if (input.buildingIsolation === "Ocieplenie styropian / wełna 10 cm") {
    return input.heatingType.wool10cm;
  } else if (input.buildingIsolation === "Ocieplenie styropian / wełna 15 cm") {
    return input.heatingType.wool15cm;
  } else if (input.buildingIsolation === "Ocieplenie styropian / wełna 20 cm") {
    return input.heatingType.wool20cm;
  } else if (input.buildingIsolation === "Ocieplenie styropian / wełna 25 cm") {
    return input.heatingType.wool25cm;
  }
}

interface WindowLayersCalcType {
  windowLayers: string;
  windowLayerType: {
    window1glass: number;
    window2glass: number;
    window3glass: number;
  };
}
export function windowLayersCalc({ input }: { input: WindowLayersCalcType }) {
  if (input.windowLayers === "Okna ciepłe 1 szybowe") {
    return input.windowLayerType.window1glass;
  } else if (input.windowLayers === "Okna ciepłe 2 szybowe") {
    return input.windowLayerType.window2glass;
  } else if (input.windowLayers === "Okna ciepłe 3 szybowe") {
    return input.windowLayerType.window3glass;
  }
}

interface HeatLostType {
  H13: number;
  buildingIsolationCalc: number;
  windowLayersCalc: number;
  glazingTypeCalc: number;
  isolatedCeilingCalc: number;
  isolatedFloorCalc: number;
  isolatedDoorCalc: number;
}
export function heatLost({ input }: { input: HeatLostType }) {
  const summary =
    input.windowLayersCalc +
    input.buildingIsolationCalc +
    input.glazingTypeCalc +
    input.isolatedCeilingCalc +
    input.isolatedFloorCalc +
    input.isolatedDoorCalc;
  return input.H13 - summary;
}

interface KubaturaType {
  heatedArea: number;
  roomHeight: number;
}
export function kubatura({ input }: { input: KubaturaType }) {
  return input.heatedArea * (input.roomHeight / 100);
}

export * as default from "./index";
