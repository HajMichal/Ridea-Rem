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

interface D34Type {
  kubatura: number;
  heatLost: number;
  I30: number;
  H30: number;
}
export function D34({ input }: { input: D34Type }) {
  return input.kubatura * input.heatLost * (input.I30 - input.H30);
}

interface AssumedHeatNeedType {
  D34: number;
  kubatura: number;
}
export function assumedHeatNeed({ input }: { input: AssumedHeatNeedType }) {
  return input.D34 / input.kubatura;
}

interface AssumedHeatNeedPer1mType {
  assumedHeatNeed: number;
  roomHeight: number;
}
export function assumedHeatNeedPer1m({
  input,
}: {
  input: AssumedHeatNeedPer1mType;
}) {
  return (input.assumedHeatNeed * input.roomHeight) / 100;
}

export function G335() {
  const today = Date.now();
  const B138 = new Date("2023-10-30").getTime();
  if (today > B138) {
    return 7;
  } else {
    return 1;
  }
}

interface YearlyEnergeticCostType {
  D34: number;
  G335: number;
}
export function yearlyEnergeticCost({
  input,
}: {
  input: YearlyEnergeticCostType;
}) {
  return input.D34 * input.G335;
}

interface YearlyHeatingHomeCostType {
  currentFuelToHeat: string;
  yearlyEnergeticCost: number;
  buyPrize1Tonne: number;
  buyPrize1kWh: number;
}
// export function yearlyHeatingHomeCost({
//   input,
// }: {
//   input: YearlyHeatingHomeCostType;
// }) {
//   if (input.currentFuelToHeat === "Energia elektryczna") {
//     const D64 = input.buyPrize1kWh * 1000;
//     return (input.yearlyEnergeticCost * D64) / 1000;
//   } else if (input.currentFuelToHeat === "Węgiel kamienny") {
//     const J53 = 0;
//     const D53 = (input.buyPrize1Tonne + J53) / 1000;
//     // B53 stała dana, która będę pobierał z piliku json
//     const B65 = D53 / (B53 / 3600 / 1, 176);
//     const D65 = (B65 * 1000) / 0.6;
//     return (input.yearlyEnergeticCost * D65) / 1000;
//   } else if (input.currentFuelToHeat === "Miał węglowy 23 KWK Chwałowice") {
//     // const D54 = (input.buyPrize1Tonne+ J54)/1000
//     // B54 stała dana, która będę pobierał z piliku json
//     // const B66 = D54/((B54/3600)/1,176)
//     // const D66 = B66*1000/0.4
//     return (input.yearlyEnergeticCost * D66) / 1000;
//   } else if (input.currentFuelToHeat === "Flot 20 KWK Chwałowice") {
//     return (input.yearlyEnergeticCost * 0) / 1000;
//   } else if (input.currentFuelToHeat === "Groszek") {
//     // const D56 = (input.buyPrize1Tonne+ J56)/1000
//     // B56 stała dana, która będę pobierał z piliku json
//     // const B68 = D56/((B56/3600)/1,176)
//     // const D68 = B68*1000/0.7
//     return (input.yearlyEnergeticCost * D68) / 1000;
//   } else if (input.currentFuelToHeat === "Biomasa / Pelet") {
//     // const D57 = (input.buyPrize1Tonne+ J57)/1000
//     // B57 stała dana, która będę pobierał z piliku json
//     // const B69 = D57/((B57/3600)/1,176)
//     // const D69 = B69*1000/0.95
//     return (input.yearlyEnergeticCost * D69) / 1000;
//   } else if (input.currentFuelToHeat === "Olej opałowy") {
//     // const D58 = stała wartość z pliku json
//     // B58 stała dana, która będę pobierał z piliku json
//     // const B70 = D58/((B58/3600)/1,176)
//     // const D70 = B70*1000/0,7
//     return (input.yearlyEnergeticCost * D70) / 1000;
//   } else if (input.currentFuelToHeat === "Gaz płynny LPG") {
//     // const D59 = stała wartość z pliku json
//     // B59 stała dana, która będę pobierał z piliku json
//     // const B71 = D59/((B59/3600)/1,176)
//     // const D71 = B71*1000/0,4
//     return (input.yearlyEnergeticCost * D71) / 1000;
//   } else if (input.currentFuelToHeat === "Gaz ziemny") {
//     // const D60 = stała wartość z pliku json
//     // B60 stała dana, która będę pobierał z piliku json
//     // const B71 = D60/((B60/3600)/1,176)
//     // const D72 = B72*1000/0,99
//     return (input.yearlyEnergeticCost * D72) / 1000;
//   } else if (input.currentFuelToHeat === "Pompa ciepła COP= wg. J13") {
//     // I38 to stała wartość z pliku JSON
//     // const B74 = input.buyPrize1kWh / I38
//     // const D74 = B74 * 1000
//     return (input.yearlyEnergeticCost * D74) / 1000;
//   } else if (input.currentFuelToHeat === "Kolektory słoneczne") {
//     return (input.yearlyEnergeticCost * 0) / 1000;
//   } else if (input.currentFuelToHeat === "PEC") {
//     //  D61 to stała wartość z pliku json
//     // const D76 = D61/277,78*1000/0.95
//     return (input.yearlyEnergeticCost * D76) / 1000;
//   }
// }

