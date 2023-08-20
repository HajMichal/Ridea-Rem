import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useRouter } from "next/router";
import { SideBar } from "~/components/SideBar";
import { Select } from "@mantine/core";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";

import useStore from "~/store";

interface JsonFileData {
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

    const {data, mutate: updateFotowoltaika} = useMutate();

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

// type State = {
//   southRoof: number;
// };

// type Actions = {
//   setSouthRoof: (southRoof: boolean) => void;
// };

// type Formula = { southRoof: number; voucherHoliday: boolean };

// function updateFotowoltaika(key: keyof Formula, value: Formula[keyof Formula]);

/*
const fotowoltaikaSlice = {
  fotowoltaika: {
    southRoof: false,
    ..
  },
  updateFotowolatika: (
    key: keyof Formula,
    value: Formula[keyof Formula]
  ) => set((state) => ({...state, fotowoltaika: {...state.fotowoltaika, [key]: value}}))
}

store.updateFotowoltaika("southRoof", true);

return <div>{store.fotowoltaika.southRoof}</div>
*/

const Fotowoltaika = () => {
  const store = useStore();

  const { data: sessionData } = useSession();
  const router = useRouter();

  // const { mutate } = api.dataFlow.setJSONFile.useMutation();
  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();
  console.log(data);

  const { mutate: set_limit_price_trend, data: limit_price_trend } =
    api.photovoltaics.price_trend.useMutation(); // D3
  const { mutate: set_outOfLimit_price_trend, data: outOfLimit_price_trend } =
    api.photovoltaics.price_trend.useMutation(); // D4
  const { mutate: set_system_power, data: system_power } =
    api.photovoltaics.system_power.useMutation(); // D17
  const { mutate: set_estimated_kWh_prod, data: estimated_kWh_prod } =
    api.photovoltaics.estimated_kWh_production.useMutation(); // D18
  const { mutate: set_autoconsumption, data: autoconsumption } =
    api.photovoltaics.autoconsumption.useMutation(); // D20
  const {
    mutate: set_total_payment_energy_transfer,
    data: total_payment_energy_transfer, // D13
  } = api.photovoltaics.total_payment_energy_transfer.useMutation();
  const {
    mutate: set_energy_sold_to_distributor,
    data: energy_sold_to_distributor, // D21
  } = api.photovoltaics.energy_sold_to_distributor.useMutation();
  const {
    mutate: set_accumulated_funds_on_account,
    data: accumulated_funds_on_account, // D23
  } = api.photovoltaics.accumulated_funds_on_account.useMutation();
  const {
    mutate: set_total_energy_trend_fee,
    data: total_energy_trend_fee, // D23
  } = api.photovoltaics.total_energy_trend_fee.useMutation();
  const {
    mutate: set_yearly_bill_without_photovolatics,
    data: yearly_bill_without_photovolatics,
  } = api.photovoltaics.yearly_bill_without_photovolatics.useMutation();
  const { mutate: set_yearly_total_fees, data: yearly_total_fees } =
    api.photovoltaics.yearly_total_fees.useMutation();
  const {
    mutate: set_yearly_costs_with_photovoltaics,
    data: yearly_costs_with_photovoltaics,
  } = api.photovoltaics.yearly_costs_with_photovoltaics.useMutation();
  const { mutate: set_total_save, data: total_save } =
    api.photovoltaics.total_save.useMutation();
  const {
    mutate: set_installationAndPer1KW_price,
    data: installationAndPer1KW_price,
  } = api.photovoltaics.price_for_1_KW.useMutation();
  const { mutate: set_tigo_price, data: tigo_price } =
    api.photovoltaics.addon_tigo.useMutation();
  const { mutate: set_ekierki_price, data: ekierki_price } =
    api.photovoltaics.addon_ekierki.useMutation();
  const { mutate: set_bloczki_price, data: bloczki_price } =
    api.photovoltaics.addon_bloczki.useMutation();
  const { mutate: set_grunt_price, data: grunt_price } =
    api.photovoltaics.addon_grunt.useMutation();
  const { mutate: set_hybridInwerter_price, data: hybridInwerter_price } =
    api.photovoltaics.addon_hybridInwerter.useMutation();
  const { mutate: set_solarEdge_price, data: solarEdge_price } =
    api.photovoltaics.addon_solarEdge.useMutation();
  const { mutate: set_addon_cost, data: addon_cost } =
    api.photovoltaics.addon_cost.useMutation();
  const { mutate: set_markup_costs, data: markup_costs } =
    api.photovoltaics.officeMarkup.useMutation();
  const { mutate: set_totalInstallationCost, data: totalInstallationCost } =
    api.photovoltaics.totalInstallation_cost.useMutation();
  const { mutate: set_dotations_sum, data: dotations_sum } =
    api.photovoltaics.dotations_sum.useMutation();
  const { mutate: set_amount_after_dotation, data: amount_after_dotation } =
    api.photovoltaics.amount_after_dotation.useMutation();
  const { mutate: set_amount_tax_credit, data: amount_tax_credit } =
    api.photovoltaics.amount_tax_credit.useMutation();
  const { mutate: set_heatStore_cost, data: heatStore_cost } =
    api.photovoltaics.heatStore_cost.useMutation();
  const {
    mutate: set_finall_installation_cost,
    data: finall_installation_cost,
  } = api.photovoltaics.finall_installation_cost.useMutation();
  const {
    mutate: set_heatStore_energyManager_costs,
    data: heatStore_energyManager_costs,
  } = api.photovoltaics.heatStore_energyManager_costs.useMutation();

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
    if (system_power) {
      set_estimated_kWh_prod({
        southRoof: store.photovoltaic.southRoof,
        system_power: system_power,
      });
    }
  }, [system_power, store.photovoltaic.southRoof, set_estimated_kWh_prod]);
  useEffect(() => {
    if (estimated_kWh_prod)
      set_autoconsumption({
        autoconsumption_step: store.photovoltaic.autoconsumptionInPercent,
        estimated_kWh_prod: estimated_kWh_prod,
      });
  }, [
    store.photovoltaic.autoconsumptionInPercent,
    estimated_kWh_prod,
    set_estimated_kWh_prod,
    set_autoconsumption,
  ]);
  useEffect(() => {
    if (
      autoconsumption &&
      store.photovoltaic.energyPriceInLimit &&
      store.photovoltaic.energyPriceOutOfLimit &&
      store.photovoltaic.recentYearTrendUsage
    )
      set_total_payment_energy_transfer({
        autoconsumption: autoconsumption,
        priceInLimit: store.photovoltaic.energyPriceInLimit,
        priceOutOfLimit: store.photovoltaic.energyPriceOutOfLimit,
        recentYearTrendUsage: store.photovoltaic.recentYearTrendUsage,
        usageLimit: store.photovoltaic.usageLimit,
      });
  }, [
    autoconsumption,
    store.photovoltaic.energyPriceInLimit,
    store.photovoltaic.usageLimit,
    store.photovoltaic.energyPriceOutOfLimit,
    store.photovoltaic.recentYearTrendUsage,
    set_autoconsumption,
    set_total_payment_energy_transfer,
  ]);
  useEffect(() => {
    if (autoconsumption && estimated_kWh_prod)
      set_energy_sold_to_distributor({
        autoconsumption: autoconsumption,
        estimated_kWh_prod: estimated_kWh_prod,
      });
  }, [
    autoconsumption,
    estimated_kWh_prod,
    set_energy_sold_to_distributor,
    set_autoconsumption,
  ]);
  useEffect(() => {
    if (energy_sold_to_distributor)
      set_accumulated_funds_on_account(energy_sold_to_distributor);
  }, [energy_sold_to_distributor, set_accumulated_funds_on_account]);
  useEffect(() => {
    if (
      accumulated_funds_on_account &&
      autoconsumption &&
      store.photovoltaic.energyPriceInLimit &&
      store.photovoltaic.energyPriceOutOfLimit &&
      store.photovoltaic.recentYearTrendUsage
    ) {
      set_total_energy_trend_fee({
        accumulated_funds_on_account: accumulated_funds_on_account,
        autoconsumption: autoconsumption,
        priceInLimit: store.photovoltaic.energyPriceInLimit,
        priceOutOfLimit: store.photovoltaic.energyPriceOutOfLimit,
        usageLimit: store.photovoltaic.usageLimit,
        recentYearTrendUsage: store.photovoltaic.recentYearTrendUsage,
      });
    }
  }, [
    accumulated_funds_on_account,
    autoconsumption,
    store.photovoltaic.energyPriceInLimit,
    store.photovoltaic.energyPriceOutOfLimit,
    store.photovoltaic.usageLimit,
    store.photovoltaic.recentYearTrendUsage,
    set_total_energy_trend_fee,
  ]);
  useEffect(() => {
    if (
      limit_price_trend &&
      outOfLimit_price_trend &&
      store.photovoltaic.recentYearTrendUsage
    )
      set_yearly_bill_without_photovolatics({
        limit_price_trend: limit_price_trend,
        outOfLimit_price_trend: outOfLimit_price_trend,
        recentYearTrendUsage: store.photovoltaic.recentYearTrendUsage,
        usageLimit: store.photovoltaic.usageLimit,
      });
  }, [
    store.photovoltaic.usageLimit,
    store.photovoltaic.recentYearTrendUsage,
    outOfLimit_price_trend,
    limit_price_trend,
    set_yearly_bill_without_photovolatics,
  ]);
  useEffect(() => {
    if (
      store.photovoltaic.energyPriceInLimit &&
      store.photovoltaic.energyPriceOutOfLimit &&
      store.photovoltaic.recentYearTrendUsage
    )
      set_yearly_total_fees({
        energyPriceInLimit: store.photovoltaic.energyPriceInLimit,
        energyPriceOutOfLimit: store.photovoltaic.energyPriceOutOfLimit,
        recentYearTrendUsage: store.photovoltaic.recentYearTrendUsage,
        usageLimit: store.photovoltaic.usageLimit,
      });
  }, [
    store.photovoltaic.usageLimit,
    store.photovoltaic.recentYearTrendUsage,
    store.photovoltaic.energyPriceInLimit,
    store.photovoltaic.energyPriceOutOfLimit,
    set_yearly_total_fees,
  ]);
  useEffect(() => {
    if (
      // eslint-disable-next-line
      (total_energy_trend_fee || total_energy_trend_fee === 0) &&
      // eslint-disable-next-line
      (total_payment_energy_transfer || total_payment_energy_transfer === 0)
    )
      set_yearly_costs_with_photovoltaics({
        total_energy_trend_fee: total_energy_trend_fee,
        total_payment_energy_transfer: total_payment_energy_transfer,
      });
  }, [
    total_energy_trend_fee,
    total_payment_energy_transfer,
    set_yearly_costs_with_photovoltaics,
  ]);
  useEffect(() => {
    if (yearly_costs_with_photovoltaics && yearly_bill_without_photovolatics)
      set_total_save({
        yearly_bill_without_photovolatics: yearly_bill_without_photovolatics,
        yearly_costs_with_photovoltaics: yearly_costs_with_photovoltaics,
      });
  }, [
    yearly_costs_with_photovoltaics,
    yearly_bill_without_photovolatics,
    set_total_save,
  ]);
  useEffect(() => {
    if (system_power && data) {
      set_installationAndPer1KW_price({
        system_power: system_power,
        dane: data?.kalkulator.dane,
      });
    }
  }, [data, system_power, set_installationAndPer1KW_price]);

  useEffect(() => {
    if (data && store.photovoltaic.modulesCount)
      set_ekierki_price({
        price: data.kalkulator.koszty_dodatkowe.ekierki,
        isChoosed: store.photovoltaic.isEccentricsChoosed,
        modules_count: store.photovoltaic.modulesCount,
      });
  }, [
    store.photovoltaic.modulesCount,
    data,
    store.photovoltaic.isEccentricsChoosed,
    set_ekierki_price,
  ]);
  useEffect(() => {
    if (data && system_power)
      set_bloczki_price({
        price: data.kalkulator.koszty_dodatkowe.bloczki,
        isChoosed: store.photovoltaic.isRoofWeightSystem,
        system_power: system_power,
      });
  }, [
    system_power,
    data,
    store.photovoltaic.isRoofWeightSystem,
    set_bloczki_price,
  ]);
  useEffect(() => {
    if (data && system_power)
      set_grunt_price({
        price: data.kalkulator.koszty_dodatkowe.grunt,
        isChoosed: store.photovoltaic.isGroundMontage,
        system_power: system_power,
      });
  }, [system_power, data, store.photovoltaic.isGroundMontage, set_grunt_price]);
  useEffect(() => {
    if (data && store.photovoltaic.modulesCount)
      set_solarEdge_price({
        price: data.kalkulator.koszty_dodatkowe.solarEdge,
        isChoosed: store.photovoltaic.isSolarEdgeChoosed,
        modules_count: store.photovoltaic.modulesCount,
      });
  }, [
    store.photovoltaic.modulesCount,
    data,
    store.photovoltaic.isSolarEdgeChoosed,
    set_solarEdge_price,
  ]);
  useEffect(() => {
    if (data)
      set_hybridInwerter_price({
        hybridInwerter_price:
          data.kalkulator.koszty_dodatkowe.inwerterHybrydowy,
        isHybridInwerterChoosed: store.photovoltaic.isInwerterChoosed,
      });
  }, [data, store.photovoltaic.isInwerterChoosed, set_hybridInwerter_price]);
  useEffect(() => {
    if (system_power && data)
      set_markup_costs({
        system_power: system_power,
        officeFee: data?.kalkulator.prowizjaBiura,
        constantFee: 0,
        consultantFee: store.photovoltaic.consultantMarkup,
      });
  }, [
    store.photovoltaic.consultantMarkup,
    system_power,
    data,
    set_markup_costs,
  ]);
  useEffect(() => {
    set_addon_cost({
      bloczki: bloczki_price,
      ekierki: ekierki_price,
      grunt: grunt_price,
      hybridInwerter: hybridInwerter_price,
      solarEdge: solarEdge_price,
      tigo: tigo_price,
      voucher: store.photovoltaic.voucher,
      markup_costs: markup_costs ?? 0,
    });
  }, [
    bloczki_price,
    ekierki_price,
    grunt_price,
    hybridInwerter_price,
    solarEdge_price,
    tigo_price,
    store.photovoltaic.voucher,
    markup_costs,
    set_addon_cost,
  ]);
  useEffect(() => {
    if (addon_cost && installationAndPer1KW_price?.base_installation_price)
      set_totalInstallationCost({
        addon_costs: addon_cost,
        base_installation_costs:
          installationAndPer1KW_price.base_installation_price,
        heatStore_energyManager_costs: heatStore_energyManager_costs ?? 0,
      });
  }, [
    addon_cost,
    installationAndPer1KW_price?.base_installation_price,
    heatStore_energyManager_costs,
    set_totalInstallationCost,
  ]);

  useEffect(() => {
    set_dotations_sum({
      energyStore_dotation: energyStore_dotation ?? 0,
      photovoltaics_dotation: photovoltaics_dotation ?? 0,
      heatStore_dotation: heatStore_dotation ?? 0,
    });
  }, [
    heatStore_dotation,
    photovoltaics_dotation,
    energyStore_dotation,
    set_dotations_sum,
  ]);

  useEffect(() => {
    if (dotations_sum && totalInstallationCost?.total_gross_cost)
      set_amount_after_dotation({
        gross_instalation_cost: totalInstallationCost?.total_gross_cost,
        summed_dotations: dotations_sum,
      });
  }, [
    dotations_sum,
    totalInstallationCost?.total_gross_cost,
    set_amount_after_dotation,
  ]);
  useEffect(() => {
    set_heatStore_energyManager_costs({
      heatStore_cost: heatStore_cost ?? 0,
      isEnergyManagerSystem: store.photovoltaic.energyManageSystem,
    });
  }, [
    heatStore_cost,
    store.photovoltaic.energyManageSystem,
    set_heatStore_energyManager_costs,
  ]);

  useEffect(() => {
    if (totalInstallationCost?.total_gross_cost && dotations_sum)
      set_amount_tax_credit({
        amount_after_dotation:
          totalInstallationCost?.total_gross_cost - dotations_sum,
        tax_credit: store.photovoltaic.taxCredit,
      });
  }, [
    totalInstallationCost?.total_gross_cost,
    store.photovoltaic.taxCredit,
    dotations_sum,
    set_amount_tax_credit,
  ]);
  useEffect(() => {
    if (amount_after_dotation)
      set_finall_installation_cost({
        amount_after_dotation: amount_after_dotation,
        amount_tax_credit: amount_tax_credit ?? 0,
      });
  }, [amount_after_dotation, amount_tax_credit, set_finall_installation_cost]);

  const inLimitOnChange = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      set_limit_price_trend(e.target.valueAsNumber);
      store.updatePhotovoltaic("energyPriceInLimit", e.target.valueAsNumber);
    },
    [set_limit_price_trend]
  );
  const outOfLimitOnChange = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      set_outOfLimit_price_trend(e.target.valueAsNumber);
      store.updatePhotovoltaic("energyPriceOutOfLimit", e.target.valueAsNumber);
    },
    [set_outOfLimit_price_trend]
  );
  const handleTigoinput = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      if (data)
        set_tigo_price({
          tigo_price: data.kalkulator.koszty_dodatkowe.tigo,
          tigo_count: e.target.valueAsNumber,
        });
    },
    [data, set_tigo_price]
  );
  const handleModulesInput = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      set_system_power(e.target.valueAsNumber);
      store.updatePhotovoltaic("modulesCount", e.target.valueAsNumber);
    },
    [set_system_power, store.photovoltaic.modulesCount]
  );

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
                onChange={inLimitOnChange}
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
                onChange={outOfLimitOnChange}
                step={0.1}
                value={store.photovoltaic.energyPriceOutOfLimit}
              />
              <p>poza limitem(G3)</p>
            </div>
          </div>

          <div>
            <label className="font-bold">Cena prądu w limicie kWh</label>
            <div className="flex gap-1">
              <p>{limit_price_trend}</p>
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
            <p>{outOfLimit_price_trend}</p>
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
              onChange={(e) => handleModulesInput(e)}
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
            {total_payment_energy_transfer} PLN
          </div>
          <div>
            Łączna opłata energii elektrycznej {total_energy_trend_fee} PLN
          </div>
          <div>
            Rachunek roczny z fotowoltaiką {yearly_costs_with_photovoltaics}
            PLN
          </div>
          <div className="flex gap-2">
            <p>Rachunek roczny za prąd bez fotowoltaiki</p>
            {yearly_bill_without_photovolatics}
            <p>PLN/rok</p>
          </div>
          <div className="flex gap-2">
            <p>Roczna łączna opłata energii elektrycznej </p>
            {yearly_total_fees?.yearly_total_trend_fee}
            <p>PLN/rok</p>
          </div>
          <div className="flex gap-2">
            <p>Roczna łączna opłata za przesył energii elektrycznej </p>
            {yearly_total_fees?.yearly_total_fee_for_energy_transfer}
          </div>
          <div className="flex gap-2 ">
            <p>ŁĄCZNIE OSZCZĘDZASZ </p>
            {total_save}
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
                handleTigoinput(e);
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
                  set_heatStore_cost({ choosed_tank_type: e });
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
            <p>Cena za 1KW: {installationAndPer1KW_price?.price_per_1KW} PLN</p>
          </div>
          <div>
            <p>
              WYLICZONA CENA ZA INSTALACJĘ BAZA:
              {installationAndPer1KW_price?.base_installation_price} PLN
            </p>
          </div>
          <div>
            <p>
              Cena łącznie: {totalInstallationCost?.total_installation_cost} PLN
            </p>
            <p>
              Cena łącznie brutto: {totalInstallationCost?.total_gross_cost} PLN
            </p>
          </div>
          <div>
            <p>
              Ulga podatkowa:
              {amount_tax_credit} PLN
            </p>
          </div>
          <div>
            <p>
              Kwota po odjęciu ulg:
              {finall_installation_cost}
              PLN
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
