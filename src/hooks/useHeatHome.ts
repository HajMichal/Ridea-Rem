import { HeatHomeDataCalculationType } from "~/server/api/routers/heatHome/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

export const useHeatHome = () => {
  const store = useStore();
  const { updateHeatHomeCalcs, heatHomeStore, heatHomeCalculationsStore } =
    store;
  const { data: jsonData } =
    api.heatHomeDataFlowRouter.downloadFile.useQuery<HeatHomeDataCalculationType>();

  const { mutate: setHeatedAreaCost } =
    api.heatHome.addonCostCounter.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("heatedAreaCost", data);
      },
    });
  const { mutate: setHeatingThicknessCost } =
    api.heatHome.addonCostCounter.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("heatingThicknessCost", data);
      },
    });
  const { mutate: setWindowSillCost } =
    api.heatHome.addonCostCounter.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("windowSillCost", data);
      },
    });
  const { mutate: setPlasterAreaCost } =
    api.heatHome.addonCostCounter.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("plasterAreaCost", data);
      },
    });
  const { mutate: setTopFinishCost } =
    api.heatHome.addonCostCounter.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("topFinishCost", data);
      },
    });
  const { mutate: setMarkupCosts } = api.heatHome.markupCosts.useMutation({
    onSuccess: (data) => {
      updateHeatHomeCalcs("markupCosts", data);
    },
  });
  const { mutate: setTotalCost } = api.heatHome.totalCosts.useMutation({
    onSuccess: (data) => {
      updateHeatHomeCalcs("totalCost", data);
    },
  });
  const { mutate: setDotationValue } = api.heatHome.dotationValue.useMutation({
    onSuccess: (data) => {
      updateHeatHomeCalcs("dotationValue", data);
    },
  });
  return {
    jsonData: jsonData,
    heatHomeStore: heatHomeStore,
    heatHomeCalcStore: heatHomeCalculationsStore,
    mutations: {
      setHeatedAreaCost,
      setHeatingThicknessCost,
      setWindowSillCost,
      setPlasterAreaCost,
      setTopFinishCost,
      setMarkupCosts,
      setTotalCost,
      setDotationValue,
    },
  };
};