interface BufforCostType {
  bufforType: string;
  buffors: {
    bufory100l: {
      przylaczeSchemat17: number;
      przylaczeSchemat24: number;
      przylaczeSchemat34: number;
    };
    bufory300l: {
      przylaczeSchemat17: number;
      przylaczeSchemat24: number;
      przylaczeSchemat34: number;
    };
    bufory500l: {
      przylaczeSchemat17: number;
      przylaczeSchemat24: number;
      przylaczeSchemat34: number;
    };
  };
}
export function bufforCost({ input }: { input: BufforCostType }) {
  if (input.bufforType === "Bufor 100l Szeregowo przyłącze schemat 17") {
    return input.buffors.bufory100l.przylaczeSchemat17;
  } else if (input.bufforType === "Bufor 100l Szeregowo przyłącze schemat 24") {
    return input.buffors.bufory100l.przylaczeSchemat24;
  } else if (input.bufforType === "Bufor 100l Szeregowo przyłącze schemat 34") {
    return input.buffors.bufory100l.przylaczeSchemat34;
  } else if (input.bufforType === "Bufor 300l Szeregowo przyłącze schemat 17") {
    return input.buffors.bufory300l.przylaczeSchemat17;
  } else if (input.bufforType === "Bufor 300l Szeregowo przyłącze schemat 24") {
    return input.buffors.bufory300l.przylaczeSchemat24;
  } else if (input.bufforType === "Bufor 300l Szeregowo przyłącze schemat 34") {
    return input.buffors.bufory300l.przylaczeSchemat34;
  } else if (input.bufforType === "Bufor 500l Szeregowo przyłącze schemat 17") {
    return input.buffors.bufory500l.przylaczeSchemat17;
  } else if (input.bufforType === "Bufor 500l Szeregowo przyłącze schemat 24") {
    return input.buffors.bufory500l.przylaczeSchemat24;
  } else if (input.bufforType === "Bufor 500l Szeregowo przyłącze schemat 34") {
    return input.buffors.bufory500l.przylaczeSchemat34;
  }
}
interface MontageAnotherPumpInCascadeType {
  isChoosed: boolean;
  montageCost: number;
}
export function montageAnotherPumpInCascade({
  input,
}: {
  input: MontageAnotherPumpInCascadeType;
}) {
  if (!input.isChoosed) return 0;
  return input.montageCost;
}

interface PlacementWithBurstType {
  isChoosed: boolean;
  placementCost: number;
}

export function placementWithBurst({
  input,
}: {
  input: PlacementWithBurstType;
}) {
  if (!input.isChoosed) return 0;
  return input.placementCost;
}
interface NewDrillingsType {
  isChoosed: boolean;
  newDrillingsCost: number;
}

