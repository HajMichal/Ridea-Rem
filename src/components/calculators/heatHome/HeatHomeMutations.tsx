import { useEffect } from "react";
import { useHeatHome } from "~/hooks/useHeatHome";
import { type Session } from "next-auth";

interface HeatHomeMutationsType {
  sessionData: Session | null;
}

const HeatHomeMutations = ({ sessionData }: HeatHomeMutationsType) => {
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
      mutations.setHeatingThicknessCost({
        area: heatHomeStore.areaToHeat,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        cost: jsonData.grubosciOcieplenia[heatHomeStore.heatThickness!],
      });
  }, [heatHomeStore.areaToHeat, heatHomeStore.heatThickness]);
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
    mutations.setFinallCost({
      dotationValue: heatHomeCalcStore.dotationValue,
      totalCost: heatHomeCalcStore.totalCost.gross,
    });
  }, [heatHomeCalcStore.totalCost, heatHomeCalcStore.dotationValue]);
};

export default HeatHomeMutations;
