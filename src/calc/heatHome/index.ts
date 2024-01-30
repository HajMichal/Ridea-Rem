export * as default from "./index";
import staticData from "../../static";
interface AddonCostCounterType {
  area: number;
  cost: number;
  markup?: number;
}
export function addonCostCounter({ input }: { input: AddonCostCounterType }) {
  if (input.markup) {
    return Number((input.area * input.cost + input.markup).toFixed(2));
  } else {
    return Number((input.area * input.cost).toFixed(2));
  }
}

interface TotalCostsType {
  heatingThickness: number;
  heatingArea: number;
  windowSills: number;
  plaster: number;
  finishTop: number;
  additionalAmount: number;
}
export function totalCosts({ input }: { input: TotalCostsType }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const nett: number = Object.values(input).reduce(
    (acc: number, val: number) => acc + val,
    0
  );
  const vatValue = Number((nett * staticData.VATRATE).toFixed(2));
  return { nett: Number(nett), gross: Number(nett + vatValue), vat: vatValue };
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

interface FinallCostType {
  dotationValue: number;
  totalCost: number;
}
export function finallCost({ input }: { input: FinallCostType }) {
  const { totalCost, dotationValue } = input;
  const diff = totalCost - dotationValue;
  if (diff <= 0) return 0;
  else return Number(diff.toFixed(2));
}