export function newDrillings({ input }: { input: NewDrillingsType }) {
  if (!input.isChoosed) return 0;
  return input.newDrillingsCost;
}
interface LongerIsolationFromMineralWoolType {
  isolationLength: number;
  longerIsolationFromMineralWoolCost: number;
}
export function longerIsolationFromMineralWool({
  input,
}: {
  input: LongerIsolationFromMineralWoolType;
}) {
  return input.isolationLength * input.longerIsolationFromMineralWoolCost;
}
interface PreisolatedPipeType {
  isChoosed: boolean;
  preisolatedPipeCost: number;
}
export function preisolatedPipe({ input }: { input: PreisolatedPipeType }) {
  if (!input.isChoosed) return 0;
  return input.preisolatedPipeCost;
}
interface LongerPreIsolatedPipeType {
  preIsolationLength: number;
  preIsolationCost: number;
}
export function longerPreIsolatedPipe({
  input,
}: {
  input: LongerPreIsolatedPipeType;
}) {
  return input.preIsolationLength * input.preIsolationCost;
}

interface CirculationMontageType {
  isChoosed: boolean;
  circulationCost: number;
}
export function circulationMontage({
  input,
}: {
  input: CirculationMontageType;
}) {
  if (!input.isChoosed) return 0;
  return input.circulationCost;
}
interface DemontageOldBoilerType {
  isChoosed: boolean;
  demontageCost: number;
}
export function demontageOldBoiler({
  input,
}: {
  input: DemontageOldBoilerType;
}) {
  if (!input.isChoosed) return 0;
  return input.demontageCost;
}
interface CleanPlacementType {
  isChoosed: boolean;
  cleaningCost: number;
}
export function cleanPlacement({ input }: { input: CleanPlacementType }) {
  if (!input.isChoosed) return 0;
  return input.cleaningCost;
}
interface MoveCwuType {
  isChoosed: boolean;
  moveCwuCost: number;
}
export function moveCwu({ input }: { input: MoveCwuType }) {
  if (!input.isChoosed) return 0;
  return input.moveCwuCost;
}
interface MakeEnergeticConnectionType {
  isChoosed: boolean;
  energeticConnectionCost: number;
}
export function makeEnergeticConnection({
  input,
}: {
  input: MakeEnergeticConnectionType;
}) {
  if (!input.isChoosed) return 0;
  return input.energeticConnectionCost;
}
interface BuforWithSupportType {
  isChoosed: boolean;
  buforWithSupportCost: number;
}
export function buforWithSupport({ input }: { input: BuforWithSupportType }) {
  if (!input.isChoosed) return 0;
  return input.buforWithSupportCost;
}
interface CloseOpenedSystemType {
  isChoosed: boolean;
  closeSystemCost: number;
}
export function closeOpenedSystem({ input }: { input: CloseOpenedSystemType }) {
  if (!input.isChoosed) return 0;
  return input.closeSystemCost;
}

interface HeatPumpCostType {
  kWFeeAmount: number;
  imposedFee: number;
  consultantMarkup: number;
  heatPumpCost: { cena: number; mnozik_prowizji: number };
}
export function heatPumpCostAndKwFee({ input }: { input: HeatPumpCostType }) {
  return {
    heatPumpCost: input.heatPumpCost.cena,
    kwFeeCost: input.heatPumpCost.mnozik_prowizji * input.kWFeeAmount,
    consultantMarkupCost:
      input.heatPumpCost.mnozik_prowizji * input.consultantMarkup,
    netPriceForHeatPump:
      input.heatPumpCost.cena +
      input.heatPumpCost.mnozik_prowizji * input.kWFeeAmount +
      input.heatPumpCost.mnozik_prowizji * input.consultantMarkup +
      input.imposedFee,
  };
}

interface AddonsSumCost {
  montagePumpInCascadeCost: number;
  placementWithBurstCost: number;
  newDrillingsCost: number;
  longerIsolationFromMineralWoolCost: number;
  preisolatedPipeCost: number;
  longerPreIsolatedPipeCost: number;
  circulationMontageCost: number;
  demontageOldBoilerCost: number;
  cleanPlacementCost: number;
  moveCwuCost: number;
  energeticConnectionCost: number;
  buforWithSupportCost: number;
  closeOpenedSystemCost: number;
}
export function addonsSumCost({ input }: { input: AddonsSumCost }) {
  return (
    input.montagePumpInCascadeCost +
    input.placementWithBurstCost +
    input.newDrillingsCost +
    input.longerIsolationFromMineralWoolCost +
    input.preisolatedPipeCost +
    input.longerPreIsolatedPipeCost +
    input.circulationMontageCost +
    input.demontageOldBoilerCost +
    input.cleanPlacementCost +
    input.moveCwuCost +
    input.energeticConnectionCost +
    input.buforWithSupportCost +
    input.closeOpenedSystemCost
  );
}

