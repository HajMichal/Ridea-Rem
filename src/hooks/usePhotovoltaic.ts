import useStore from "~/store";
import { api } from "~/utils/api";
import { type JsonFileData } from "~/pages/kalkulator/fotowoltaika";

export const usePhotovoltaic = () => {
  const store = useStore();
  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();

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

  const handleInLimitOnChange = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      set_limit_price_trend(e.target.valueAsNumber);
    }
    store.updatePhotovoltaic("energyPriceInLimit", e.target.valueAsNumber);
  };

  const handleOutOfLimitOnChange = (e: {
    target: { valueAsNumber: number };
  }) => {
    if (e.target.valueAsNumber) {
      set_outOfLimit_price_trend(e.target.valueAsNumber);
    }
    store.updatePhotovoltaic("energyPriceOutOfLimit", e.target.valueAsNumber);
  };

  const handleTigoinput = (e: { target: { valueAsNumber: number } }) => {
    if (data)
      set_tigo_price({
        tigo_price: data.kalkulator.koszty_dodatkowe.tigo,
        tigo_count: e.target.valueAsNumber,
      });
  };

  const handleModulesInput = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      set_system_power(e.target.valueAsNumber);
    }
    store.updatePhotovoltaic("modulesCount", e.target.valueAsNumber);
  };
  return {
    photovoltaic: store.photovoltaic,
    mutations: {
      handleModulesInput,
      handleTigoinput,
      handleOutOfLimitOnChange,
      handleInLimitOnChange,
      set_estimated_kWh_prod,
      set_total_payment_energy_transfer,
      set_energy_sold_to_distributor,
      set_autoconsumption,
      set_accumulated_funds_on_account,
      set_total_energy_trend_fee,
      set_yearly_bill_without_photovolatics,
      set_yearly_total_fees,
      set_yearly_costs_with_photovoltaics,
      set_total_save,
      set_installationAndPer1KW_price,
      set_ekierki_price,
      set_bloczki_price,
      set_grunt_price,
      set_amount_after_dotation,
      set_hybridInwerter_price,
      set_solarEdge_price,
      set_addon_cost,
      set_markup_costs,
      set_totalInstallationCost,
      set_dotations_sum,
      set_amount_tax_credit,
      set_heatStore_cost,
      set_finall_installation_cost,
      set_heatStore_energyManager_costs,
    },
    calculations: {
      limit_price_trend,
      outOfLimit_price_trend,
      system_power,
      estimated_kWh_prod,
      autoconsumption,
      total_payment_energy_transfer,
      energy_sold_to_distributor,
      accumulated_funds_on_account,
      total_energy_trend_fee,
      yearly_bill_without_photovolatics,
      yearly_costs_with_photovoltaics,
      total_save,
      installationAndPer1KW_price,
      tigo_price,
      ekierki_price,
      bloczki_price,
      yearly_total_fees,
      grunt_price,
      hybridInwerter_price,
      solarEdge_price,
      addon_cost,
      markup_costs,
      totalInstallationCost,
      dotations_sum,
      amount_after_dotation,
      amount_tax_credit,
      heatStore_cost,
      finall_installation_cost,
      heatStore_energyManager_costs,
    },
  };
};
