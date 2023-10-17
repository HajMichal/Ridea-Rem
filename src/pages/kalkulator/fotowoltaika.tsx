import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";

import useStore from "~/store";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import {
  SelectComponent,
  InputComponent,
  Navbar,
  SideBar,
  Loading,
} from "~/components";
import { Preview } from "~/components/photovoltaics";
import { Overlay, ScrollArea } from "@mantine/core";
import { PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";

const Fotowoltaika = () => {
  const store = useStore();
  const { photovoltaicStore, photovoltaicCalcStore, mutations } =
    usePhotovoltaic();
  const { data: sessionData } = useSession();
  const router = useRouter();

  // const { mutate } = api.dataFlow.setJSONFile.useMutation();
  const { data } =
    api.dataFlow.downloadFile.useQuery<PhotovoltaicDataToCalculation>(
      sessionData?.user.id
    );
  // Dotations
  const energyStore_dotation = photovoltaicStore.emsDotation
    ? data?.dotacje.menagerEnergii
    : 0;

  const photovoltaics_dotation =
    photovoltaicStore.heatStoreDotation ||
    photovoltaicStore.emsDotation ||
    photovoltaicStore.energyStoreDotation
      ? data?.dotacje.mp_mc
      : data?.dotacje.mojPrad;

  useEffect(() => {
    // mutate();
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

  useEffect(() => {
    mutations.set_system_power({
      modulesCount: photovoltaicStore.modulesCount,
      panelPower: photovoltaicStore.panelPower,
    });
  }, [
    photovoltaicStore.modulesCount,
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
    photovoltaicStore.energyPriceInLimit,
    photovoltaicStore.usageLimit,
    photovoltaicStore.energyPriceOutOfLimit,
    photovoltaicStore.recentYearTrendUsage,
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
    photovoltaicStore.energyPriceInLimit,
    photovoltaicStore.energyPriceOutOfLimit,
    photovoltaicStore.usageLimit,
    photovoltaicStore.recentYearTrendUsage,
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
    photovoltaicStore.usageLimit,
    photovoltaicStore.recentYearTrendUsage,
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
    photovoltaicStore.usageLimit,
    photovoltaicStore.recentYearTrendUsage,
    photovoltaicStore.energyPriceInLimit,
    photovoltaicStore.energyPriceOutOfLimit,
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
    photovoltaicStore.modulesCount,
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
    photovoltaicStore.modulesCount,
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
        officeFee: sessionData.user.feePerkw,
        constantFee: sessionData.user.imposedFee,
        consultantFee: photovoltaicStore.consultantMarkup,
        officeFeeFromJsonFile: data.prowizjaBiura,
      });
  }, [
    photovoltaicCalcStore.system_power,
    sessionData,
    photovoltaicStore.consultantMarkup,
    mutations.set_markup_costs,
    data,
  ]);
  useEffect(() => {
    mutations.set_addon_cost({
      bloczki: photovoltaicCalcStore.bloczki_price,
      ekierki: photovoltaicCalcStore.ekierki_price,
      grunt: photovoltaicCalcStore.grunt_price,
      hybridInwerter: photovoltaicCalcStore.hybridInwerter_price,
      solarEdge: photovoltaicCalcStore.solarEdge_price,
      tigo: photovoltaicCalcStore.tigo_price,
      voucher: photovoltaicStore.voucher,
      markup_costs: photovoltaicCalcStore.markup_costs.markupSumValue ?? 0,
    });
  }, [
    photovoltaicCalcStore.bloczki_price,
    photovoltaicCalcStore.ekierki_price,
    photovoltaicCalcStore.grunt_price,
    photovoltaicCalcStore.hybridInwerter_price,
    photovoltaicCalcStore.solarEdge_price,
    photovoltaicCalcStore.tigo_price,
    photovoltaicStore.voucher,
    photovoltaicCalcStore.markup_costs,
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
        energyStoreCost: photovoltaicStore.energyStoreDotation
          ? photovoltaicCalcStore.energyStoreCost
          : 0,
      });
  }, [
    photovoltaicCalcStore.energyStoreCost,
    photovoltaicStore.energyStoreDotation,
    photovoltaicCalcStore.addon_cost,
    photovoltaicCalcStore.installationAndPer1KW_price?.base_installation_price,
    photovoltaicCalcStore.heatStore_energyManager_costs,
    mutations.set_totalInstallationCost,
  ]);

  useEffect(() => {
    mutations.set_dotations_sum({
      energyMenagerDotation: photovoltaicStore.emsDotation
        ? energyStore_dotation ?? 0
        : 0,
      photovoltaics_dotation: photovoltaics_dotation ?? 0,
      heatStore_dotation: photovoltaicStore.heatStoreDotation
        ? photovoltaicCalcStore.heatStoreCalcDotation ?? 0
        : 0,
      energyStoreDotation: photovoltaicStore.energyStoreDotation
        ? photovoltaicCalcStore.energyStoreDotationValue
        : 0,
    });
  }, [
    photovoltaics_dotation,
    energyStore_dotation,
    photovoltaicStore.emsDotation,
    photovoltaicStore.energyStoreDotation,
    photovoltaicCalcStore.heatStoreCalcDotation,
    photovoltaicStore.heatStoreDotation,
    mutations.set_dotations_sum,
  ]);

  useEffect(() => {
    if (
      photovoltaicCalcStore.dotations_sum &&
      photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost
    )
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
        heatStore_cost: photovoltaicCalcStore.heatStore_cost ?? 0,
        heatStorePrice: data.magazynCiepla,
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
  }, [
    photovoltaicCalcStore.amount_after_dotation,
    mutations.set_finall_installation_cost,
  ]);
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
    if (photovoltaicCalcStore.totalInstallationCosts.total_gross_cost)
      mutations.set_heatStoreCalcDotation({
        gross_instalation_cost:
          photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
      });
    if (photovoltaicCalcStore.totalInstallationCosts.total_gross_cost) {
      mutations.set_energyStoreDotationValue({
        net_instalation_cost:
          photovoltaicCalcStore.totalInstallationCosts.total_installation_cost,
      });
    }
  }, [
    photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
    photovoltaicStore.energyStoreDotation,
    mutations.set_heatStoreCalcDotation,
    mutations.set_energyStoreDotationValue,
  ]);
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
        energyStorePowersCost: data.magazyn_energii,
      });
  }, [photovoltaicStore.energyStorePower, data?.magazyn_energii]);

  const yesNoData = [
    { value: "true", label: "Tak" },
    { value: "false", label: "Nie" },
  ];
  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      {!data && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
            <h1
              style={{ textShadow: " 24px 24px #bebebe" }}
              className="z-50 mb-10 font-orkneyBold text-5xl"
            >
              FOTOWOLTAIKA
            </h1>
            <ScrollArea h={"78%"}>
              <div className=" mr-4">
                <h2 className="font-orkneyBold">CENA ENERGII</h2>
                <InputComponent
                  title="W LIMICIE"
                  onChange={mutations.handleInLimitOnChange}
                  step={0.1}
                  value={photovoltaicStore.energyPriceInLimit}
                />
                <InputComponent
                  title="POZA LIMICIE"
                  onChange={mutations.handleOutOfLimitOnChange}
                  step={0.1}
                  value={photovoltaicStore.energyPriceOutOfLimit}
                />
                <InputComponent
                  title="ILOŚĆ ENERGII ZUŻYWANEJ ŚREDNIO ROCZNIE"
                  onChange={(e) => {
                    store.updatePhotovoltaic(
                      "recentYearTrendUsage",
                      e.target.valueAsNumber
                    );
                  }}
                  step={500}
                  value={
                    store.photovoltaicStore.recentYearTrendUsage === 0
                      ? ""
                      : store.photovoltaicStore.recentYearTrendUsage
                  }
                />
                <InputComponent
                  title="LIMIT ZUŻYCIA"
                  onChange={(e) => {
                    store.updatePhotovoltaic(
                      "usageLimit",
                      e.target.valueAsNumber
                    );
                  }}
                  step={500}
                  value={
                    photovoltaicStore.usageLimit === 0
                      ? ""
                      : photovoltaicStore.usageLimit
                  }
                />
                <h2 className="mt-5 font-orkneyBold">
                  INSTALACJA FOTOWOLTAICZNA
                </h2>
                {/* <SelectComponent
                  title="PROMOCJA 800+"
                  onChange={(e) =>
                    store.updatePhotovoltaic("voucher", e == "true")
                  }
                  value={photovoltaicStore.voucher}
                  data={yesNoData}
                /> */}
                <SelectComponent
                  title="MOC POJEDYŃCZEGO PANELA W KW"
                  onChange={(e) => {
                    store.updatePhotovoltaic("panelPower", Number(e));
                  }}
                  value={photovoltaicStore.panelPower}
                  data={[
                    { value: "400", label: "400" },
                    { value: "455", label: "455" },
                    { value: "500", label: "500" },
                  ]}
                />
                <InputComponent
                  title="LICZBA MODUŁÓW"
                  onChange={(e) =>
                    store.updatePhotovoltaic(
                      "modulesCount",
                      e.target.valueAsNumber
                    )
                  }
                  step={1}
                  value={photovoltaicStore.modulesCount}
                />
                <SelectComponent
                  title="MONTAŻ NA GRUNCIE"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isGroundMontage", e == "true")
                  }
                  value={photovoltaicStore.isGroundMontage}
                  data={yesNoData}
                />
                <SelectComponent
                  title="STOPIEŃ AUTOKONSUMPCJI ENERGII Z PV"
                  onChange={(e) => {
                    store.updatePhotovoltaic(
                      "autoconsumptionInPercent",
                      Number(e)
                    );
                  }}
                  value={photovoltaicStore.autoconsumptionInPercent}
                  data={[
                    { value: "0.1", label: "10%" },
                    { value: "0.2", label: "20%" },
                    { value: "0.3", label: "30%" },
                    { value: "0.4", label: "40%" },
                    { value: "0.5", label: "50%" },
                    { value: "0.6", label: "60%" },
                    { value: "0.7", label: "70%" },
                    { value: "0.8", label: "80%" },
                  ]}
                />
                {!photovoltaicStore.isGroundMontage && (
                  <SelectComponent
                    title="DACH SKIEROWANY NA POŁUDNIE"
                    onChange={(e) =>
                      store.updatePhotovoltaic("southRoof", e == "true")
                    }
                    value={photovoltaicStore.southRoof}
                    data={yesNoData}
                  />
                )}
                <SelectComponent
                  title="MONTAŻ NA WIELU POWIERZCHNIACH - SOLAR EDGE"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isSolarEdgeChoosed", e == "true")
                  }
                  value={photovoltaicStore.isSolarEdgeChoosed}
                  data={yesNoData}
                />
                {!photovoltaicStore.isGroundMontage && (
                  <SelectComponent
                    title="MONTAŻ NA DACHU PŁASKIM - EKIERKI"
                    onChange={(e) =>
                      store.updatePhotovoltaic(
                        "isEccentricsChoosed",
                        e == "true"
                      )
                    }
                    value={photovoltaicStore.isEccentricsChoosed}
                    data={yesNoData}
                  />
                )}
                {!photovoltaicStore.isGroundMontage && (
                  <SelectComponent
                    title="SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY"
                    onChange={(e) =>
                      store.updatePhotovoltaic(
                        "isRoofWeightSystem",
                        e == "true"
                      )
                    }
                    value={photovoltaicStore.isRoofWeightSystem}
                    data={yesNoData}
                  />
                )}
                <InputComponent
                  title="OPTYMALIZATORY TIGO DO ZACIEMNIONYCH MODUŁÓW"
                  onChange={(e) => {
                    store.updatePhotovoltaic(
                      "tigoCount",
                      e.target.valueAsNumber
                    );
                    mutations.handleTigoinput(e);
                  }}
                  step={1}
                  value={
                    photovoltaicStore.tigoCount == 0
                      ? ""
                      : photovoltaicStore.tigoCount
                  }
                />
                <SelectComponent
                  title="INWERTER HYBRYDOWY"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isInwerterChoosed", e == "true")
                  }
                  value={photovoltaicStore.isInwerterChoosed}
                  data={yesNoData}
                />
                <SelectComponent
                  title="MAGAZYN CIEPŁA"
                  onChange={(e) =>
                    store.updatePhotovoltaic("heatStoreDotation", e == "true")
                  }
                  value={photovoltaicStore.heatStoreDotation}
                  data={yesNoData}
                />
                {photovoltaicStore.heatStoreDotation && data && (
                  <SelectComponent
                    title={"WIELKOŚĆ ZBIORNIKA CWU"}
                    onChange={(e) => {
                      store.updatePhotovoltaic("tankSize", String(e));
                      mutations.set_heatStore_cost({
                        choosed_tank_type: String(e),
                        tanks_costs: data?.zbiorniki,
                      });
                    }}
                    value={photovoltaicStore.tankSize}
                    data={[
                      { value: "Brak", label: "Brak" },
                      { value: "Zbiornik 100L", label: "Zbiornik 100L" },
                      { value: "Zbiornik 140L", label: "Zbiornik 140L" },
                      {
                        value: "Zbiornik 140L z wężownicą",
                        label: "Zbiornik 140L z wężownicą",
                      },
                      { value: "Zbiornik 200L", label: "Zbiornik 200L" },
                      {
                        value: "Zbiornik 200L z wężownicą",
                        label: "Zbiornik 200L z wężownicą",
                      },
                    ]}
                  />
                )}
                <SelectComponent
                  title="EMS"
                  onChange={(e) =>
                    store.updatePhotovoltaic("emsDotation", e == "true")
                  }
                  value={photovoltaicStore.emsDotation}
                  data={yesNoData}
                />
                <SelectComponent
                  title="MAGAZYN ENERGII"
                  onChange={(e) =>
                    store.updatePhotovoltaic("energyStoreDotation", e == "true")
                  }
                  value={photovoltaicStore.energyStoreDotation}
                  data={yesNoData}
                />
                {photovoltaicStore.energyStoreDotation && (
                  <SelectComponent
                    title="MOC MAGAZYNU ENERGII"
                    onChange={(e) => {
                      store.updatePhotovoltaic("energyStorePower", Number(e));
                    }}
                    value={photovoltaicStore.energyStorePower}
                    data={[
                      "6.3",
                      "11.6",
                      "17.4",
                      "23.2",
                      "29",
                      "34.8",
                      "40.6",
                      "46.4",
                    ]}
                  />
                )}
                <SelectComponent
                  title="ULGA PODATKOWA"
                  onChange={(e) =>
                    store.updatePhotovoltaic("taxCredit", Number(e))
                  }
                  value={photovoltaicStore.taxCredit}
                  data={[
                    { value: "0", label: "0%" },
                    { value: "0.12", label: "12%" },
                    { value: "0.32", label: "32%" },
                  ]}
                />
                <InputComponent
                  title="LICZBA RAT"
                  onChange={(e) => {
                    store.updatePhotovoltaic(
                      "installmentNumber",
                      e.target.valueAsNumber
                    );
                  }}
                  step={10}
                  value={photovoltaicStore.installmentNumber}
                />
              </div>
            </ScrollArea>
          </div>
          <Preview
            photovoltaics_dotation={photovoltaics_dotation}
            heatStore_dotation={photovoltaicCalcStore.heatStoreCalcDotation}
            energyStore_dotation={energyStore_dotation}
          />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
