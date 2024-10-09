import { type HeatPumpCalcType } from "~/server/api/routers/heatpump/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

export const useHeatPump = () => {
  const store = useStore();

  const { data } =
    api.heatPumpDataFlowRouter.getSingle.useQuery<HeatPumpCalcType>();

  const { mutate: setBufforCost } = api.heatPump.bufforCost.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("bufforCost", data);
    },
  });
  const { mutate: setMontageInCascadeCost } =
    api.heatPump.montageAnotherPumpInCascade.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("montagePumpInCascadeCost", data);
      },
    });
  const { mutate: setPlacementWithBurstCost } =
    api.heatPump.placementWithBurst.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("placementWithBurstCost", data);
      },
    });
  const { mutate: setNewDrillings } = api.heatPump.newDrillings.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("newDrillingsCost", data);
    },
  });
  const { mutate: setLongerIsolationFromMineralWoolCost } =
    api.heatPump.longerIsolationFromMineralWool.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("longerIsolationFromMineralWoolCost", data);
      },
    });
  const { mutate: setpreisolatedPipeCost } =
    api.heatPump.preisolatedPipe.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("preisolatedPipeCost", data);
      },
    });
  const { mutate: setLongerPreIsolatedPipeCost } =
    api.heatPump.longerPreIsolatedPipe.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("longerPreIsolatedPipeCost", data);
      },
    });
  const { mutate: setCirculationMontageCost } =
    api.heatPump.circulationMontage.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("circulationMontageCost", data);
      },
    });
  const { mutate: setDemontageOldBoilerCost } =
    api.heatPump.demontageOldBoiler.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("demontageOldBoilerCost", data);
      },
    });
  const { mutate: setCleaningPlacementCost } =
    api.heatPump.cleanPlacement.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("cleanPlacementCost", data);
      },
    });
  const { mutate: setMoveCwuCost } = api.heatPump.moveCwu.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("moveCwuCost", data);
    },
  });
  const { mutate: setEnergeticConnectionCost } =
    api.heatPump.makeEnergeticConnection.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("energeticConnectionCost", data);
      },
    });
  const { mutate: setBuforWithSupportCost } =
    api.heatPump.buforWithSupport.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("buforWithSupportCost", data);
      },
    });
  const { mutate: setCloseOpenedSystemCost } =
    api.heatPump.closeOpenedSystem.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("closeOpenedSystemCost", data);
      },
    });
  const { mutate: setAuditCost } = api.heatPump.energeticAudit.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("energeticAuditCost", data);
    },
  });
  const { mutate: setHeatPumpCost } = api.heatPump.heatPumpCost.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("heatPumpCost", data);
    },
  });
  const { mutate: setAddonsSumCost } = api.heatPump.addonsSumCost.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("addonSumCost", data);
    },
  });
  const { mutate: setHeatPumpPricingBeforeDotations } =
    api.heatPump.heatPumpPricingBeforeDotations.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("heatPumpPricingBeforeDotations", data);
      },
    });
  const { mutate: setTermoModernizationRelif } =
    api.heatPump.termoModernizationRelif.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("termoModernizationRelif", data);
      },
    });
  const { mutate: setFinallGrossInstalationCost } =
    api.heatPump.finallGrossInstalationCost.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("finallGrossInstalationCost", data);
      },
    });
  const { mutate: setHeatStoreDotationValue } =
    api.heatPump.heatStoreDotationValue.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("heatStoreDotations", data);
      },
    });
  const { mutate: setLoanForPurcharse } =
    api.heatPump.loanForPurcharse.useMutation({
      onSuccess: (data) => {
        store.updateHeatPumpCalcs("loanForPurcharse", data);
      },
    });
  const { mutate: setMarkupCosts } = api.heatPump.markupCosts.useMutation({
    onSuccess: (data) => {
      store.updateHeatPumpCalcs("markupCosts", data);
    },
  });

  return {
    heatPumpData: data,
    heatPumpStore: store.heatPumpStore,
    heatPumpCalcStore: store.heatPumpCalculationStore,
    mutations: {
      setMarkupCosts,
      setBufforCost,
      setMontageInCascadeCost,
      setPlacementWithBurstCost,
      setNewDrillings,
      setLongerIsolationFromMineralWoolCost,
      setpreisolatedPipeCost,
      setLongerPreIsolatedPipeCost,
      setCirculationMontageCost,
      setDemontageOldBoilerCost,
      setMoveCwuCost,
      setEnergeticConnectionCost,
      setBuforWithSupportCost,
      setCloseOpenedSystemCost,
      setHeatPumpCost,
      setAddonsSumCost,
      setCleaningPlacementCost,
      setHeatPumpPricingBeforeDotations,
      setTermoModernizationRelif,
      setFinallGrossInstalationCost,
      setHeatStoreDotationValue,
      setLoanForPurcharse,
      setAuditCost,
    },
  };
};
