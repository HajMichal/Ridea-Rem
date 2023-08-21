import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useRouter } from "next/router";
import { SideBar } from "~/components/SideBar";
import { Select } from "@mantine/core";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";

import useStore from "~/store";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

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
    magazyn_ciepla: number;
    tarcza_solidarnosciowa: number[];
    prowizjaBiura: number;
  };
}

/*
const useFotowoltaika = () => {
    const store = useStore();  


    const update = (data: T) => {
      updateFotowoltaika().then((value) => store.setFotowoltaika(value));
    }

    async function updateSystemPower(data: T) {
      const response = await set_system_power(data);
      // ... code here ...
      return response
    }

    const { mutate: set_system_power, data: system_power } =
      api.photovoltaics.system_power.useMutation(); // D17

    const { mutate: set_estimated_kWh_prod, data: estimated_kWh_prod } =
      api.photovoltaics.estimated_kWh_production.useMutation(); // D18

    const { mutate: set_autoconsumption, data: autoconsumption } =
      api.photovoltaics.autoconsumption.useMutation(); // D20

    return {
      fotowoltaika: store.fotowoltaika,
      mutations: {
        updateSystemPower,
      }
      calculations: {
        system_power
      },
    }
}

... component

1)
const {fotowoltaika, calculations} = useFotowoltaika();

return <div>{fotoltowaika}</div>
2)
const {fotowoltaika, update} = useFotowoltaika();
*/

