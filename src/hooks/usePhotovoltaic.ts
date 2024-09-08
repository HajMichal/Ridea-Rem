import { useEffect } from "react";
import {
  smallestPanel,
  mediumPanel,
  largestPanel,
} from "~/constans/panelPowers";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

export const usePhotovoltaic = () => {
  const store = useStore();

  const { data } =
    api.dataFlow.downloadFile.useQuery<PhotovoltaicDataToCalculation | null>();

  useEffect(() => {
    sessionStorage.setItem(
      "creditPercentage",
      JSON.stringify(data?.creditPercentage)
    );
  }, [data?.creditPercentage]);

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
  const { mutate: setEccentricsPrice } =
    api.photovoltaics.addonEccentrics.useMutation({
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
  const { mutate: set_energyManagerCost } =
    api.photovoltaics.energyManagerCost.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("energyManagerCost", data);
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

  const { mutate: set_payment_return_time } =
    api.photovoltaics.payment_return_time.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("payment_return_time", data);
      },
    });

  const { mutate: set_termo_modernization } =
    api.photovoltaics.termoModernization.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("termoModernization", data);
      },
    });
  const { mutate: set_loan_for_purcharse } =
    api.photovoltaics.loanForPurcharse.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("loanForPurcharse", data);
      },
    });
  const { mutate: set_energyMenagerDotationValue } =
    api.photovoltaics.energyMenagerDotation.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("energyMenagerDotationValue", data);
      },
    });

  const { mutate: set_energyStoreDotationValue } =
    api.photovoltaics.energyStoreDotationValue.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("energyStoreDotationValue", data);
      },
    });
  const { mutate: setPhotovoltaicDotation_mojprad } =
    api.photovoltaics.dotation_mojprad.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("photovoltaicDotation_mojprad", data);
      },
    });
  const { mutate: setPhotovoltaicDotation_czpowietrze } =
    api.photovoltaics.dotation_czpowietrze.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("photovoltaicDotation_czpowietrze", data);
      },
    });
  // PROMOCJA
  const { mutate: setPromotionTotalInstallationCosts } =
    api.photovoltaics.promotionTotalInstallationCosts.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("promotionTotalInstallationCosts", data);
      },
    });

  const handleInLimitOnChange = (e: { target: { valueAsNumber: number } }) => {
    if (e.target.valueAsNumber) {
      set_limit_price_trend(e.target.valueAsNumber);
    }
    store.updatePhotovoltaic("energyPriceInLimit", e.target.valueAsNumber);
  };

  const handleTigoinput = (e: { target: { valueAsNumber: number } }) => {
    if (data)
      set_tigo_price({
        tigo_price: data?.addons.tigo,
        tigo_count: e.target.valueAsNumber,
      });
  };

  const getDataDependsOnPanelPower = () => {
    if (store.photovoltaicStore.panelPower === smallestPanel)
      return data?.panels_small;
    else if (store.photovoltaicStore.panelPower === mediumPanel)
      return data?.panels_medium;
    else if (store.photovoltaicStore.panelPower === largestPanel)
      return data?.panels_large;
  };

  return {
    photovoltaicData: data,
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
      getDataDependsOnPanelPower,
      handleTigoinput,
      handleInLimitOnChange,
      set_outOfLimit_price_trend,
      set_system_power,
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
      setEccentricsPrice,
      set_bloczki_price,
      set_grunt_price,
      set_amount_after_dotation,
      set_addon_cost,
      set_markup_costs,
      set_totalInstallationCost,
      set_dotations_sum,
      set_energyStoreDotationValue,
      set_finall_installation_cost,
      set_heatStore_energyManager_costs,
      set_estiamted_price_for_trend_in_1KWH,
      set_save_on_autoconsumption,
      set_yearly_profit_for_installation,
      set_payment_return_time,
      set_termo_modernization,
      set_loan_for_purcharse,
      set_energyManagerCost,
      set_energyMenagerDotationValue,
      setPromotionTotalInstallationCosts,
      setPhotovoltaicDotation_mojprad,
      setPhotovoltaicDotation_czpowietrze,
    },
  };
};
