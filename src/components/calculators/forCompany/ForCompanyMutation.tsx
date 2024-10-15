import { useEffect, useRef } from "react";
import { useForCompany } from "~/hooks/useForCompany";
import { type ForCompanyDataToCalcualtionType } from "~/server/api/routers/forCompany/interfaces";
import { type Session } from "next-auth";
import {
  largestPanel,
  mediumPanel,
  smallestPanel,
} from "~/constans/panelPowers";
import useStore from "~/store";

interface ForCompanyMutationType {
  data?: ForCompanyDataToCalcualtionType;
  sessionData: Session | null;
}

export const ForCompanyMutation = ({
  data,
  sessionData,
}: ForCompanyMutationType) => {
  const isInitialRenderRef = useRef(true);
  const { mutations, forCompanyStore, forCompanyCalcStore } = useForCompany();

  const getDataDependsOnPanelPower = () => {
    if (forCompanyStore.panelPower === smallestPanel)
      return data?.dane.czterysta;
    else if (forCompanyStore.panelPower === mediumPanel)
      return data?.dane.czterysta_piecdziesiat;
    else if (forCompanyStore.panelPower === largestPanel)
      return data?.dane.piecset;
  };

  useEffect(() => {
    if (forCompanyStore.wantedInstalationPower > 0)
      mutations.setCalculateModuleCount({
        wantedInstaltionPower: forCompanyStore.wantedInstalationPower,
      });
  }, [forCompanyStore.wantedInstalationPower]);

  useEffect(() => {
    if (forCompanyCalcStore.calculateModuleCount.modulesCount400 > 0)
      mutations.setAllSystemPowers({
        calculateModuleCount: forCompanyCalcStore.calculateModuleCount,
      });
  }, [forCompanyCalcStore.calculateModuleCount]);

  useEffect(() => {
    if (forCompanyCalcStore.allSystemPowers.systemPower400 && data)
      mutations.setBaseInstallationsPricing({
        system_power: forCompanyCalcStore.allSystemPowers,
        dane: data.dane,
        officeMarkup: forCompanyCalcStore.officeMarkup.markupSumValue,
      });
  }, [
    forCompanyCalcStore.allSystemPowers,
    data,
    forCompanyCalcStore.officeMarkup,
  ]);

  useEffect(() => {
    if (!isInitialRenderRef.current) {
      mutations.setEstimatedKWHProd({
        systemPower: forCompanyCalcStore.sysPower ?? 0,
      });
    } else {
      isInitialRenderRef.current = false;
    }
  }, [forCompanyCalcStore.sysPower]);

  useEffect(() => {
    mutations.setAutoconsumption({
      autoconsumptionStep: forCompanyStore.autoconsumptionInPercent,
      estimatedKWHProd: forCompanyCalcStore.estimatedKWHProd,
    });
  }, [
    forCompanyCalcStore.estimatedKWHProd,
    forCompanyStore.autoconsumptionInPercent,
  ]);

  useEffect(() => {
    if (data)
      mutations.setFor1KwAndBaseInstallationPrice({
        dane: getDataDependsOnPanelPower()!,
        system_power: forCompanyCalcStore.sysPower ?? 0,
      });
  }, [forCompanyStore.panelPower, forCompanyCalcStore.sysPower, data]);

  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setBloczkiPrice({
        isChoosed: forCompanyStore.isRoofWeightSystem,
        price: data?.koszty_dodatkowe.bloczki,
        modules_count: forCompanyCalcStore.sysPower,
      });
  }, [
    forCompanyCalcStore.modulesCount,
    data,
    forCompanyStore.isRoofWeightSystem,
  ]);
  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setEkierkiPrice({
        isChoosed: forCompanyStore.isEccentricsChoosed,
        price: data?.koszty_dodatkowe.ekierki,
        modules_count: forCompanyStore.eccentricsCount,
      });
  }, [
    forCompanyCalcStore.modulesCount,
    forCompanyStore.eccentricsCount,
    data,
    forCompanyStore.isEccentricsChoosed,
  ]);
  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setTigoPrice({
        isChoosed: forCompanyStore.isTigoChoosed,
        price: data?.koszty_dodatkowe.tigo,
        modules_count: forCompanyStore.tigoCount,
      });
  }, [
    forCompanyCalcStore.modulesCount,
    forCompanyStore.tigoCount,
    data,
    forCompanyStore.isTigoChoosed,
  ]);
  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setGruntPrice({
        isChoosed: forCompanyStore.isGroundMontage,
        price: data?.koszty_dodatkowe.grunt,
        modules_count: forCompanyStore.groundPanelCount,
      });
  }, [
    forCompanyStore.groundPanelCount,
    forCompanyCalcStore.modulesCount,
    data,
    forCompanyStore.isGroundMontage,
  ]);
  useEffect(() => {
    mutations.setAddonSum({
      bloczkiPrice: forCompanyCalcStore.addonBloczkiPrice,
      ekierkiPrice: forCompanyCalcStore.addonEkierkiPrice,
      groundMontagePrice: forCompanyCalcStore.addonGruntPrice,
      tigoPrice: forCompanyCalcStore.addonTigoPrice,
      markupSumValue: forCompanyCalcStore.officeMarkup.markupSumValue,
    });
  }, [
    forCompanyCalcStore.addonBloczkiPrice,
    forCompanyCalcStore.addonEkierkiPrice,
    forCompanyCalcStore.addonGruntPrice,
    forCompanyCalcStore.addonTigoPrice,
    forCompanyCalcStore.officeMarkup,
  ]);
  useEffect(() => {
    if (data && forCompanyCalcStore.sysPower && sessionData)
      mutations.setOfficeMarkup({
        system_power: forCompanyCalcStore.sysPower,
        officeFee: sessionData.user.feePerkwForCompany,
        constantFee: sessionData.user.imposedFeeForCompany,
        consultantFee: forCompanyStore.consultantMarkup,
        officeFeeFromJsonFile: data.prowizjaBiura,
        creatorId:
          sessionData.user.role === 3 ? sessionData.user.creatorId : "",
      });
  }, [
    sessionData?.user,
    data,
    forCompanyStore.consultantMarkup,
    forCompanyCalcStore.sysPower,
  ]);
  useEffect(() => {
    mutations.setTotalInstallationCosts({
      addonsSum: forCompanyCalcStore.addonSum,
      baseInstallationCost:
        forCompanyCalcStore.for1KwAndBaseInstallationPrice
          .baseInstallationPrice,
      vatValue: forCompanyStore.vatValue,
    });
  }, [
    forCompanyCalcStore.for1KwAndBaseInstallationPrice,
    forCompanyCalcStore.addonSum,
    forCompanyStore.vatValue,
  ]);
  useEffect(() => {
    if (data)
      mutations.setLoanForPurcharse({
        creditPercentage: data.oprocentowanie_kredytu,
        finallInstallationCost:
          forCompanyCalcStore.totalInstallationCosts.grossPrice,
        grossInstalltaionBeforeDotationsCost:
          forCompanyCalcStore.totalInstallationCosts.grossPrice,
        instalmentNumber: forCompanyStore.installmentNumber,
      });
  }, [
    forCompanyStore.installmentNumber,
    data,
    forCompanyCalcStore.totalInstallationCosts,
  ]);
};
