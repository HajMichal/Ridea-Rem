export * as default from "./index";
import { tax8 } from "~/constans/taxPercentage";
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
  if (dotationStep === "prog1") {
    const dotationValue = Number((0.5 * totalCost).toFixed(2));
    if (dotationValue > 33000) return 33000;
    else return dotationValue;
  }
  if (dotationStep === "prog2") {
    const dotationValue = Number((0.75 * totalCost).toFixed(2));
    if (dotationValue > 48000) return 48000;
    else return dotationValue;
  }
  if (dotationStep === "prog3")
    if (totalCost > 70000) return 70000;
    else return totalCost;
}

interface AmountAfterDotationType {
  dotationValue: number;
  totalCost: number;
}
export function amountAfterDotation({
  input,
}: {
  input: AmountAfterDotationType;
}) {
  const { totalCost, dotationValue } = input;
  const diff = totalCost - dotationValue;
  if (diff <= 0) return 0;
  else return Number(diff.toFixed(2));
}

interface TermoModernizationType {
  amountAfterDotation: number;
}
export function termoModernization({
  input,
}: {
  input: TermoModernizationType;
}) {
  return Number((input.amountAfterDotation * tax8).toFixed(2));
}

interface FinallPriceType {
  amountAfterDotation: number;
  termoModernization: number;
}
export function finallPrice({ input }: { input: FinallPriceType }) {
  return Number(
    (input.amountAfterDotation - input.termoModernization).toFixed(2)
  );
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

interface EneregeticAuditCostType {
  auditCost: number;
  isAudit: boolean;
}
export function eneregeticAuditCost({
  input,
}: {
  input: EneregeticAuditCostType;
}) {
  if (input.isAudit) return Number((input.auditCost * 1.23).toFixed(2));
  else return 0;
}
