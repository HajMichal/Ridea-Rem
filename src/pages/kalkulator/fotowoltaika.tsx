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
  Preview,
} from "~/components";
import { ScrollArea } from "@mantine/core";

export interface JsonFileData {
  cena_skupu_pradu: number;
  dane: {
    dwa: number;
    cztery: number;
    szesc: number;
    osiem: number;
    dwanascie: number;
    dwadziescia: number;
    trzydziesci: number;
    piecdziesiat: number;
  };
  dotacje: {
    magazynCiepla: number;
    menagerEnergii: number;
    mojPrad: number;
    mp_mc: number;
  };
  koszty_dodatkowe: {
    bloczki: number;
    tigo: number;
    ekierki: number;
    grunt: number;
    inwerterHybrydowy: number;
    solarEdge: number;
  };
  magazynCiepla: number;
  prowizjaBiura: number;
}

export interface PRZYSZLY_INTERFACE {
  kalkulator: {
    czterysta: {
      dane: {
        dwa: number;
        cztery: number;
        szesc: number;
        osiem: number;
        dwanascie: number;
        dwadziescia: number;
        trzydziesci: number;
        piecdziesiat: number;
      };
      dotacje: {
        magazynCiepla: number;
        menagerEnergii: number;
        mojPrad: number;
        mp_mc: number;
      };
      koszty_dodatkowe: {
        bloczki: number;
        tigo: number;
        ekierki: number;
        grunt: number;
        inwerterHybrydowy: number;
        solarEdge: number;
      };
      magazynCiepla: number;
      tarczaSolidarnosciowa: string[];
      prowizjaBiura: number;
    };
    czterystaPol: {
      dane: {
        dwa: number;
        cztery: number;
        szesc: number;
        osiem: number;
        dwanascie: number;
        dwadziescia: number;
        trzydziesci: number;
        piecdziesiat: number;
      };
      dotacje: {
        magazynCiepla: number;
        menagerEnergii: number;
        mojPrad: number;
        mp_mc: number;
      };
      koszty_dodatkowe: {
        bloczki: number;
        tigo: number;
        ekierki: number;
        grunt: number;
        inwerterHybrydowy: number;
        solarEdge: number;
      };
      magazynCiepla: number;
      tarczaSolidarnosciowa: string[];
      prowizjaBiura: number;
    };
    piecset: {
      dane: {
        dwa: number;
        cztery: number;
        szesc: number;
        osiem: number;
        dwanascie: number;
        dwadziescia: number;
        trzydziesci: number;
        piecdziesiat: number;
      };
      dotacje: {
        magazynCiepla: number;
        menagerEnergii: number;
        mojPrad: number;
        mp_mc: number;
      };
      koszty_dodatkowe: {
        bloczki: number;
        tigo: number;
        ekierki: number;
        grunt: number;
        inwerterHybrydowy: number;
        solarEdge: number;
      };
      magazynCiepla: number;
      tarczaSolidarnosciowa: string[];
      prowizjaBiura: number;
    };
  };
}
const Fotowoltaika = () => {
  const store = useStore();
  const { photovoltaicStore, photovoltaicCalcStore, mutations } =
    usePhotovoltaic();
  const { data: sessionData } = useSession();
  const router = useRouter();

  // const { mutate } = api.dataFlow.setJSONFile.useMutation();
  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>(
    sessionData?.user.id
  );

  // Dotations
  const energyStore_dotation = photovoltaicStore.energyManageSystem
    ? data?.dotacje.menagerEnergii
    : 0;
  const photovoltaics_dotation = store.photovoltaicStore.energyManageSystem
    ? data?.dotacje.mp_mc
    : data?.dotacje.mojPrad;

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

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
        estiamtedSellPriceToOsd: data?.cena_skupu_pradu,
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
        dane: data?.dane,
      });
    }
  }, [
    data,
    photovoltaicCalcStore.system_power,
    mutations.set_installationAndPer1KW_price,
  ]);

  useEffect(() => {
    if (
      data &&
      photovoltaicStore.modulesCount &&
      photovoltaicStore.isEccentricsChoosed
    )
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
    if (
      data &&
      photovoltaicCalcStore.system_power &&
      photovoltaicStore.isRoofWeightSystem
    )
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
    if (photovoltaicCalcStore.system_power && sessionData)
      mutations.set_markup_costs({
        system_power: photovoltaicCalcStore.system_power,
        officeFee: sessionData.user.feePerkw,
        constantFee: sessionData.user.imposedFee,
        consultantFee: photovoltaicStore.consultantMarkup,
      });
  }, [
    photovoltaicCalcStore.system_power,
    sessionData,
    photovoltaicStore.consultantMarkup,
    mutations.set_markup_costs,
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
          photovoltaicCalcStore.heatStore_energyManager_costs ?? 0,
      });
  }, [
    photovoltaicCalcStore.addon_cost,
    photovoltaicCalcStore.installationAndPer1KW_price?.base_installation_price,
    photovoltaicCalcStore.heatStore_energyManager_costs,
    mutations.set_totalInstallationCost,
  ]);

  useEffect(() => {
    mutations.set_dotations_sum({
      energyStore_dotation: energyStore_dotation ?? 0,
      photovoltaics_dotation: photovoltaics_dotation ?? 0,
      heatStore_dotation: photovoltaicCalcStore.heatStore_dotation_value ?? 0,
    });
  }, [
    photovoltaics_dotation,
    energyStore_dotation,
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
        termoModernization: photovoltaicCalcStore.termo_modernization,
      });
  }, [
    photovoltaicCalcStore.dotations_sum,
    photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost,
    mutations.set_amount_after_dotation,
  ]);
  useEffect(() => {
    mutations.set_heatStore_energyManager_costs({
      heatStore_cost: photovoltaicCalcStore.heatStore_cost ?? 0,
      isEnergyManagerSystem: photovoltaicStore.energyManageSystem,
    });
  }, [
    photovoltaicCalcStore.heatStore_cost,
    photovoltaicStore.energyManageSystem,
    mutations.set_heatStore_energyManager_costs,
  ]);

  useEffect(() => {
    if (
      photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost &&
      photovoltaicCalcStore.dotations_sum
    )
      mutations.set_amount_tax_credit({
        amount_after_dotation:
          photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost -
          photovoltaicCalcStore.dotations_sum,
        tax_credit: photovoltaicStore.taxCredit,
      });
  }, [
    photovoltaicCalcStore.totalInstallationCosts?.total_gross_cost,
    photovoltaicStore.taxCredit,
    photovoltaicCalcStore.dotations_sum,
    mutations.set_amount_tax_credit,
  ]);
  useEffect(() => {
    if (photovoltaicCalcStore.amount_after_dotation)
      mutations.set_finall_installation_cost({
        amount_after_dotation: photovoltaicCalcStore.amount_after_dotation,
        amount_tax_credit: photovoltaicCalcStore.amount_tax_credit ?? 0,
      });
  }, [
    photovoltaicCalcStore.amount_after_dotation,
    photovoltaicCalcStore.amount_tax_credit,
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
      mutations.set_heatStore_dotation_value({
        gross_instalation_cost:
          photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
      });
  }, [
    photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
    mutations.set_heatStore_dotation_value,
  ]);
  useEffect(() => {
    mutations.set_termo_modernization({
      dotation_sum: photovoltaicCalcStore.dotations_sum,
      tax_credit: photovoltaicStore.taxCredit,
      total_gross_value:
        photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
    });
  }, [
    photovoltaicCalcStore.totalInstallationCosts.total_gross_cost,
    photovoltaicStore.taxCredit,
    photovoltaicCalcStore.dotations_sum,
  ]);

  const yesNoData = [
    { value: "true", label: "Tak" },
    { value: "false", label: "Nie" },
  ];

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
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
                  title="STOPIEŃ RABATU"
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
                  onChange={mutations.handleModulesInput}
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
                  title="MONTAŻ NA WIELU POWIEŻNIACH - SOLAR EDGE"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isSolarEdgeChoosed", e == "true")
                  }
                  value={photovoltaicStore.isSolarEdgeChoosed}
                  data={yesNoData}
                />
                {!photovoltaicStore.isGroundMontage && (
                  <SelectComponent
                    title="MONTAŻ NA DACHU PŁASKIM"
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
                {/* <SelectComponent
                  title="MONTAŻ, DOWÓZ, URUCHOMIENIE - NARZUT DORADCY"
                  onChange={(e) => {
                    store.updatePhotovoltaic("consultantMarkup", Number(e));
                  }}
                  value={photovoltaicStore.consultantMarkup}
                  data={[
                    { value: "0", label: "0" },
                    { value: "100", label: "100" },
                    { value: "200", label: "200" },
                    { value: "300", label: "300" },
                    { value: "400", label: "400" },
                    { value: "500", label: "500" },
                    { value: "550", label: "550" },
                    { value: "600", label: "600" },
                    { value: "650", label: "650" },
                    { value: "700", label: "700" },
                    { value: "750", label: "750" },
                    { value: "800", label: "800" },
                    { value: "850", label: "850" },
                    { value: "900", label: "900" },
                    { value: "950", label: "950" },
                    { value: "1000", label: "1000" },
                  ]}
                /> */}
                <SelectComponent
                  title="INWERTER HYBRYDOWY"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isInwerterChoosed", e == "true")
                  }
                  value={photovoltaicStore.isInwerterChoosed}
                  data={yesNoData}
                />
                <SelectComponent
                  title="MAGAZYN CIEPŁA + EMS"
                  onChange={(e) =>
                    store.updatePhotovoltaic("energyManageSystem", e == "true")
                  }
                  value={photovoltaicStore.energyManageSystem}
                  data={yesNoData}
                />
                {photovoltaicStore.energyManageSystem && (
                  <SelectComponent
                    title={"WIELKOŚĆ ZBIORNIKA CWU"}
                    onChange={(e) => {
                      store.updatePhotovoltaic("tankSize", String(e));
                      mutations.set_heatStore_cost({
                        choosed_tank_type: String(e),
                      });
                    }}
                    value={photovoltaicStore.tankSize}
                    data={[
                      { value: "Zbiornik 100L", label: "Zbiornik 100L" },
                      { value: "Zbiornik 140L", label: "Zbiornik 140L" },
                      { value: "Zbiornik 200L", label: "Zbiornik 200L" },
                      {
                        value: "Zbiornik 200L z wężownicą",
                        label: "Zbiornik 200L z wężownicą",
                      },
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
              </div>
            </ScrollArea>
          </div>
          <Preview
            photovoltaics_dotation={photovoltaics_dotation}
            heatStore_dotation={photovoltaicCalcStore.heatStore_dotation_value}
            energyStore_dotation={energyStore_dotation}
          />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
