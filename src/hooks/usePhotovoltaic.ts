import useStore from "~/store";
import { api } from "~/utils/api";

export const usePhotovoltaic = () => {
  const store = useStore();

  const { mutate: set_system_power } =
    api.photovoltaics.system_power.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("system_power", data);
      },
    });
  const { mutate: set_estimated_kWh_prod } =
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
    });
  const { mutate: setAutoconsumptionProfit } =
    api.photovoltaics.autoconsumptionProfit.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("autoconsumptionProfit", data);
      },
    });

  const { mutate: setEnergySoldWithOverproducedTrend } =
    api.photovoltaics.energySoldWithOverproducedTrend.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs(
          "overproducedTrendInKw",
          data.overproducedTrendInKw
        );
        store.updatePhotovoltaicCalcs(
          "energy_sold_to_distributor",
          data.energySold
        );
      },
    });
  const { mutate: setFutureProfitsWithPV } =
    api.photovoltaics.futureProfitsWithPV.useMutation({
      onSuccess: (data) => {
        store.updatePhotovoltaicCalcs("futureProfitsWithPV", data);
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

  return {
    photovoltaicStore: store.photovoltaicStore,
    photovoltaicCalcStore: store.photovoltaicCalculations,
    updatePhotovoltaic: store.updatePhotovoltaic,
    updatePhotovoltaicCalcs: store.updatePhotovoltaicCalcs,
    mutations: {
      set_system_power,
      set_estimated_kWh_prod,
      set_autoconsumption,
      setAutoconsumptionProfit,
      setEnergySoldWithOverproducedTrend,
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
      set_payment_return_time,
      set_termo_modernization,
      set_loan_for_purcharse,
      set_energyManagerCost,
      set_energyMenagerDotationValue,
      setPromotionTotalInstallationCosts,
      setPhotovoltaicDotation_mojprad,
      setPhotovoltaicDotation_czpowietrze,
      setFutureProfitsWithPV,
      set_tigo_price,
    },
  };
};
