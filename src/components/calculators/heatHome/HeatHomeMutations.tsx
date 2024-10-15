import { useEffect } from "react";
import { useHeatHome } from "~/hooks/useHeatHome";
import { type Session } from "next-auth";
import { AUDIT_DOTATION } from "~/constans/heatHome/dotations";
import useStore from "~/store";
import { type HeatHomeDataCalculationType } from "~/server/api/routers/heatHome/interfaces";

interface HeatHomeMutationsType {
  sessionData: Session | null;
  heatHomeData?: HeatHomeDataCalculationType;
}

export const HeatHomeMutations = ({
  sessionData,
  heatHomeData,
}: HeatHomeMutationsType) => {
  const store = useStore();
  const { mutations, heatHomeStore, heatHomeCalcStore } = useHeatHome();

  useEffect(() => {
    if (heatHomeData)
      mutations.setHeatedAreaCost({
        area: heatHomeStore.areaToHeat,
        cost: heatHomeData.m2_ocieplenia,
        markup: heatHomeCalcStore.markupCosts.markupSumValue,
      });
  }, [
    heatHomeStore.areaToHeat,
    heatHomeData?.m2_ocieplenia,
    heatHomeCalcStore.markupCosts.markupSumValue,
  ]);
  useEffect(() => {
    if (heatHomeData)
      mutations.setWindowSillCost({
        area: heatHomeStore.windowSillCount,
        cost: heatHomeData.parapety,
      });
  }, [heatHomeStore.windowSillCount, heatHomeData?.parapety]);

  useEffect(() => {
    if (heatHomeData)
      mutations.setPlasterAreaCost({
        area: heatHomeStore.plasterArea,
        cost: heatHomeData.tynk,
      });
  }, [heatHomeStore.plasterArea, heatHomeData?.tynk]);

  useEffect(() => {
    if (heatHomeData)
      mutations.setTopFinishCost({
        area: heatHomeStore.topFinish,
        cost: heatHomeData.wykonczenie,
      });
  }, [heatHomeStore.topFinish, heatHomeData?.wykonczenie]);

  useEffect(() => {
    if (sessionData?.user) {
      mutations.setMarkupCosts({
        officeFee: sessionData?.user.feePerkwHeatHome,
        constantFee: sessionData.user.imposedFeeHeatHome,
        consultantFee: store.markupAmount,
        hasUserContract: store.hasContract,
        heatingArea: heatHomeStore.areaToHeat,
        creatorId: sessionData.user.creatorId ?? "",
      });
    }
  }, [
    sessionData?.user.imposedFeeHeatHome,
    sessionData?.user.feePerkwHeatHome,
    store.markupAmount,
    store.hasContract,
    heatHomeStore.areaToHeat,
  ]);

  useEffect(() => {
    if (heatHomeData)
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

    if (heatHomeData && creditPercentage)
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
    if (heatHomeData) {
      mutations.setEneregeticAuditCost({
        isAudit: heatHomeStore.isEnergeticAudit,
        auditCost: heatHomeData.audytEnergetyczny,
      });
    }
  }, [heatHomeData?.audytEnergetyczny, heatHomeStore.isEnergeticAudit]);
};
