import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FiChevronDown } from "react-icons/fi";

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
  kalkulator: {
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
}

const Fotowoltaika = () => {
  const store = useStore();
  const { photovoltaic, photovoltaicCalc, mutations } = usePhotovoltaic();
  const { data: sessionData } = useSession();
  const router = useRouter();

  // const { mutate } = api.dataFlow.setJSONFile.useMutation();
  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();
  console.log(data);

  // Dotations
  const energyStore_dotation = store.photovoltaic.energyManageSystem
    ? data?.kalkulator.dotacje.menagerEnergii
    : 0;
  const photovoltaics_dotation = store.photovoltaic.energyManageSystem
    ? data?.kalkulator.dotacje.mp_mc
    : data?.kalkulator.dotacje.mojPrad;
  const heatStore_dotation = store.photovoltaic.energyManageSystem
    ? data?.kalkulator.dotacje.magazynCiepla
    : 0;

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

  useEffect(() => {
    if (photovoltaicCalc.system_power) {
      mutations.set_estimated_kWh_prod({
        southRoof: photovoltaic.southRoof,
        system_power: photovoltaicCalc.system_power,
      });
    }
  }, [
    photovoltaicCalc.system_power,
    photovoltaic.southRoof,
    mutations.set_estimated_kWh_prod,
  ]);
  useEffect(() => {
    if (photovoltaicCalc.estimated_kWh_prod)
      mutations.set_autoconsumption({
        autoconsumption_step: photovoltaic.autoconsumptionInPercent,
        estimated_kWh_prod: photovoltaicCalc.estimated_kWh_prod,
      });
  }, [
    photovoltaic.autoconsumptionInPercent,
    photovoltaicCalc.estimated_kWh_prod,
    mutations.set_autoconsumption,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalc.autoconsumption &&
      photovoltaic.energyPriceInLimit &&
      photovoltaic.energyPriceOutOfLimit &&
      photovoltaic.recentYearTrendUsage
    )
      mutations.set_total_payment_energy_transfer({
        autoconsumption: photovoltaicCalc.autoconsumption,
        priceInLimit: photovoltaic.energyPriceInLimit,
        priceOutOfLimit: photovoltaic.energyPriceOutOfLimit,
        recentYearTrendUsage: photovoltaic.recentYearTrendUsage,
        usageLimit: photovoltaic.usageLimit,
      });
  }, [
    photovoltaicCalc.autoconsumption,
    photovoltaic.energyPriceInLimit,
    photovoltaic.usageLimit,
    photovoltaic.energyPriceOutOfLimit,
    photovoltaic.recentYearTrendUsage,
    mutations.set_total_payment_energy_transfer,
  ]);
  useEffect(() => {
    if (photovoltaicCalc.autoconsumption && photovoltaicCalc.estimated_kWh_prod)
      mutations.set_energy_sold_to_distributor({
        autoconsumption: photovoltaicCalc.autoconsumption,
        estimated_kWh_prod: photovoltaicCalc.estimated_kWh_prod,
      });
  }, [
    photovoltaicCalc.autoconsumption,
    photovoltaicCalc.estimated_kWh_prod,
    mutations.set_energy_sold_to_distributor,
  ]);
  useEffect(() => {
    if (photovoltaicCalc.energy_sold_to_distributor)
      mutations.set_accumulated_funds_on_account(
        photovoltaicCalc.energy_sold_to_distributor
      );
  }, [
    photovoltaicCalc.energy_sold_to_distributor,
    mutations.set_accumulated_funds_on_account,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalc.accumulated_funds_on_account &&
      photovoltaicCalc.autoconsumption &&
      photovoltaic.energyPriceInLimit &&
      photovoltaic.energyPriceOutOfLimit &&
      photovoltaic.recentYearTrendUsage
    ) {
      mutations.set_total_energy_trend_fee({
        accumulated_funds_on_account:
          photovoltaicCalc.accumulated_funds_on_account,
        autoconsumption: photovoltaicCalc.autoconsumption,
        priceInLimit: photovoltaic.energyPriceInLimit,
        priceOutOfLimit: photovoltaic.energyPriceOutOfLimit,
        usageLimit: photovoltaic.usageLimit,
        recentYearTrendUsage: photovoltaic.recentYearTrendUsage,
      });
    }
  }, [
    photovoltaicCalc.accumulated_funds_on_account,
    photovoltaicCalc.autoconsumption,
    photovoltaic.energyPriceInLimit,
    photovoltaic.energyPriceOutOfLimit,
    photovoltaic.usageLimit,
    photovoltaic.recentYearTrendUsage,
    mutations.set_total_energy_trend_fee,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalc.limit_price_trend &&
      photovoltaicCalc.outOfLimit_price_trend &&
      photovoltaic.recentYearTrendUsage
    )
      mutations.set_yearly_bill_without_photovolatics({
        limit_price_trend: photovoltaicCalc.limit_price_trend,
        outOfLimit_price_trend: photovoltaicCalc.outOfLimit_price_trend,
        recentYearTrendUsage: photovoltaic.recentYearTrendUsage,
        usageLimit: photovoltaic.usageLimit,
      });
  }, [
    photovoltaic.usageLimit,
    photovoltaic.recentYearTrendUsage,
    photovoltaicCalc.outOfLimit_price_trend,
    photovoltaicCalc.limit_price_trend,
    mutations.set_yearly_bill_without_photovolatics,
  ]);
  useEffect(() => {
    if (
      photovoltaic.energyPriceInLimit &&
      photovoltaic.energyPriceOutOfLimit &&
      photovoltaic.recentYearTrendUsage
    )
      mutations.set_yearly_total_fees({
        energyPriceInLimit: photovoltaic.energyPriceInLimit,
        energyPriceOutOfLimit: photovoltaic.energyPriceOutOfLimit,
        recentYearTrendUsage: photovoltaic.recentYearTrendUsage,
        usageLimit: photovoltaic.usageLimit,
      });
  }, [
    photovoltaic.usageLimit,
    photovoltaic.recentYearTrendUsage,
    photovoltaic.energyPriceInLimit,
    photovoltaic.energyPriceOutOfLimit,
    mutations.set_yearly_total_fees,
  ]);
  useEffect(() => {
    if (
      // eslint-disable-next-line
      (photovoltaicCalc.total_energy_trend_fee ||
        photovoltaicCalc.total_energy_trend_fee === 0) &&
      // eslint-disable-next-line
      (photovoltaicCalc.total_payment_energy_transfer ||
        photovoltaicCalc.total_payment_energy_transfer === 0)
    )
      mutations.set_yearly_costs_with_photovoltaics({
        total_energy_trend_fee: photovoltaicCalc.total_energy_trend_fee,
        total_payment_energy_transfer:
          photovoltaicCalc.total_payment_energy_transfer,
      });
  }, [
    photovoltaicCalc.total_energy_trend_fee,
    photovoltaicCalc.total_payment_energy_transfer,
    mutations.set_yearly_costs_with_photovoltaics,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalc.yearly_costs_with_photovoltaics &&
      photovoltaicCalc.yearly_bill_without_photovolatics
    )
      mutations.set_total_save({
        yearly_bill_without_photovolatics:
          photovoltaicCalc.yearly_bill_without_photovolatics,
        yearly_costs_with_photovoltaics:
          photovoltaicCalc.yearly_costs_with_photovoltaics,
      });
  }, [
    photovoltaicCalc.yearly_costs_with_photovoltaics,
    photovoltaicCalc.yearly_bill_without_photovolatics,
    mutations.set_total_save,
  ]);
  useEffect(() => {
    if (photovoltaicCalc.system_power && data) {
      mutations.set_installationAndPer1KW_price({
        system_power: photovoltaicCalc.system_power,
        dane: data?.kalkulator.dane,
      });
    }
  }, [
    data,
    photovoltaicCalc.system_power,
    mutations.set_installationAndPer1KW_price,
  ]);

  useEffect(() => {
    if (data && photovoltaic.modulesCount)
      mutations.set_ekierki_price({
        price: data.kalkulator.koszty_dodatkowe.ekierki,
        isChoosed: photovoltaic.isEccentricsChoosed,
        modules_count: photovoltaic.modulesCount,
      });
  }, [
    photovoltaic.modulesCount,
    data,
    photovoltaic.isEccentricsChoosed,
    mutations.set_ekierki_price,
  ]);
  useEffect(() => {
    if (data && photovoltaicCalc.system_power)
      mutations.set_bloczki_price({
        price: data.kalkulator.koszty_dodatkowe.bloczki,
        isChoosed: photovoltaic.isRoofWeightSystem,
        system_power: photovoltaicCalc.system_power,
      });
  }, [
    photovoltaicCalc.system_power,
    data,
    photovoltaic.isRoofWeightSystem,
    mutations.set_bloczki_price,
  ]);
  useEffect(() => {
    if (data && photovoltaicCalc.system_power)
      mutations.set_grunt_price({
        price: data.kalkulator.koszty_dodatkowe.grunt,
        isChoosed: photovoltaic.isGroundMontage,
        system_power: photovoltaicCalc.system_power,
      });
  }, [
    photovoltaicCalc.system_power,
    data,
    photovoltaic.isGroundMontage,
    mutations.set_grunt_price,
  ]);
  useEffect(() => {
    if (data && photovoltaic.modulesCount)
      mutations.set_solarEdge_price({
        price: data.kalkulator.koszty_dodatkowe.solarEdge,
        isChoosed: photovoltaic.isSolarEdgeChoosed,
        modules_count: photovoltaic.modulesCount,
      });
  }, [
    photovoltaic.modulesCount,
    photovoltaic.isSolarEdgeChoosed,
    data,
    mutations.set_solarEdge_price,
  ]);
  useEffect(() => {
    if (data)
      mutations.set_hybridInwerter_price({
        hybridInwerter_price:
          data.kalkulator.koszty_dodatkowe.inwerterHybrydowy,
        isHybridInwerterChoosed: photovoltaic.isInwerterChoosed,
      });
  }, [
    data,
    photovoltaic.isInwerterChoosed,
    mutations.set_hybridInwerter_price,
  ]);
  useEffect(() => {
    if (photovoltaicCalc.system_power && data)
      mutations.set_markup_costs({
        system_power: photovoltaicCalc.system_power,
        officeFee: data?.kalkulator.prowizjaBiura,
        constantFee: 0,
        consultantFee: photovoltaic.consultantMarkup,
      });
  }, [
    store.photovoltaic.consultantMarkup,
    photovoltaicCalc.system_power,
    data,
    photovoltaic.consultantMarkup,
    mutations.set_markup_costs,
  ]);
  useEffect(() => {
    mutations.set_addon_cost({
      bloczki: photovoltaicCalc.bloczki_price,
      ekierki: photovoltaicCalc.ekierki_price,
      grunt: photovoltaicCalc.grunt_price,
      hybridInwerter: photovoltaicCalc.hybridInwerter_price,
      solarEdge: photovoltaicCalc.solarEdge_price,
      tigo: photovoltaicCalc.tigo_price,
      voucher: photovoltaic.voucher,
      markup_costs: photovoltaicCalc.markup_costs ?? 0,
    });
  }, [
    photovoltaicCalc.bloczki_price,
    photovoltaicCalc.ekierki_price,
    photovoltaicCalc.grunt_price,
    photovoltaicCalc.hybridInwerter_price,
    photovoltaicCalc.solarEdge_price,
    photovoltaicCalc.tigo_price,
    photovoltaic.voucher,
    photovoltaicCalc.markup_costs,
    mutations.set_addon_cost,
  ]);
  useEffect(() => {
    if (
      photovoltaicCalc.addon_cost &&
      photovoltaicCalc.installationAndPer1KW_price?.base_installation_price
    )
      mutations.set_totalInstallationCost({
        addon_costs: photovoltaicCalc.addon_cost,
        base_installation_costs:
          photovoltaicCalc.installationAndPer1KW_price.base_installation_price,
        heatStore_energyManager_costs:
          photovoltaicCalc.heatStore_energyManager_costs ?? 0,
      });
  }, [
    photovoltaicCalc.addon_cost,
    photovoltaicCalc.installationAndPer1KW_price?.base_installation_price,
    photovoltaicCalc.heatStore_energyManager_costs,
    mutations.set_totalInstallationCost,
  ]);

  useEffect(() => {
    mutations.set_dotations_sum({
      energyStore_dotation: energyStore_dotation ?? 0,
      photovoltaics_dotation: photovoltaics_dotation ?? 0,
      heatStore_dotation: heatStore_dotation ?? 0,
    });
  }, [
    heatStore_dotation,
    photovoltaics_dotation,
    energyStore_dotation,
    mutations.set_dotations_sum,
  ]);

  useEffect(() => {
    if (
      photovoltaicCalc.dotations_sum &&
      photovoltaicCalc.totalInstallationCost?.total_gross_cost
    )
      mutations.set_amount_after_dotation({
        gross_instalation_cost:
          photovoltaicCalc.totalInstallationCost?.total_gross_cost,
        summed_dotations: photovoltaicCalc.dotations_sum,
      });
  }, [
    photovoltaicCalc.dotations_sum,
    photovoltaicCalc.totalInstallationCost?.total_gross_cost,
    mutations.set_amount_after_dotation,
  ]);
  useEffect(() => {
    mutations.set_heatStore_energyManager_costs({
      heatStore_cost: photovoltaicCalc.heatStore_cost ?? 0,
      isEnergyManagerSystem: photovoltaic.energyManageSystem,
    });
  }, [
    photovoltaicCalc.heatStore_cost,
    photovoltaic.energyManageSystem,
    mutations.set_heatStore_energyManager_costs,
  ]);

  useEffect(() => {
    if (
      photovoltaicCalc.totalInstallationCost?.total_gross_cost &&
      photovoltaicCalc.dotations_sum
    )
      mutations.set_amount_tax_credit({
        amount_after_dotation:
          photovoltaicCalc.totalInstallationCost?.total_gross_cost -
          photovoltaicCalc.dotations_sum,
        tax_credit: photovoltaic.taxCredit,
      });
  }, [
    photovoltaicCalc.totalInstallationCost?.total_gross_cost,
    photovoltaic.taxCredit,
    photovoltaicCalc.dotations_sum,
    mutations.set_amount_tax_credit,
  ]);
  useEffect(() => {
    if (photovoltaicCalc.amount_after_dotation)
      mutations.set_finall_installation_cost({
        amount_after_dotation: photovoltaicCalc.amount_after_dotation,
        amount_tax_credit: photovoltaicCalc.amount_tax_credit ?? 0,
      });
  }, [
    photovoltaicCalc.amount_after_dotation,
    photovoltaicCalc.amount_tax_credit,
    mutations.set_finall_installation_cost,
  ]);

  const yesNoData = [
    { value: "true", label: "Tak" },
    { value: "false", label: "Nie" },
  ];

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-[#E8E7E7] font-orkney">
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
            <ScrollArea h={"75%"}>
              <div className=" mr-4">
                <h2 className="font-orkneyBold">CENA ENERGII</h2>
                <InputComponent
                  title="W LIMICIE"
                  onChange={mutations.handleInLimitOnChange}
                  step={0.1}
                  value={photovoltaic.energyPriceInLimit}
                />
                <InputComponent
                  title="POZA LIMICIE"
                  onChange={mutations.handleOutOfLimitOnChange}
                  step={0.1}
                  value={photovoltaic.energyPriceOutOfLimit}
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
                    store.photovoltaic.recentYearTrendUsage === 0
                      ? ""
                      : store.photovoltaic.recentYearTrendUsage
                  }
                />
                <SelectComponent
                  title="LIMIT ZUŻYCIA"
                  onChange={(e) => {
                    store.updatePhotovoltaic("usageLimit", Number(e));
                  }}
                  value={photovoltaic.usageLimit}
                  data={data?.kalkulator.tarczaSolidarnosciowa ?? []}
                />

                <h2 className="mt-5 font-orkneyBold">
                  INSTALACJA FOTOWOLTAICZNA
                </h2>
                <SelectComponent
                  title="STOPIEŃ RABATU"
                  onChange={(e) =>
                    store.updatePhotovoltaic("voucher", e == "true")
                  }
                  value={photovoltaic.voucher}
                  data={yesNoData}
                />
                <InputComponent
                  title="LICZBA MODUŁÓW"
                  onChange={mutations.handleModulesInput}
                  step={1}
                  value={photovoltaic.modulesCount}
                />
                <SelectComponent
                  title="MONTAŻ NA GRUNCIE"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isGroundMontage", e == "true")
                  }
                  value={photovoltaic.isGroundMontage}
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
                  value={photovoltaic.autoconsumptionInPercent}
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
                {!photovoltaic.isGroundMontage && (
                  <SelectComponent
                    title="DACH SKIEROWANY NA POŁUDNIE"
                    onChange={(e) =>
                      store.updatePhotovoltaic("southRoof", e == "true")
                    }
                    value={photovoltaic.southRoof}
                    data={yesNoData}
                  />
                )}
                <SelectComponent
                  title="MONTAŻ NA WIELU POWIEŻNIACH - SOLAR EDGE"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isSolarEdgeChoosed", e == "true")
                  }
                  value={photovoltaic.isSolarEdgeChoosed}
                  data={yesNoData}
                />
                {!photovoltaic.isGroundMontage && (
                  <SelectComponent
                    title="MONTAŻ NA DACHU PŁASKIM"
                    onChange={(e) =>
                      store.updatePhotovoltaic(
                        "isEccentricsChoosed",
                        e == "true"
                      )
                    }
                    value={photovoltaic.isEccentricsChoosed}
                    data={yesNoData}
                  />
                )}
                {!photovoltaic.isGroundMontage && (
                  <SelectComponent
                    title="SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY"
                    onChange={(e) =>
                      store.updatePhotovoltaic(
                        "isRoofWeightSystem",
                        e == "true"
                      )
                    }
                    value={photovoltaic.isRoofWeightSystem}
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
                    photovoltaic.tigoCount == 0 ? "" : photovoltaic.tigoCount
                  }
                />
                <SelectComponent
                  title="MONTAŻ, DOWÓZ, URUCHOMIENIE - NARZUT DORADCY"
                  onChange={(e) => {
                    store.updatePhotovoltaic("consultantMarkup", Number(e));
                  }}
                  value={photovoltaic.consultantMarkup}
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
                />
                <SelectComponent
                  title="INWERTER HYBRYDOWY"
                  onChange={(e) =>
                    store.updatePhotovoltaic("isInwerterChoosed", e == "true")
                  }
                  value={photovoltaic.isInwerterChoosed}
                  data={yesNoData}
                />
                <SelectComponent
                  title="MAGAZYN CIEPŁA + EMS"
                  onChange={(e) =>
                    store.updatePhotovoltaic("energyManageSystem", e == "true")
                  }
                  value={photovoltaic.energyManageSystem}
                  data={yesNoData}
                />
                {photovoltaic.energyManageSystem && (
                  <SelectComponent
                    title={"WIELKOŚĆ ZBIORNIKA CWU"}
                    onChange={(e) => {
                      store.updatePhotovoltaic("tankSize", String(e));
                      mutations.set_heatStore_cost({
                        choosed_tank_type: String(e),
                      });
                    }}
                    value={photovoltaic.tankSize}
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
                  value={photovoltaic.taxCredit}
                  data={[
                    { value: "0", label: "0%" },
                    { value: "0.12", label: "12%" },
                    { value: "0.32", label: "32%" },
                  ]}
                />
              </div>
            </ScrollArea>
            <div className="mt-5 flex w-full justify-center">
              <FiChevronDown className="h-10 w-10 animate-pulse font-extrabold text-gray-400" />
            </div>
          </div>
          <Preview
            photovoltaics_dotation={photovoltaics_dotation}
            heatStore_dotation={heatStore_dotation}
            energyStore_dotation={energyStore_dotation}
          />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