const Fotowoltaika = () => {
  const store = useStore();
  const { photovoltaic, calculations, mutations } = usePhotovoltaic();

  const { data: sessionData } = useSession();
  const router = useRouter();

  // const { mutate } = api.dataFlow.setJSONFile.useMutation();
  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();
  console.log(data);
  // console.log(calculations.estimated_kWh_prod);

  // const { mutate: set_limit_price_trend, data: limit_price_trend } =
  //   api.photovoltaics.price_trend.useMutation(); // D3
  // const { mutate: set_outOfLimit_price_trend, data: outOfLimit_price_trend } =
  //   api.photovoltaics.price_trend.useMutation(); // D4
  // const { mutate: set_system_power, data: system_power } =
  //   api.photovoltaics.system_power.useMutation(); // D17
  // const { mutate: set_estimated_kWh_prod, data: estimated_kWh_prod } =
  //   api.photovoltaics.estimated_kWh_production.useMutation(); // D18
  // const { mutate: set_autoconsumption, data: autoconsumption } =
  //   api.photovoltaics.autoconsumption.useMutation(); // D20
  // const {
  //   mutate: set_total_payment_energy_transfer,
  //   data: total_payment_energy_transfer, // D13
  // } = api.photovoltaics.total_payment_energy_transfer.useMutation();
  // const {
  //   mutate: set_energy_sold_to_distributor,
  //   data: energy_sold_to_distributor, // D21
  // } = api.photovoltaics.energy_sold_to_distributor.useMutation();
  // const {
  //   mutate: set_accumulated_funds_on_account,
  //   data: accumulated_funds_on_account, // D23
  // } = api.photovoltaics.accumulated_funds_on_account.useMutation();
  // const {
  //   mutate: set_total_energy_trend_fee,
  //   data: total_energy_trend_fee, // D23
  // } = api.photovoltaics.total_energy_trend_fee.useMutation();
  // const {
  //   mutate: set_yearly_bill_without_photovolatics,
  //   data: yearly_bill_without_photovolatics,
  // } = api.photovoltaics.yearly_bill_without_photovolatics.useMutation();
  // const { mutate: set_yearly_total_fees, data: yearly_total_fees } =
  //   api.photovoltaics.yearly_total_fees.useMutation();
  // const {
  //   mutate: set_yearly_costs_with_photovoltaics,
  //   data: yearly_costs_with_photovoltaics,
  // } = api.photovoltaics.yearly_costs_with_photovoltaics.useMutation();
  // const { mutate: set_total_save, data: total_save } =
  //   api.photovoltaics.total_save.useMutation();
  // const {
  //   mutate: set_installationAndPer1KW_price,
  //   data: installationAndPer1KW_price,
  // } = api.photovoltaics.price_for_1_KW.useMutation();
  // const { mutate: set_tigo_price, data: tigo_price } =
  //   api.photovoltaics.addon_tigo.useMutation();
  // const { mutate: set_ekierki_price, data: ekierki_price } =
  //   api.photovoltaics.addon_ekierki.useMutation();
  // const { mutate: set_bloczki_price, data: bloczki_price } =
  //   api.photovoltaics.addon_bloczki.useMutation();
  // const { mutate: set_grunt_price, data: grunt_price } =
  //   api.photovoltaics.addon_grunt.useMutation();
  // const { mutate: set_hybridInwerter_price, data: hybridInwerter_price } =
  //   api.photovoltaics.addon_hybridInwerter.useMutation();
  // const { mutate: set_solarEdge_price, data: solarEdge_price } =
  //   api.photovoltaics.addon_solarEdge.useMutation();
  // const { mutate: set_addon_cost, data: addon_cost } =
  //   api.photovoltaics.addon_cost.useMutation();
  // const { mutate: set_markup_costs, data: markup_costs } =
  //   api.photovoltaics.officeMarkup.useMutation();
  // const { mutate: set_totalInstallationCost, data: totalInstallationCost } =
  //   api.photovoltaics.totalInstallation_cost.useMutation();
  // const { mutate: set_dotations_sum, data: dotations_sum } =
  //   api.photovoltaics.dotations_sum.useMutation();
  // const { mutate: set_amount_after_dotation, data: amount_after_dotation } =
  //   api.photovoltaics.amount_after_dotation.useMutation();
  // const { mutate: set_amount_tax_credit, data: amount_tax_credit } =
  //   api.photovoltaics.amount_tax_credit.useMutation();
  // const { mutate: set_heatStore_cost, data: heatStore_cost } =
  //   api.photovoltaics.heatStore_cost.useMutation();
  // const {
  //   mutate: set_finall_installation_cost,
  //   data: finall_installation_cost,
  // } = api.photovoltaics.finall_installation_cost.useMutation();
  // const {
  //   mutate: set_heatStore_energyManager_costs,
  //   data: heatStore_energyManager_costs,
  // } = api.photovoltaics.heatStore_energyManager_costs.useMutation();

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
    if (calculations.system_power) {
      mutations.set_estimated_kWh_prod({
        southRoof: photovoltaic.southRoof,
        system_power: calculations.system_power,
      });
    }
  }, [calculations.system_power, photovoltaic.southRoof]);
  useEffect(() => {
    if (calculations.estimated_kWh_prod)
      mutations.set_autoconsumption({
        autoconsumption_step: photovoltaic.autoconsumptionInPercent,
        estimated_kWh_prod: calculations.estimated_kWh_prod,
      });
  }, [
    photovoltaic.autoconsumptionInPercent,
    calculations.estimated_kWh_prod,
    mutations.set_autoconsumption,
  ]);
  useEffect(() => {
    if (
      calculations.autoconsumption &&
      photovoltaic.energyPriceInLimit &&
      photovoltaic.energyPriceOutOfLimit &&
      photovoltaic.recentYearTrendUsage
    )
      mutations.set_total_payment_energy_transfer({
        autoconsumption: calculations.autoconsumption,
        priceInLimit: photovoltaic.energyPriceInLimit,
        priceOutOfLimit: photovoltaic.energyPriceOutOfLimit,
        recentYearTrendUsage: photovoltaic.recentYearTrendUsage,
        usageLimit: photovoltaic.usageLimit,
      });
  }, [
    calculations.autoconsumption,
    photovoltaic.energyPriceInLimit,
    photovoltaic.usageLimit,
    photovoltaic.energyPriceOutOfLimit,
    photovoltaic.recentYearTrendUsage,
  ]);
  useEffect(() => {
    if (calculations.autoconsumption && calculations.estimated_kWh_prod)
      mutations.set_energy_sold_to_distributor({
        autoconsumption: calculations.autoconsumption,
        estimated_kWh_prod: calculations.estimated_kWh_prod,
      });
  }, [calculations.autoconsumption, calculations.estimated_kWh_prod]);
  useEffect(() => {
    if (calculations.energy_sold_to_distributor)
      mutations.set_accumulated_funds_on_account(
        calculations.energy_sold_to_distributor
      );
  }, [calculations.energy_sold_to_distributor]);
  useEffect(() => {
    if (
      calculations.accumulated_funds_on_account &&
      calculations.autoconsumption &&
      photovoltaic.energyPriceInLimit &&
      photovoltaic.energyPriceOutOfLimit &&
      photovoltaic.recentYearTrendUsage
    ) {
      mutations.set_total_energy_trend_fee({
        accumulated_funds_on_account: calculations.accumulated_funds_on_account,
        autoconsumption: calculations.autoconsumption,
        priceInLimit: photovoltaic.energyPriceInLimit,
        priceOutOfLimit: photovoltaic.energyPriceOutOfLimit,
        usageLimit: photovoltaic.usageLimit,
        recentYearTrendUsage: photovoltaic.recentYearTrendUsage,
      });
    }
  }, [
    calculations.accumulated_funds_on_account,
    calculations.autoconsumption,
    photovoltaic.energyPriceInLimit,
    photovoltaic.energyPriceOutOfLimit,
    photovoltaic.usageLimit,
    photovoltaic.recentYearTrendUsage,
  ]);
  useEffect(() => {
    if (
      calculations.limit_price_trend &&
      calculations.outOfLimit_price_trend &&
      photovoltaic.recentYearTrendUsage
    )
      mutations.set_yearly_bill_without_photovolatics({
        limit_price_trend: calculations.limit_price_trend,
        outOfLimit_price_trend: calculations.outOfLimit_price_trend,
        recentYearTrendUsage: photovoltaic.recentYearTrendUsage,
        usageLimit: photovoltaic.usageLimit,
      });
  }, [
    photovoltaic.usageLimit,
    photovoltaic.recentYearTrendUsage,
    calculations.outOfLimit_price_trend,
    calculations.limit_price_trend,
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
  ]);
  useEffect(() => {
    if (
      // eslint-disable-next-line
      (calculations.total_energy_trend_fee ||
        calculations.total_energy_trend_fee === 0) &&
      // eslint-disable-next-line
      (calculations.total_payment_energy_transfer ||
        calculations.total_payment_energy_transfer === 0)
    )
      mutations.set_yearly_costs_with_photovoltaics({
        total_energy_trend_fee: calculations.total_energy_trend_fee,
        total_payment_energy_transfer:
          calculations.total_payment_energy_transfer,
      });
  }, [
    calculations.total_energy_trend_fee,
    calculations.total_payment_energy_transfer,
  ]);
  useEffect(() => {
    if (
      calculations.yearly_costs_with_photovoltaics &&
      calculations.yearly_bill_without_photovolatics
    )
      mutations.set_total_save({
        yearly_bill_without_photovolatics:
          calculations.yearly_bill_without_photovolatics,
        yearly_costs_with_photovoltaics:
          calculations.yearly_costs_with_photovoltaics,
      });
  }, [
    calculations.yearly_costs_with_photovoltaics,
    calculations.yearly_bill_without_photovolatics,
  ]);
  useEffect(() => {
    if (calculations.system_power && data) {
      mutations.set_installationAndPer1KW_price({
        system_power: calculations.system_power,
        dane: data?.kalkulator.dane,
      });
    }
  }, [data, calculations.system_power]);

  useEffect(() => {
    if (data && photovoltaic.modulesCount)
      mutations.set_ekierki_price({
        price: data.kalkulator.koszty_dodatkowe.ekierki,
        isChoosed: photovoltaic.isEccentricsChoosed,
        modules_count: photovoltaic.modulesCount,
      });
  }, [photovoltaic.modulesCount, data, photovoltaic.isEccentricsChoosed]);
  useEffect(() => {
    if (data && calculations.system_power)
      mutations.set_bloczki_price({
        price: data.kalkulator.koszty_dodatkowe.bloczki,
        isChoosed: photovoltaic.isRoofWeightSystem,
        system_power: calculations.system_power,
      });
  }, [calculations.system_power, data, photovoltaic.isRoofWeightSystem]);
  useEffect(() => {
    if (data && calculations.system_power)
      mutations.set_grunt_price({
        price: data.kalkulator.koszty_dodatkowe.grunt,
        isChoosed: photovoltaic.isGroundMontage,
        system_power: calculations.system_power,
      });
  }, [calculations.system_power, data, photovoltaic.isGroundMontage]);
  useEffect(() => {
    if (data && photovoltaic.modulesCount)
      mutations.set_solarEdge_price({
        price: data.kalkulator.koszty_dodatkowe.solarEdge,
        isChoosed: photovoltaic.isSolarEdgeChoosed,
        modules_count: photovoltaic.modulesCount,
      });
  }, [photovoltaic.modulesCount, photovoltaic.isSolarEdgeChoosed, data]);
  useEffect(() => {
    if (data)
      mutations.set_hybridInwerter_price({
        hybridInwerter_price:
          data.kalkulator.koszty_dodatkowe.inwerterHybrydowy,
        isHybridInwerterChoosed: photovoltaic.isInwerterChoosed,
      });
  }, [data, photovoltaic.isInwerterChoosed]);
  useEffect(() => {
    if (calculations.system_power && data)
      mutations.set_markup_costs({
        system_power: calculations.system_power,
        officeFee: data?.kalkulator.prowizjaBiura,
        constantFee: 0,
        consultantFee: photovoltaic.consultantMarkup,
      });
  }, [store.photovoltaic.consultantMarkup, data]);
  useEffect(() => {
    mutations.set_addon_cost({
      bloczki: calculations.bloczki_price,
      ekierki: calculations.ekierki_price,
      grunt: calculations.grunt_price,
      hybridInwerter: calculations.hybridInwerter_price,
      solarEdge: calculations.solarEdge_price,
      tigo: calculations.tigo_price,
      voucher: photovoltaic.voucher,
      markup_costs: calculations.markup_costs ?? 0,
    });
  }, [
    calculations.bloczki_price,
    calculations.ekierki_price,
    calculations.grunt_price,
    calculations.hybridInwerter_price,
    calculations.solarEdge_price,
    calculations.tigo_price,
    photovoltaic.voucher,
    calculations.markup_costs,
  ]);
  useEffect(() => {
    if (
      calculations.addon_cost &&
      calculations.installationAndPer1KW_price?.base_installation_price
    )
      mutations.set_totalInstallationCost({
        addon_costs: calculations.addon_cost,
        base_installation_costs:
          calculations.installationAndPer1KW_price.base_installation_price,
        heatStore_energyManager_costs:
          calculations.heatStore_energyManager_costs ?? 0,
      });
  }, [
    calculations.addon_cost,
    calculations.installationAndPer1KW_price?.base_installation_price,
    calculations.heatStore_energyManager_costs,
  ]);

  useEffect(() => {
    mutations.set_dotations_sum({
      energyStore_dotation: energyStore_dotation ?? 0,
      photovoltaics_dotation: photovoltaics_dotation ?? 0,
      heatStore_dotation: heatStore_dotation ?? 0,
    });
  }, [heatStore_dotation, photovoltaics_dotation, energyStore_dotation]);

  useEffect(() => {
    if (
      calculations.dotations_sum &&
      calculations.totalInstallationCost?.total_gross_cost
    )
      mutations.set_amount_after_dotation({
        gross_instalation_cost:
          calculations.totalInstallationCost?.total_gross_cost,
        summed_dotations: calculations.dotations_sum,
      });
  }, [
    calculations.dotations_sum,
    calculations.totalInstallationCost?.total_gross_cost,
  ]);
  useEffect(() => {
    mutations.set_heatStore_energyManager_costs({
      heatStore_cost: calculations.heatStore_cost ?? 0,
      isEnergyManagerSystem: photovoltaic.energyManageSystem,
    });
  }, [calculations.heatStore_cost, photovoltaic.energyManageSystem]);

  useEffect(() => {
    if (
      calculations.totalInstallationCost?.total_gross_cost &&
      calculations.dotations_sum
    )
      mutations.set_amount_tax_credit({
        amount_after_dotation:
          calculations.totalInstallationCost?.total_gross_cost -
          calculations.dotations_sum,
        tax_credit: photovoltaic.taxCredit,
      });
  }, [
    calculations.totalInstallationCost?.total_gross_cost,
    store.photovoltaic.taxCredit,
    calculations.dotations_sum,
  ]);
  useEffect(() => {
    if (calculations.amount_after_dotation)
      mutations.set_finall_installation_cost({
        amount_after_dotation: calculations.amount_after_dotation,
        amount_tax_credit: calculations.amount_tax_credit ?? 0,
      });
  }, [calculations.amount_after_dotation, calculations.amount_tax_credit]);

  return (
    <main className="flex h-full min-h-screen justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] font-orkney">
      <SideBar />
      <div className="w-full">
        <Navbar />
        {/* <button onClick={() => mutate()}>test</button> */}
        <div className="container flex flex-col  justify-center gap-12 px-4 py-16 text-white">
          <div>
            <label className="font-bold">Cena energii</label>
            <div className="my-1 flex gap-1">
              <input
                type="number"
                className="text-black"
                onKeyDown={(e) => e.key === "." && e.preventDefault()}
                onChange={mutations.handleInLimitOnChange}
                step={0.1}
                value={store.photovoltaic.energyPriceInLimit}
              />
              <p>w limicie (G2)</p>
            </div>
            <div className="my-1 flex gap-1">
              <input
                type="number"
                className="text-black"
                onKeyDown={(e) => e.key === "." && e.preventDefault()}
                onChange={mutations.handleOutOfLimitOnChange}
                step={0.1}
                value={store.photovoltaic.energyPriceOutOfLimit}
              />
              <p>poza limitem(G3)</p>
            </div>
          </div>

          <div>
            <label className="font-bold">Cena prądu w limicie kWh</label>
            <div className="flex gap-1">
              <p>{calculations.limit_price_trend}</p>
              <p>PLN/kWh</p>
              <label>Limit zużycia (E4)</label>
              <Select
                onChange={(e) => {
                  store.updatePhotovoltaic("usageLimit", Number(e));
                }}
                className="max-w-xs text-black"
                value={String(store.photovoltaic.usageLimit)}
                data={["2000", "2600", "3000"]}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <p>cena prądu po przekroczeniu 2000kWh: </p>
            <p>{calculations.outOfLimit_price_trend}</p>
            <p>PLN/kWh</p>
          </div>
          <div>
            <p>Ilość energii zużywanej średnio rocznie w kWh (C6)</p>
            <input
              type="number"
              onChange={(e) => {
                store.updatePhotovoltaic(
                  "recentYearTrendUsage",
                  e.target.valueAsNumber
                );
              }}
              value={
                store.photovoltaic.recentYearTrendUsage === 0
                  ? ""
                  : store.photovoltaic.recentYearTrendUsage
              }
              className="text-black"
            />
          </div>
          <div>
            <p>Ilość modułów (E11)</p>
            <input
              type="number"
              onChange={(e) => mutations.handleModulesInput(e)}
              value={
                store.photovoltaic.modulesCount === 0
                  ? ""
                  : store.photovoltaic.modulesCount
              }
              className="text-black"
            />
          </div>
          <div>
            <p>Stopień autokonsumpcji energii z PV (H6)</p>
            <Select
              onChange={(e) => {
                store.updatePhotovoltaic("autoconsumptionInPercent", Number(e));
              }}
              className=" max-w-xs text-black"
              value={String(store.photovoltaic.autoconsumptionInPercent)}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
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
          </div>
          <div className="flex gap-2">
            <label htmlFor="">Dach południowy (F9)</label>
            <Select
              onChange={(e) =>
                store.updatePhotovoltaic("southRoof", e == "true")
              }
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.southRoof)}
              allowDeselect
              className="max-w-xs text-black"
            />
          </div>
          <div>
            Łączna opłata za przesył energii elektrycznej{" "}
            {calculations.total_payment_energy_transfer} PLN
          </div>
          <div>
            Łączna opłata energii elektrycznej{" "}
            {calculations.total_energy_trend_fee} PLN
          </div>
          <div>
            Rachunek roczny z fotowoltaiką{" "}
            {calculations.yearly_costs_with_photovoltaics}
            PLN
          </div>
          <div className="flex gap-2">
            <p>Rachunek roczny za prąd bez fotowoltaiki</p>
            {calculations.yearly_bill_without_photovolatics}
            <p>PLN/rok</p>
          </div>
          <div className="flex gap-2">
            <p>Roczna łączna opłata energii elektrycznej </p>
            {calculations.yearly_total_fees?.yearly_total_trend_fee}
            <p>PLN/rok</p>
          </div>
          <div className="flex gap-2">
            <p>Roczna łączna opłata za przesył energii elektrycznej </p>
            {
              calculations.yearly_total_fees
                ?.yearly_total_fee_for_energy_transfer
            }
          </div>
          <div className="flex gap-2 ">
            <p>ŁĄCZNIE OSZCZĘDZASZ </p>
            {calculations.total_save}
            <p>PLN/rok</p>
          </div>
          <div>
            <label>Montaż na wielu powierzchniach dachu z Solar Edge</label>
            <Select
              onChange={(e) =>
                store.updatePhotovoltaic("isSolarEdgeChoosed", e == "true")
              }
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.isSolarEdgeChoosed)}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Montaż dach płaski - Ekierki ( kąt dachu poniżej 20º)</label>
            <Select
              onChange={(e) =>
                store.updatePhotovoltaic("isEccentricsChoosed", e == "true")
              }
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.isEccentricsChoosed)}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>
              System dachowy obciążeniowy, balastowy. (tylko na membramie, każdy
              inny kotwiony do dachu)
            </label>
            <Select
              onChange={(e) =>
                store.updatePhotovoltaic("isRoofWeightSystem", e == "true")
              }
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.isRoofWeightSystem)}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>
              Montaż NA GRUNCIE (konstrukcja wbijana lub wylane stopy betonowe)
            </label>
            <Select
              onChange={(e) =>
                store.updatePhotovoltaic("isGroundMontage", e == "true")
              }
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.isGroundMontage)}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>
              Zainstalowanie optymalizatorów TIGO do zacienionych modułów
              (Wybierz 1 + ilość opymaliz.)
            </label>
            <input
              className="text-black"
              type="number"
              onChange={(e) => {
                store.updatePhotovoltaic("tigoCount", e.target.valueAsNumber);
                mutations.handleTigoinput(e);
              }}
              value={
                store.photovoltaic.tigoCount == 0
                  ? ""
                  : store.photovoltaic.tigoCount
              }
            />
          </div>
          <div>
            <label>Montaż , dowóz , uruchomienie ( narzut doradcy )</label>
            <Select
              onChange={(e) => {
                store.updatePhotovoltaic("consultantMarkup", Number(e));
              }}
              className=" max-w-xs text-black"
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.consultantMarkup)}
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
          </div>
          <div>
            <label>Inwerter hybrydowy</label>
            <Select
              onChange={(e) =>
                store.updatePhotovoltaic("isInwerterChoosed", e == "true")
              }
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.isInwerterChoosed)}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Voucher Holiday</label>
            <Select
              onChange={(e) => store.updatePhotovoltaic("voucher", e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.voucher)}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Magazyn ciepła + EMS</label>
            <Select
              onChange={(e) =>
                store.updatePhotovoltaic("energyManageSystem", e == "true")
              }
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.energyManageSystem)}
              className="max-w-xs text-black"
            />
          </div>
          {store.photovoltaic.energyManageSystem && (
            <div>
              <label>Wielkość zbiornika CWU</label>
              <Select
                onChange={(e: string) => {
                  store.updatePhotovoltaic("tankSize", e);
                  mutations.set_heatStore_cost({ choosed_tank_type: e });
                }}
                value={String(store.photovoltaic.tankSize)}
                data={[
                  { value: "Zbiornik 100L", label: "Zbiornik 100L" },
                  { value: "Zbiornik 140L", label: "Zbiornik 140L" },
                  { value: "Zbiornik 200L", label: "Zbiornik 200L" },
                  {
                    value: "Zbiornik 200L z wężownicą",
                    label: "Zbiornik 200L z wężownicą",
                  },
                ]}
                icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
                className="max-w-xs text-black"
              />
            </div>
          )}
          <div>
            <p>Mój prąd fotowoltaika</p>
            {photovoltaics_dotation}
            PLN
          </div>
          <div>
            <p>Manager energii</p>
            {energyStore_dotation}
            PLN
          </div>
          <div>
            <p>Magazyn ciepła</p>
            {heatStore_dotation}
            PLN
          </div>
          <div>
            <label>Ulga podatkowa</label>
            <Select
              onChange={(e) => store.updatePhotovoltaic("taxCredit", Number(e))}
              data={[
                { value: "0", label: "0%" },
                { value: "0.12", label: "12%" },
                { value: "0.32", label: "32%" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              value={String(store.photovoltaic.taxCredit)}
              className="max-w-xs text-black"
            />
          </div>

          <div>
            <p>
              Cena za 1KW:{" "}
              {calculations.installationAndPer1KW_price?.price_per_1KW} PLN
            </p>
          </div>
          <div>
            <p>
              WYLICZONA CENA ZA INSTALACJĘ BAZA:
              {
                calculations.installationAndPer1KW_price
                  ?.base_installation_price
              }{" "}
              PLN
            </p>
          </div>
          <div>
            <p>
              Cena łącznie:{" "}
              {calculations.totalInstallationCost?.total_installation_cost} PLN
            </p>
            <p>
              Cena łącznie brutto:{" "}
              {calculations.totalInstallationCost?.total_gross_cost} PLN
            </p>
          </div>
          <div>
            <p>
              Ulga podatkowa:
              {calculations.amount_tax_credit} PLN
            </p>
          </div>
          <div>
            <p>
              Kwota po odjęciu ulg:
              {calculations.finall_installation_cost}
              PLN
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
