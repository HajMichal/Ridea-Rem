import { useEffect } from "react";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import { type Session } from "next-auth";
import { useDebouncedValue } from "@mantine/hooks";
import useStore from "~/store";
import {
  largestPanel,
  mediumPanel,
  smallestPanel,
} from "~/constans/panelPowers";

interface PhotovoltaicMutationsType {
  data?: PhotovoltaicDataToCalculation;
  sessionData: Session | null;
}

export function PhotovoltaicMutations({
  data,
  sessionData,
}: PhotovoltaicMutationsType) {
  const store = useStore();
  const { photovoltaicStore, photovoltaicCalcStore, mutations } =
    usePhotovoltaic();

  const [debouncedPhotovStore] = useDebouncedValue(photovoltaicStore, 200);

  useEffect(() => {
    sessionStorage.setItem(
      "creditPercentage",
      JSON.stringify(data?.creditPercentage)
    );
  }, [data?.creditPercentage]);

  useEffect(() => {
    mutations.set_system_power({
      modulesCount: photovoltaicStore.modulesCount,
      panelPower: photovoltaicStore.panelPower,
    });
  }, [
    debouncedPhotovStore.modulesCount,
    photovoltaicStore.panelPower,
    mutations.set_system_power,
  ]);
  useEffect(() => {
    if (photovoltaicCalcStore.system_power) {
      mutations.set_estimated_kWh_prod({
        southRoof: photovoltaicStore.southRoof,
        system_power: photovoltaicCalcStore.system_power,
      });
    }
  }, [
    photovoltaicCalcStore.system_power,
    photovoltaicStore.southRoof,
    mutations.set_estimated_kWh_prod,
  ]);
  useEffect(() => {
    if (photovoltaicCalcStore.estimated_kWh_prod)
      mutations.set_autoconsumption({
        autoconsumption_step: photovoltaicStore.autoconsumptionInPercent,
        estimated_kWh_prod: photovoltaicCalcStore.estimated_kWh_prod,
      });
  }, [
    photovoltaicStore.autoconsumptionInPercent,
    photovoltaicCalcStore.estimated_kWh_prod,
    mutations.set_autoconsumption,
  ]);
  useEffect(() => {
    if (data && photovoltaicCalcStore.estimated_kWh_prod)
      mutations.setAutoconsumptionProfit({
        pvProduction: photovoltaicCalcStore.estimated_kWh_prod,
        trendPrice: data.electricityPrice,
      });
  }, [
    photovoltaicCalcStore.estimated_kWh_prod,
    mutations.setAutoconsumptionProfit,
    data,
  ]);

  useEffect(() => {
    if (
      data &&
      photovoltaicCalcStore.autoconsumption &&
      photovoltaicCalcStore.estimated_kWh_prod
    ) {
      mutations.setEnergySoldWithOverproducedTrend({
        autoconsumption: photovoltaicCalcStore.autoconsumption,
        estimated_kWh_prod: photovoltaicCalcStore.estimated_kWh_prod,
        trendSellPrice: data.electricityPrice,
      });
    }
  }, [
    data,
    photovoltaicCalcStore.autoconsumption,
    photovoltaicCalcStore.estimated_kWh_prod,
  ]);
  useEffect(() => {
    mutations.setFutureProfitsWithPV({
      autoconsumptionProfit: photovoltaicCalcStore.autoconsumptionProfit,
      energySold: photovoltaicCalcStore.autoconsumptionProfit,
      monthlyBill: photovoltaicStore.monthlyBill,
    });
  }, [
    photovoltaicCalcStore.autoconsumptionProfit,
    photovoltaicCalcStore.autoconsumptionProfit,
    photovoltaicStore.monthlyBill,
  ]);

  const getDataDependsOnPanelPower = () => {
    if (photovoltaicStore.panelPower === smallestPanel)
      return data?.panels_small;
    else if (photovoltaicStore.panelPower === mediumPanel)
      return data?.panels_medium;
    else if (photovoltaicStore.panelPower === largestPanel)
      return data?.panels_large;
  };

  useEffect(() => {
    if (photovoltaicCalcStore.system_power && data) {
      mutations.set_installationAndPer1KW_price({
        system_power: photovoltaicCalcStore.system_power,
        dane: getDataDependsOnPanelPower()!,
      });
    }
  }, [
    data,
    photovoltaicCalcStore.system_power,
    mutations.set_installationAndPer1KW_price,
    photovoltaicStore.panelPower,
  ]);

  useEffect(() => {
    if (data && photovoltaicStore.modulesCount)
      mutations.setEccentricsPrice({
        price:
          photovoltaicStore.eccentrics === "standardEccentrics"
            ? data.addons.ekierki
            : data.addons.certyfikowaneEkierki,
        isEccentrics: photovoltaicStore.eccentrics !== "None",
        modules_count: photovoltaicStore.modulesCount,
      });
  }, [
    debouncedPhotovStore.modulesCount,
    data,
    photovoltaicStore.eccentrics,
    mutations.setEccentricsPrice,
  ]);
  useEffect(() => {
    if (data && photovoltaicCalcStore.system_power)
      mutations.set_bloczki_price({
        price: data.addons.bloczki,
        isChoosed: photovoltaicStore.isRoofWeightSystem,
        system_power: photovoltaicCalcStore.system_power,
      });
  }, [
    photovoltaicCalcStore.system_power,
    data,
    photovoltaicStore.isRoofWeightSystem,
    mutations.set_bloczki_price,
  ]);
  useEffect(() => {
    if (data && photovoltaicCalcStore.system_power)
      mutations.set_grunt_price({
        price: data.addons.grunt,
        isChoosed: photovoltaicStore.isGroundMontage,
        system_power: photovoltaicCalcStore.system_power,
      });
  }, [
    photovoltaicCalcStore.system_power,
    data,
    photovoltaicStore.isGroundMontage,
    mutations.set_grunt_price,
  ]);

  useEffect(() => {
    if (data && photovoltaicCalcStore.system_power && sessionData)
      mutations.set_markup_costs({
        system_power: photovoltaicCalcStore.system_power,
        officeFee: sessionData.user.feePerkwPhotovoltaic,
        constantFee: sessionData.user.imposedFeePhotovoltaic,
        consultantFee: store.markupAmount,
        hasUserContract: store.hasContract,
        creatorId: sessionData.user.creatorId ?? undefined,
      });
  }, [
    photovoltaicCalcStore.system_power,
    sessionData,
    mutations.set_markup_costs,
    data,
    store.hasContract,
    store.markupAmount,
  ]);

  useEffect(() => {
    if (data?.addons)
      mutations.set_addon_cost({
        bloczki: photovoltaicCalcStore.bloczki_price,
        ekierki: photovoltaicCalcStore.ekierki_price,
        grunt: photovoltaicCalcStore.grunt_price,
        hybridInwerter: photovoltaicCalcStore.hybridInwerter_price,
        tigo: photovoltaicCalcStore.tigo_price,
        promotionAmount: photovoltaicStore.isPromotion
          ? 0
          : photovoltaicStore.promotionAmount,
        voucherholiday: photovoltaicStore.holidayVoucher ? 1500 : 0,
        carPort: photovoltaicCalcStore.carPortCost,
        markup_costs: photovoltaicCalcStore.markup_costs.markupSumValue ?? 0,
        cableACCost: photovoltaicCalcStore.cableACCost,
        mateboxCost: photovoltaicCalcStore.mateboxCost,
        ditchingCost: photovoltaicCalcStore.ditchCost,
        eniga: photovoltaicStore.isEniga ? data.addons.eniga : 0,
      });
  }, [
    photovoltaicCalcStore.bloczki_price,
    photovoltaicCalcStore.ekierki_price,
    photovoltaicCalcStore.grunt_price,
    photovoltaicCalcStore.hybridInwerter_price,
    photovoltaicCalcStore.tigo_price,
    photovoltaicCalcStore.carPortCost,
    photovoltaicCalcStore.markup_costs,
    photovoltaicStore.isPromotion,
    photovoltaicStore.promotionAmount,
    photovoltaicStore.holidayVoucher,
    photovoltaicCalcStore.cableACCost,
    photovoltaicCalcStore.mateboxCost,
    photovoltaicCalcStore.ditchCost,
    mutations.set_addon_cost,
    photovoltaicStore.isEniga,
    data,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalcStore.installationAndPer1KW_price?.base_installation_price
    )
      mutations.set_totalInstallationCost({
        addon_costs: photovoltaicCalcStore.addon_cost,
        base_installation_costs:
          photovoltaicCalcStore.installationAndPer1KW_price
            .base_installation_price,
        heatStore_energyManager_costs:
          photovoltaicCalcStore.heatStore_energyManager_costs +
          photovoltaicCalcStore.energyManagerCost,
        energyStoreCost: photovoltaicStore.isEnergyStoreDotation
          ? photovoltaicStore.energyStore.price
          : 0,
        isVat23: photovoltaicStore.vat23,
      });
  }, [
    photovoltaicStore.energyStore,
    photovoltaicStore.isEnergyStoreDotation,
    photovoltaicCalcStore.energyManagerCost,
    photovoltaicCalcStore.addon_cost,
    photovoltaicCalcStore.installationAndPer1KW_price?.base_installation_price,
    photovoltaicCalcStore.heatStore_energyManager_costs,
    photovoltaicCalcStore.termoModernization,
    photovoltaicStore.vat23,
    mutations.set_totalInstallationCost,
  ]);
  useEffect(() => {
    mutations.set_dotations_sum({
      energyMenagerDotation: photovoltaicCalcStore.energyMenagerDotationValue,
      photovoltaicDotation_czpowietrze:
        photovoltaicCalcStore.photovoltaicDotation_czpowietrze,
      photovoltaicDotation_mojprad:
        photovoltaicCalcStore.photovoltaicDotation_mojprad,
      energyStoreDotationValue: photovoltaicCalcStore.energyStoreDotationValue,
      heatStoreDotation: photovoltaicStore.isHeatStore
        ? data?.dotations["magazynCiepla"] ?? 0
        : 0,
      isVat23: photovoltaicStore.vat23,
    });
  }, [
    photovoltaicCalcStore.photovoltaicDotation_mojprad,
    photovoltaicCalcStore.photovoltaicDotation_czpowietrze,
    photovoltaicStore.isEnergyStoreDotation,
    photovoltaicCalcStore.energyStoreDotationValue,
    photovoltaicCalcStore.energyMenagerDotationValue,
    photovoltaicStore.vat23,
    photovoltaicStore.isHeatStore,
    data?.dotations,
  ]);

  useEffect(() => {
    if (photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost)
      mutations.set_amount_after_dotation({
        gross_instalation_cost:
          photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost,
        summed_dotations: photovoltaicCalcStore.dotations_sum,
      });
  }, [
    photovoltaicCalcStore.dotations_sum,
    photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost,
    mutations.set_amount_after_dotation,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_heatStore_energyManager_costs({
        heatStoreCost: photovoltaicCalcStore.heatStoreCost ?? 0,
        isHeatStore: photovoltaicStore.isHeatStore,
      });
  }, [
    photovoltaicCalcStore.heatStoreCost,
    photovoltaicStore.isHeatStore,
    mutations.set_heatStore_energyManager_costs,
  ]);
  useEffect(() => {
    if (data)
      mutations.setPhotovoltaicDotation_mojprad({
        isEnergyStoreDotation: photovoltaicStore.isEnergyStoreDotation,
        isDotation_mojprad: photovoltaicStore.isDotation_mojprad,
        mojPrad: data.dotations.mojPrad,
        mp_mc: data.dotations.mp_mc,
      });
  }, [
    photovoltaicStore.isEnergyStoreDotation,
    photovoltaicStore.isDotation_mojprad,
    data?.dotations.mojPrad,
    data?.dotations.mp_mc,
  ]);
  useEffect(() => {
    mutations.setPhotovoltaicDotation_czpowietrze({
      isDotation_czpowietrze: photovoltaicStore.isDotation_czpowietrze,
      dotationStep: photovoltaicStore.dotationStep_czpowietrze,
      totalCost:
        photovoltaicCalcStore.totalInstallationCosts.total_installation_cost,
    });
  }, [
    photovoltaicStore.isDotation_czpowietrze,
    photovoltaicStore.dotationStep_czpowietrze,
    photovoltaicCalcStore.totalInstallationCosts.total_installation_cost,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_energyMenagerDotationValue({
        emsDotation: photovoltaicStore.emsDotation,
        energyMenager: data.dotations.menagerEnergii,
        isEnergyStoreDotation: photovoltaicStore.isEnergyStoreDotation,
        isHeatStore: photovoltaicStore.isHeatStore,
      });
  }, [
    photovoltaicStore.emsDotation,
    data?.dotations.menagerEnergii,
    photovoltaicStore.isEnergyStoreDotation,
    photovoltaicStore.isHeatStore,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_energyManagerCost({
        isEnergyMenagerSystem: photovoltaicStore.emsDotation,
        energyMenagerCost: data.addons.ems,
      });
  }, [
    data?.addons.ems,
    photovoltaicStore.emsDotation,
    mutations.set_energyManagerCost,
  ]);

  useEffect(() => {
    if (photovoltaicCalcStore.amount_after_dotation)
      mutations.set_finall_installation_cost({
        amount_after_dotation: photovoltaicCalcStore.amount_after_dotation,
      });
  }, [photovoltaicCalcStore.amount_after_dotation]);

  useEffect(() => {
    mutations.set_payment_return_time({
      finallInstallationCost: photovoltaicCalcStore.finall_installation_cost,
      yearlyProfit: photovoltaicCalcStore.futureProfitsWithPV.yearlyProfit,
    });
  }, [
    photovoltaicCalcStore.finall_installation_cost,
    photovoltaicCalcStore.futureProfitsWithPV,
    mutations.set_payment_return_time,
  ]);

  useEffect(() => {
    if (photovoltaicCalcStore.totalInstallationCosts.total_gross_cost) {
      mutations.set_energyStoreDotationValue({
        gross_instalation_cost:
          photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
        isEnergyStoreDotation: photovoltaicStore.isEnergyStoreDotation,
      });
    }
  }, [photovoltaicCalcStore.totalInstallationCosts.total_gross_cost]);
  useEffect(() => {
    mutations.set_termo_modernization({
      amount_after_dotation: photovoltaicCalcStore.amount_after_dotation,
      tax_credit: photovoltaicStore.taxCredit,
    });
  }, [
    photovoltaicStore.taxCredit,
    photovoltaicCalcStore.amount_after_dotation,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_loan_for_purcharse({
        creditPercentage: data.creditPercentage,
        instalmentNumber: photovoltaicStore.installmentNumber,
        finall_installation_cost:
          photovoltaicCalcStore.finall_installation_cost -
          photovoltaicCalcStore.termoModernization,
        grossInstalltaionBeforeDotationsCost:
          photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
      });
  }, [
    photovoltaicCalcStore.termoModernization,
    photovoltaicCalcStore.finall_installation_cost,
    photovoltaicStore.installmentNumber,
    photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
    data?.creditPercentage,
  ]);
}
