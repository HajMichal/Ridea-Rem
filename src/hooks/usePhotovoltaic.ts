import useStore from "~/store";
import { api } from "~/utils/api";
import { type JsonFileData } from "~/pages/kalkulator/fotowoltaika";

export const usePhotovoltaic = () => {
  const store = useStore();
  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();

  const {
    mutate: set_limit_price_trend,
    isLoading: limit_price_trend_loading,
  } = api.photovoltaics.price_trend.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("limit_price_trend", data);
    },
  }); // D3
  const {
    mutate: set_outOfLimit_price_trend,
    isLoading: outOfLimit_price_trend_loading,
  } = api.photovoltaics.price_trend.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("outOfLimit_price_trend", data);
    },
  }); // D4
  const { mutate: set_system_power } =
    api.photovoltaics.system_power.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("system_power", data);
      },
    }); // D17
  const {
    mutate: set_estimated_kWh_prod,
  } = // D18
    api.photovoltaics.estimated_kWh_production.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("estimated_kWh_prod", data);
      },
    });
  const { mutate: set_autoconsumption } =
    api.photovoltaics.autoconsumption.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("autoconsumption", data);
      },
    }); // D20
  const {
    mutate: set_total_payment_energy_transfer, // D13
  } = api.photovoltaics.total_payment_energy_transfer.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("total_payment_energy_transfer", data);
    },
  });
  const {
    mutate: set_energy_sold_to_distributor, // D21
  } = api.photovoltaics.energy_sold_to_distributor.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("energy_sold_to_distributor", data);
    },
  });
  const { mutate: set_accumulated_funds_on_account } =
    api.photovoltaics.accumulated_funds_on_account.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("accumulated_funds_on_account", data);
      },
    });
  const { mutate: set_total_energy_trend_fee } =
    api.photovoltaics.total_energy_trend_fee.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("total_energy_trend_fee", data);
      },
    });
  const {
    mutate: set_yearly_bill_without_photovolatics,
    isLoading: yearly_bill_without_photovolatics_loading,
  } = api.photovoltaics.yearly_bill_without_photovolatics.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("yearly_bill_without_photovolatics", data);
    },
  });
  const {
    mutate: set_yearly_total_fees,
    isLoading: yearly_total_fees_loading,
  } = api.photovoltaics.yearly_total_fees.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("yearly_total_fees", data);
    },
  });
  const {
    mutate: set_yearly_costs_with_photovoltaics,
    isLoading: yearly_costs_with_photovoltaics_loading,
  } = api.photovoltaics.yearly_costs_with_photovoltaics.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("yearly_costs_with_photovoltaics", data);
    },
  });
  const { mutate: set_total_save } = api.photovoltaics.total_save.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("total_save", data);
    },
  });
  const { mutate: set_installationAndPer1KW_price } =
    api.photovoltaics.price_for_1_KW.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("installationAndPer1KW_price", data);
      },
    });
  const { mutate: set_tigo_price } = api.photovoltaics.addon_tigo.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("tigo_price", data);
    },
  });
  const { mutate: set_ekierki_price } =
    api.photovoltaics.addon_ekierki.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("ekierki_price", data);
      },
    });
  const { mutate: set_bloczki_price } =
    api.photovoltaics.addon_bloczki.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("bloczki_price", data);
      },
    });
  const { mutate: set_grunt_price } = api.photovoltaics.addon_grunt.useMutation(
    {
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("grunt_price", data);
      },
    }
  );
  const { mutate: set_hybridInwerter_price } =
    api.photovoltaics.addon_hybridInwerter.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("hybridInwerter_price", data);
      },
    });
  const { mutate: set_solarEdge_price } =
    api.photovoltaics.addon_solarEdge.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("solarEdge_price", data);
      },
    });
  const { mutate: set_addon_cost } = api.photovoltaics.addon_cost.useMutation({
    onSuccess: (data) => {
      store.updatePhotovoltaicCalcs("addon_cost", data);
    },
  });
  const { mutate: set_markup_costs } =
    api.photovoltaics.officeMarkup.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("markup_costs", data);
      },
    });
  const { mutate: set_totalInstallationCost } =
    api.photovoltaics.totalInstallation_cost.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("totalInstallationCosts", data);
      },
    });
  const { mutate: set_dotations_sum } =
    api.photovoltaics.dotations_sum.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("dotations_sum", data);
      },
    });
  const { mutate: set_amount_after_dotation } =
    api.photovoltaics.amount_after_dotation.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("amount_after_dotation", data);
      },
    });
  const { mutate: set_amount_tax_credit } =
    api.photovoltaics.amount_tax_credit.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("amount_tax_credit", data);
      },
    });
  const { mutate: set_heatStore_cost } =
    api.photovoltaics.heatStore_cost.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("heatStore_cost", data);
      },
    });
  const { mutate: set_finall_installation_cost } =
    api.photovoltaics.finall_installation_cost.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("finall_installation_cost", data);
      },
    });
  const { mutate: set_heatStore_energyManager_costs } =
    api.photovoltaics.heatStore_energyManager_costs.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("heatStore_energyManager_costs", data);
      },
    });
  const { mutate: set_estiamted_price_for_trend_in_1KWH } =
    api.photovoltaics.estiamted_price_for_trend_in_1KWH.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs(
          "estiamted_price_for_trend_in_1KWH",
          data
        );
      },
    });
  const { mutate: set_save_on_autoconsumption } =
    api.photovoltaics.save_on_autoconsumption.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("save_on_autoconsumption", data);
      },
    });
  const { mutate: set_yearly_profit_for_installation } =
    api.photovoltaics.yearly_profit_for_installation.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("yearly_profit_for_installation", data);
      },
    });

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
    photovoltaicStore: store.photovoltaicStore,
    photovoltaicCalcStore: store.photovoltaicCalculations,
    loading: {
      limit_price_trend_loading,
      outOfLimit_price_trend_loading,
      yearly_bill_without_photovolatics_loading,
      yearly_total_fees_loading,
      yearly_costs_with_photovoltaics_loading,
    },
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
      set_estiamted_price_for_trend_in_1KWH,
      set_save_on_autoconsumption,
      set_yearly_profit_for_installation,
    },
  };
};
