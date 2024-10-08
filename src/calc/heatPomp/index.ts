interface BufforCostType {
  bufforType: string;
  buffors: Record<string, number>;
}
export function bufforCost({ input }: { input: BufforCostType }) {
  return input.buffors[input.bufforType];
}

interface SetAddonCostWithLengthType {
  length: number;
  elementCost: number;
}
export function setAddonCostWithLength({
  input,
}: {
  input: SetAddonCostWithLengthType;
}) {
  return input.length * input.elementCost;
}

interface SetAddonCostType {
  isChoosed: boolean;
  elementCost: number;
}
export function setAddonCost({ input }: { input: SetAddonCostType }) {
  if (!input.isChoosed) return 0;
  return input.elementCost;
}

interface HeatPumpCostType {
  heatPumpCost: number;
}
export function heatPumpCost({ input }: { input: HeatPumpCostType }) {
  return input.heatPumpCost;
}

interface AddonsSumCost {
  montagePumpInCascadeCost: number;
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
  auditCost: number;
  markupSumValue: number;
}
export function addonsSumCost({ input }: { input: AddonsSumCost }) {
  return (
    input.montagePumpInCascadeCost +
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
    input.closeOpenedSystemCost +
    input.auditCost +
    input.markupSumValue
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

export * as default from "./index";
