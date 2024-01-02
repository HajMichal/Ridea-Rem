export * as default from "./index";

interface AddonCostCounterType {
  area: number;
  cost: number;
}
export function addonCostCounter({ input }: { input: AddonCostCounterType }) {
  return Number((input.area * input.cost).toFixed(2));
}

interface TotalCostsType {
  heatingThickness: number;
  heatingArea: number;
  windowSills: number;
  plaster: number;
  finishTop: number;
  additionalAmount: number;
  markupSum: number;
}
export function totalCosts({ input }: { input: TotalCostsType }) {
  const sum = Object.values(input).reduce((acc, val) => acc + val, 0);
  return Number(sum);
}

interface DotationValueType {
  totalCost: number;
  dotationStep: string;
}
export function dotationValue({ input }: { input: DotationValueType }) {
  const { dotationStep, totalCost } = input;
  if (dotationStep === "prog0") return 0;
  if (dotationStep === "prog1") return Number((0.5 * totalCost).toFixed(2));
  if (dotationStep === "prog2") return Number((0.7 * totalCost).toFixed(2));
  if (dotationStep === "prog3") return totalCost;
}
