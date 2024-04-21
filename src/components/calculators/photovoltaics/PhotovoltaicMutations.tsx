import { useEffect } from "react";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import useStore from "~/store";
import { type Session } from "next-auth";
import { useDebouncedValue } from "@mantine/hooks";

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
    if (
      photovoltaicCalcStore.autoconsumption &&
      photovoltaicStore.energyPriceInLimit &&
      photovoltaicStore.energyPriceOutOfLimit &&
      photovoltaicStore.recentYearTrendUsage
    )
      mutations.set_total_payment_energy_transfer({
        autoconsumption: photovoltaicCalcStore.autoconsumption,
        priceInLimit: photovoltaicStore.energyPriceInLimit,
        priceOutOfLimit: photovoltaicStore.energyPriceOutOfLimit,
        recentYearTrendUsage: photovoltaicStore.recentYearTrendUsage,
        usageLimit: photovoltaicStore.usageLimit,
      });
  }, [
    photovoltaicCalcStore.autoconsumption,
    debouncedPhotovStore.energyPriceInLimit,
    debouncedPhotovStore.usageLimit,
    debouncedPhotovStore.energyPriceOutOfLimit,
    debouncedPhotovStore.recentYearTrendUsage,
    mutations.set_total_payment_energy_transfer,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalcStore.autoconsumption &&
      photovoltaicCalcStore.estimated_kWh_prod
    )
      mutations.set_energy_sold_to_distributor({
        autoconsumption: photovoltaicCalcStore.autoconsumption,
        estimated_kWh_prod: photovoltaicCalcStore.estimated_kWh_prod,
      });
  }, [
    photovoltaicCalcStore.autoconsumption,
    photovoltaicCalcStore.estimated_kWh_prod,
    mutations.set_energy_sold_to_distributor,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalcStore.energy_sold_to_distributor &&
      data?.cena_skupu_pradu
    )
      mutations.set_accumulated_funds_on_account({
        autoconsumption: photovoltaicCalcStore.energy_sold_to_distributor,
        estiamtedSellPriceToOsd: data.cena_skupu_pradu,
      });
  }, [
    photovoltaicCalcStore.energy_sold_to_distributor,
    mutations.set_accumulated_funds_on_account,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalcStore.accumulated_funds_on_account &&
      photovoltaicCalcStore.autoconsumption &&
      photovoltaicStore.energyPriceInLimit &&
      photovoltaicStore.energyPriceOutOfLimit &&
      photovoltaicStore.recentYearTrendUsage
    ) {
      mutations.set_total_energy_trend_fee({
        accumulated_funds_on_account:
          photovoltaicCalcStore.accumulated_funds_on_account,
        autoconsumption: photovoltaicCalcStore.autoconsumption,
        priceInLimit: photovoltaicStore.energyPriceInLimit,
        priceOutOfLimit: photovoltaicStore.energyPriceOutOfLimit,
        usageLimit: photovoltaicStore.usageLimit,
        recentYearTrendUsage: photovoltaicStore.recentYearTrendUsage,
      });
    }
  }, [
    photovoltaicCalcStore.accumulated_funds_on_account,
    photovoltaicCalcStore.autoconsumption,
    debouncedPhotovStore.energyPriceInLimit,
    debouncedPhotovStore.energyPriceOutOfLimit,
    debouncedPhotovStore.usageLimit,
    debouncedPhotovStore.recentYearTrendUsage,
    mutations.set_total_energy_trend_fee,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalcStore.limit_price_trend &&
      photovoltaicCalcStore.outOfLimit_price_trend &&
      photovoltaicStore.recentYearTrendUsage
    )
      mutations.set_yearly_bill_without_photovolatics({
        limit_price_trend: photovoltaicCalcStore.limit_price_trend,
        outOfLimit_price_trend: photovoltaicCalcStore.outOfLimit_price_trend,
        recentYearTrendUsage: photovoltaicStore.recentYearTrendUsage,
        usageLimit: photovoltaicStore.usageLimit,
      });
  }, [
    debouncedPhotovStore.usageLimit,
    debouncedPhotovStore.recentYearTrendUsage,
    photovoltaicCalcStore.outOfLimit_price_trend,
    photovoltaicCalcStore.limit_price_trend,
    mutations.set_yearly_bill_without_photovolatics,
  ]);
  useEffect(() => {
    if (
      photovoltaicStore.energyPriceInLimit &&
      photovoltaicStore.energyPriceOutOfLimit &&
      photovoltaicStore.recentYearTrendUsage
    )
      mutations.set_yearly_total_fees({
        energyPriceInLimit: photovoltaicStore.energyPriceInLimit,
        energyPriceOutOfLimit: photovoltaicStore.energyPriceOutOfLimit,
        recentYearTrendUsage: photovoltaicStore.recentYearTrendUsage,
        usageLimit: photovoltaicStore.usageLimit,
      });
  }, [
    debouncedPhotovStore.usageLimit,
    debouncedPhotovStore.recentYearTrendUsage,
    debouncedPhotovStore.energyPriceInLimit,
    debouncedPhotovStore.energyPriceOutOfLimit,
    mutations.set_yearly_total_fees,
  ]);
  useEffect(() => {
    if (
      // eslint-disable-next-line
      (photovoltaicCalcStore.total_energy_trend_fee ||
        photovoltaicCalcStore.total_energy_trend_fee === 0) &&
      // eslint-disable-next-line
      (photovoltaicCalcStore.total_payment_energy_transfer ||
        photovoltaicCalcStore.total_payment_energy_transfer === 0)
    )
      mutations.set_yearly_costs_with_photovoltaics({
        total_energy_trend_fee: photovoltaicCalcStore.total_energy_trend_fee,
        total_payment_energy_transfer:
          photovoltaicCalcStore.total_payment_energy_transfer,
      });
  }, [
    photovoltaicCalcStore.total_energy_trend_fee,
    photovoltaicCalcStore.total_payment_energy_transfer,
    mutations.set_yearly_costs_with_photovoltaics,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalcStore.yearly_costs_with_photovoltaics &&
      photovoltaicCalcStore.yearly_bill_without_photovolatics
    )
      mutations.set_total_save({
        yearly_bill_without_photovolatics:
          photovoltaicCalcStore.yearly_bill_without_photovolatics,
        yearly_costs_with_photovoltaics:
          photovoltaicCalcStore.yearly_costs_with_photovoltaics,
      });
  }, [
    photovoltaicCalcStore.yearly_costs_with_photovoltaics,
    photovoltaicCalcStore.yearly_bill_without_photovolatics,
    mutations.set_total_save,
  ]);

  useEffect(() => {
    if (photovoltaicCalcStore.system_power && data) {
      mutations.set_installationAndPer1KW_price({
        system_power: photovoltaicCalcStore.system_power,
        dane: mutations.getDataDependsOnPanelPower()!,
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
      mutations.set_ekierki_price({
        price: data.koszty_dodatkowe.ekierki,
        isChoosed: photovoltaicStore.isEccentricsChoosed,
        modules_count: photovoltaicStore.modulesCount,
      });
  }, [
    debouncedPhotovStore.modulesCount,
    data,
    photovoltaicStore.isEccentricsChoosed,
    mutations.set_ekierki_price,
  ]);
  useEffect(() => {
    if (data && photovoltaicCalcStore.system_power)
      mutations.set_bloczki_price({
        price: data.koszty_dodatkowe.bloczki,
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
        price: data.koszty_dodatkowe.grunt,
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
    if (data && photovoltaicStore.modulesCount)
      mutations.set_solarEdge_price({
        price: data.koszty_dodatkowe.solarEdge,
        isChoosed: photovoltaicStore.isSolarEdgeChoosed,
        modules_count: photovoltaicStore.modulesCount,
      });
  }, [
    debouncedPhotovStore.modulesCount,
    photovoltaicStore.isSolarEdgeChoosed,
    data,
    mutations.set_solarEdge_price,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_hybridInwerter_price({
        hybridInwerter_price: data.koszty_dodatkowe.inwerterHybrydowy,
        isHybridInwerterChoosed: photovoltaicStore.isInwerterChoosed,
      });
  }, [
    data,
    photovoltaicStore.isInwerterChoosed,
    mutations.set_hybridInwerter_price,
  ]);

  useEffect(() => {
    if (data && photovoltaicCalcStore.system_power && sessionData)
      mutations.set_markup_costs({
        system_power: photovoltaicCalcStore.system_power,
        officeFee: sessionData.user.feePerkwPhotovoltaic,
        constantFee: sessionData.user.imposedFeePhotovoltaic,
        consultantFee: photovoltaicStore.consultantMarkup,
        officeFeeFromJsonFile: data.prowizjaBiura,
        creatorId:
          sessionData.user.role === 3 ? sessionData.user.creatorId : "",
      });
  }, [
    photovoltaicCalcStore.system_power,
    sessionData,
    photovoltaicStore.consultantMarkup,
    mutations.set_markup_costs,
    data,
  ]);

  useEffect(() => {
    store.updatePhotovoltaicCalcs(
      "carPortCost",
      data &&
        photovoltaicStore.isCarPort &&
        photovoltaicStore.choosedCarPort !== "0_stan"
        ? data.carPort[photovoltaicStore.choosedCarPort]
        : 0
    );
  }, [
    photovoltaicStore.choosedCarPort,
    photovoltaicStore.isCarPort,
    data?.carPort,
  ]);
  useEffect(() => {
    mutations.set_addon_cost({
      bloczki: photovoltaicCalcStore.bloczki_price,
      ekierki: photovoltaicCalcStore.ekierki_price,
      grunt: photovoltaicCalcStore.grunt_price,
      hybridInwerter: photovoltaicCalcStore.hybridInwerter_price,
      solarEdge: photovoltaicCalcStore.solarEdge_price,
      tigo: photovoltaicCalcStore.tigo_price,
      promotionAmount: photovoltaicStore.isPromotion
        ? 0
        : photovoltaicStore.promotionAmount,
      twoInstallmentsFree: photovoltaicStore.twoInstallmentsFree ? 1200 : 0,
      voucherholiday: photovoltaicStore.holidayVoucher ? 1500 : 0,
      carPort: photovoltaicCalcStore.carPortCost,
      markup_costs: photovoltaicCalcStore.markup_costs.markupSumValue ?? 0,
    });
  }, [
    photovoltaicCalcStore.bloczki_price,
    photovoltaicCalcStore.ekierki_price,
    photovoltaicCalcStore.grunt_price,
    photovoltaicCalcStore.hybridInwerter_price,
    photovoltaicCalcStore.solarEdge_price,
    photovoltaicCalcStore.tigo_price,
    photovoltaicCalcStore.carPortCost,
    photovoltaicCalcStore.markup_costs,
    photovoltaicStore.isPromotion,
    photovoltaicStore.promotionAmount,
    photovoltaicStore.twoInstallmentsFree,
    photovoltaicStore.holidayVoucher,
    mutations.set_addon_cost,
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
            photovoltaicCalcStore.energyManagerCost ?? 0,
        energyStoreCost:
          photovoltaicStore.energyStoreDotation &&
          photovoltaicCalcStore.energyStoreCost
            ? photovoltaicCalcStore.energyStoreCost
            : 0,
      });
  }, [
    photovoltaicCalcStore.energyStoreCost,
    photovoltaicStore.energyStoreDotation,
    photovoltaicCalcStore.energyManagerCost,
    photovoltaicCalcStore.addon_cost,
    photovoltaicCalcStore.installationAndPer1KW_price?.base_installation_price,
    photovoltaicCalcStore.heatStore_energyManager_costs,
    photovoltaicCalcStore.termoModernization,
    mutations.set_totalInstallationCost,
  ]);

  useEffect(() => {
    mutations.set_dotations_sum({
      energyMenagerDotation: photovoltaicCalcStore.energyMenagerDotationValue,
      photovoltaics_dotation: photovoltaicCalcStore.photovoltaicDotationValue,
      heatStore_dotation: photovoltaicStore.heatStoreDotation ? 5000 : 0,
      energyStoreDotation: photovoltaicCalcStore.energyStoreDotationValue,
    });
  }, [
    photovoltaicCalcStore.photovoltaicDotationValue,
    photovoltaicStore.energyStoreDotation,
    photovoltaicCalcStore.energyStoreDotationValue,
    photovoltaicCalcStore.energyMenagerDotationValue,
    photovoltaicStore.heatStoreDotation,
    photovoltaicStore.isDotation,
  ]);

  useEffect(() => {
    if (
      photovoltaicCalcStore.dotations_sum &&
      photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost
    )
      mutations.set_amount_after_dotation({
        gross_instalation_cost:
          photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost,
        summed_dotations: photovoltaicStore.isDotation
          ? photovoltaicCalcStore.dotations_sum
          : 0,
      });
  }, [
    photovoltaicCalcStore.dotations_sum,
    photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost,
    photovoltaicStore.isDotation,
    mutations.set_amount_after_dotation,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_heatStore_energyManager_costs({
        heatStore_cost: photovoltaicCalcStore.heatStore_cost ?? 0,
        isHeatStoreSystem: photovoltaicStore.heatStoreDotation,
      });
  }, [
    photovoltaicCalcStore.heatStore_cost,
    photovoltaicStore.heatStoreDotation,
    mutations.set_heatStore_energyManager_costs,
    data?.magazynCiepla,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_photovoltaicDotationValue({
        heatStoreDotation: photovoltaicStore.heatStoreDotation,
        energyStoreDotation: photovoltaicStore.energyStoreDotation,
        isDotation: photovoltaicStore.isDotation,
        mojPrad: data.dotacje.mojPrad,
        mp_mc: data.dotacje.mp_mc,
      });
  }, [
    photovoltaicStore.heatStoreDotation,
    photovoltaicStore.energyStoreDotation,
    photovoltaicStore.isDotation,
    data?.dotacje.mojPrad,
    data?.dotacje.mp_mc,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_energyMenagerDotationValue({
        emsDotation: photovoltaicStore.emsDotation,
        isDotation: photovoltaicStore.isDotation,
        energyMenager: data.dotacje.menagerEnergii,
        energyStoreDotation: photovoltaicStore.energyStoreDotation,
        heatStoreDotation: photovoltaicStore.heatStoreDotation,
      });
  }, [
    photovoltaicStore.emsDotation,
    data?.dotacje.menagerEnergii,
    photovoltaicStore.energyStoreDotation,
    photovoltaicStore.heatStoreDotation,
    photovoltaicStore.isDotation,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_energyManagerCost({
        isEnergyMenagerSystem: photovoltaicStore.emsDotation,
        energyMenagerCost: data.ems,
      });
  }, [
    data?.ems,
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
    if (
      photovoltaicStore.recentYearTrendUsage &&
      photovoltaicCalcStore.yearly_bill_without_photovolatics
    )
      mutations.set_estiamted_price_for_trend_in_1KWH({
        recentYearTrendUsage: photovoltaicStore.recentYearTrendUsage,
        yearly_bill_without_photovolatics:
          photovoltaicCalcStore.yearly_bill_without_photovolatics,
      });
  }, [
    photovoltaicCalcStore.yearly_bill_without_photovolatics,
    photovoltaicStore.recentYearTrendUsage,
    mutations.set_estiamted_price_for_trend_in_1KWH,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalcStore.autoconsumption &&
      photovoltaicCalcStore.estiamted_price_for_trend_in_1KWH
    )
      mutations.set_save_on_autoconsumption({
        autoconsumption: photovoltaicCalcStore.autoconsumption,
        estiamtedPriceForTrendIn1KWH:
          photovoltaicCalcStore.estiamted_price_for_trend_in_1KWH,
      });
  }, [
    photovoltaicCalcStore.autoconsumption,
    photovoltaicCalcStore.estiamted_price_for_trend_in_1KWH,
    mutations.set_save_on_autoconsumption,
  ]);
  useEffect(() => {
    mutations.set_yearly_profit_for_installation({
      accumulated_funds_on_account:
        photovoltaicCalcStore.accumulated_funds_on_account,
      saveOnAutoconsumption: photovoltaicCalcStore.save_on_autoconsumption,
    });
  }, [
    photovoltaicCalcStore.accumulated_funds_on_account,
    photovoltaicCalcStore.save_on_autoconsumption,
    mutations.set_yearly_profit_for_installation,
  ]);

  useEffect(() => {
    mutations.set_payment_return_time({
      finallInstallationCost: photovoltaicCalcStore.finall_installation_cost,
      yearlyProfit: photovoltaicCalcStore.yearly_profit_for_installation,
    });
  }, [
    photovoltaicCalcStore.finall_installation_cost,
    photovoltaicCalcStore.yearly_profit_for_installation,
    mutations.set_payment_return_time,
  ]);

  useEffect(() => {
    if (photovoltaicCalcStore.totalInstallationCosts.total_gross_cost) {
      mutations.set_energyStoreDotationValue({
        gross_instalation_cost:
          photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
        isDotation: photovoltaicStore.isDotation,
        energyStoreDotation: photovoltaicStore.energyStoreDotation,
      });
    }
  }, [
    photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
    photovoltaicStore.isDotation,
  ]);
  useEffect(() => {
    mutations.set_termo_modernization({
      amount_after_dotation: photovoltaicCalcStore.amount_after_dotation,
      tax_credit: photovoltaicStore.taxCredit,
      isDotation: photovoltaicStore.isDotation,
    });
  }, [
    photovoltaicStore.taxCredit,
    photovoltaicCalcStore.amount_after_dotation,
    photovoltaicStore.isDotation,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_loan_for_purcharse({
        creditPercentage: data.oprocentowanie_kredytu,
        instalmentNumber: photovoltaicStore.installmentNumber,
        finall_installation_cost:
          photovoltaicCalcStore.finall_installation_cost,
        grossInstalltaionBeforeDotationsCost:
          photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
      });
  }, [
    photovoltaicCalcStore.finall_installation_cost,
    photovoltaicStore.installmentNumber,
    photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
    data?.oprocentowanie_kredytu,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_energyStoreCost({
        energyStorePower: photovoltaicStore.energyStorePower,
        energyStorePowersCost: data.magazyn_energii_solax,
        hipontechCost: data.magazyn_energii_hipontech,
      });
  }, [
    photovoltaicStore.energyStorePower,
    data?.magazyn_energii_solax,
    data?.magazyn_energii_hipontech,
  ]);
}
