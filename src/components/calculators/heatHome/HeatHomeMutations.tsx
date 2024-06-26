import { useEffect } from "react";
import { useHeatHome } from "~/hooks/useHeatHome";
import { type Session } from "next-auth";
import { AUDIT_DOTATION } from "~/constans/heatHome/dotations";

interface HeatHomeMutationsType {
  sessionData: Session | null;
}

export const HeatHomeMutations = ({ sessionData }: HeatHomeMutationsType) => {
  const { jsonData, mutations, heatHomeStore, heatHomeCalcStore } =
    useHeatHome();

  useEffect(() => {
    if (jsonData)
      mutations.setHeatedAreaCost({
        area: heatHomeStore.areaToHeat,
        cost: jsonData.m2_ocieplenia,
        markup: heatHomeCalcStore.markupCosts.markupSumValue,
      });
  }, [
    heatHomeStore.areaToHeat,
    jsonData?.m2_ocieplenia,
    heatHomeCalcStore.markupCosts.markupSumValue,
  ]);
  useEffect(() => {
    if (jsonData)
      mutations.setWindowSillCost({
        area: heatHomeStore.windowSillCount,
        cost: jsonData.parapety,
      });
  }, [heatHomeStore.windowSillCount, jsonData?.parapety]);

  useEffect(() => {
    if (jsonData)
      mutations.setPlasterAreaCost({
        area: heatHomeStore.plasterArea,
        cost: jsonData.tynk,
      });
  }, [heatHomeStore.plasterArea, jsonData?.tynk]);

  useEffect(() => {
    if (jsonData)
      mutations.setTopFinishCost({
        area: heatHomeStore.topFinish,
        cost: jsonData.wykonczenie,
      });
  }, [heatHomeStore.topFinish, jsonData?.wykonczenie]);

  useEffect(() => {
    if (sessionData?.user) {
      mutations.setMarkupCosts({
        officeFee: sessionData?.user.feePerkwHeatHome,
        constantFee: sessionData.user.imposedFeeHeatHome,
        consultantFee: heatHomeStore.consultantMarkup,
        heatingArea: heatHomeStore.areaToHeat,
        creatorId: sessionData.user.creatorId ?? "",
      });
    }
  }, [
    sessionData?.user.imposedFeeHeatHome,
    sessionData?.user.feePerkwHeatHome,
    heatHomeStore.consultantMarkup,
    heatHomeStore.areaToHeat,
  ]);

  useEffect(() => {
    if (jsonData)
      mutations.setTotalCost({
        heatingThickness: heatHomeCalcStore.heatingThicknessCost,
        heatingArea: heatHomeCalcStore.heatedAreaCost,
        windowSills: heatHomeCalcStore.windowSillCost,
        plaster: heatHomeCalcStore.plasterAreaCost,
        finishTop: heatHomeCalcStore.topFinishCost,
        additionalAmount: heatHomeStore.additionalAmount,
      });
  }, [
    heatHomeCalcStore.heatingThicknessCost,
    heatHomeCalcStore.heatedAreaCost,
    heatHomeCalcStore.windowSillCost,
    heatHomeCalcStore.plasterAreaCost,
    heatHomeCalcStore.topFinishCost,
    heatHomeStore.additionalAmount,
    heatHomeCalcStore.markupCosts,
  ]);
  useEffect(() => {
    mutations.setDotationValue({
      dotationStep: heatHomeStore.dotationStep,
      totalCost: heatHomeCalcStore.totalCost.nett,
    });
  }, [heatHomeStore.dotationStep, heatHomeCalcStore.totalCost]);

  useEffect(() => {
    mutations.setAmountAfterDotation({
      dotationValue: heatHomeCalcStore.dotationValue + AUDIT_DOTATION,
      totalCost: heatHomeCalcStore.totalCost.gross,
    });
  }, [heatHomeCalcStore.totalCost, heatHomeCalcStore.dotationValue]);

  useEffect(() => {
    mutations.setTermoModernization({
      amountAfterDotation: heatHomeCalcStore.amountAfterDotation,
    });
  }, [heatHomeCalcStore.amountAfterDotation]);
  useEffect(() => {
    mutations.setFinallPrice({
      amountAfterDotation: heatHomeCalcStore.amountAfterDotation,
      termoModernization: heatHomeCalcStore.termoModernization,
    });
  }, [
    heatHomeCalcStore.amountAfterDotation,
    heatHomeCalcStore.termoModernization,
  ]);
  useEffect(() => {
    const creditPercentage = sessionStorage.getItem("creditPercentage");

    if (jsonData && creditPercentage)
      mutations.setLoanForpurcharse({
        creditPercentage: Number(JSON.parse(creditPercentage)),
        instalmentNumber: heatHomeStore.installmentNumber,
        finall_installation_cost: heatHomeCalcStore.amountAfterDotation,
        grossInstalltaionBeforeDotationsCost: heatHomeCalcStore.totalCost.gross,
      });
  }, [
    heatHomeStore.installmentNumber,
    heatHomeCalcStore.amountAfterDotation,
    heatHomeCalcStore.totalCost,
  ]);

  useEffect(() => {
    if (jsonData) {
      mutations.setEneregeticAuditCost({
        isAudit: heatHomeStore.isEnergeticAudit,
        auditCost: jsonData.audytEnergetyczny,
      });
    }
  }, [jsonData?.audytEnergetyczny, heatHomeStore.isEnergeticAudit]);
};