interface HeatPumpPricingBeforeDotationsType {
  addonsSumCost: number;
  netPriceForHeatPump: number;
  buforCost: number;
  vat: number;
}
export function heatPumpPricingBeforeDotations({
  input,
}: {
  input: HeatPumpPricingBeforeDotationsType;
}) {
  const netSystemValue =
    input.addonsSumCost + input.buforCost + input.netPriceForHeatPump;
  const vatValue = netSystemValue * input.vat;
  const grossSystemValue = netSystemValue + vatValue;
  return {
    netSystemValue: Number(netSystemValue.toFixed(2)),
    vatValue: Number(vatValue.toFixed(2)),
    grossSystemValue: Number(grossSystemValue.toFixed(2)),
  };
}

interface TermoModernizationRelifType {
  netSystemValue: number;
  heatPumpDotation: number;
  dotationModernizationCoCwu: number;
}
export function termoModernizationRelif({
  input,
}: {
  input: TermoModernizationRelifType;
}) {
  const calcualtion =
    (input.netSystemValue -
      input.heatPumpDotation -
      input.dotationModernizationCoCwu) *
    0.12;
  if (calcualtion < 0) return 0;
  else {
    return Number(
      (
        (input.netSystemValue -
          input.heatPumpDotation -
          input.dotationModernizationCoCwu) *
        0.12
      ).toFixed(2)
    );
  }
}
interface FinallGrossInstalationCostType {
  grossSystemValue: number;
  heatPumpDotation: number;
  dotationModernizationCoCwu: number;
  termoModernizationRelifAmount: number;
}
export function finallGrossInstalationCost({
  input,
}: {
  input: FinallGrossInstalationCostType;
}) {
  const finallInstaltionCost = Number(
    (
      input.grossSystemValue -
      input.dotationModernizationCoCwu -
      input.heatPumpDotation -
      input.termoModernizationRelifAmount
    ).toFixed(2)
  );

  if (finallInstaltionCost < 0) return 0;
  else if (finallInstaltionCost > 0) return finallInstaltionCost;
}

interface HeatStoreDotationValueType {
  modernizationDotation: number;
  heatStoreDotation: number;
}
export function heatStoreDotationValue({
  input,
}: {
  input: HeatStoreDotationValueType;
}) {
  return {
    heatStoreDotationValue: input.heatStoreDotation,
    modernizationDotation: input.modernizationDotation,
    dotationSum: input.heatStoreDotation + input.modernizationDotation,
  };
}
interface LoanForPurcharseType {
  finall_installation_cost: number;
  creditPercentage: number;
  instalmentNumber: number;
  grossInstalltaionBeforeDotationsCost: number;
}
export function loanForPurcharse({ input }: { input: LoanForPurcharseType }) {
  const monthlyInterestRate = input.creditPercentage / 12 / 100;

  const monthlyPaymentBeforeDotations =
    (input.grossInstalltaionBeforeDotationsCost * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -input.instalmentNumber));

  const monthlyPayment =
    (input.finall_installation_cost * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -input.instalmentNumber));
  return {
    finallInstalmentPice: Number(monthlyPayment.toFixed(2)),
    instalmentBeforeDotations: Number(monthlyPaymentBeforeDotations.toFixed(2)),
  };
}

interface HeatingWithHeatPumpType {
  yearlyHeatingUsage: number;
  cop: number;
  priceOf1kWh: number;
}
export function heatingWithHeatPump({
  input,
}: {
  input: HeatingWithHeatPumpType;
}) {
  return {
    heatingWithHeatPumpCost: Number(
      ((input.yearlyHeatingUsage / input.cop) * input.priceOf1kWh).toFixed(2)
    ),
    heatPumpUsage: Number((input.yearlyHeatingUsage / input.cop).toFixed(2)),
  };
}
export * as default from "./index";
