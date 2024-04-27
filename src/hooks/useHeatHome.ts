import { useSession } from "next-auth/react";
import { type HeatHomeDataCalculationType } from "~/server/api/routers/heatHome/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

export const useHeatHome = () => {
  const store = useStore();
  const { data: sessionData } = useSession();

  const { updateHeatHomeCalcs, heatHomeStore, heatHomeCalculationsStore } =
    store;
  const { data: jsonData } =
    api.heatHomeDataFlowRouter.downloadFile.useQuery<HeatHomeDataCalculationType>(
      sessionData?.user.id
    );

  const { mutate: setHeatedAreaCost } =
    api.heatHome.addonCostCounter.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("heatedAreaCost", data);
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
  const { mutate: setAmountAfterDotation } =
    api.heatHome.amountAfterDotation.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("amountAfterDotation", data);
      },
    });
  const { mutate: setTermoModernization } =
    api.heatHome.termoModernization.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("termoModernization", data);
      },
    });
  const { mutate: setFinallPrice } = api.heatHome.finallPrice.useMutation({
    onSuccess: (data) => {
      updateHeatHomeCalcs("finallPrice", data);
    },
  });
  const { mutate: setLoanForpurcharse } =
    api.heatHome.loanForPurcharse.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("installmentPrice", data);
      },
    });
  const { mutate: setEneregeticAuditCost } =
    api.heatHome.eneregeticAuditCost.useMutation({
      onSuccess: (data) => {
        updateHeatHomeCalcs("energeticAuditCost", data);
      },
    });
  return {
    jsonData: jsonData,
    heatHomeStore: heatHomeStore,
    heatHomeCalcStore: heatHomeCalculationsStore,
    mutations: {
      setHeatedAreaCost,
      setWindowSillCost,
      setPlasterAreaCost,
      setTopFinishCost,
      setMarkupCosts,
      setTotalCost,
      setDotationValue,
      setAmountAfterDotation,
      setTermoModernization,
      setFinallPrice,
      setLoanForpurcharse,
      setEneregeticAuditCost,
    },
  };
};
