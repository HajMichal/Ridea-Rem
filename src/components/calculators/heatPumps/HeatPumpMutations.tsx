import { useEffect } from "react";
import { type Session } from "next-auth";
import { type HeatPumpCalcType } from "~/server/api/routers/heatpump/interfaces";
import { useHeatPump } from "~/hooks/useHeatPump";
import { api } from "~/utils/api";
import useStore from "~/store";

interface HeatPumpMutationType {
  data?: HeatPumpCalcType;
  sessionData: Session | null;
}

export const HeatPumpMutations = ({
  data,
  sessionData,
}: HeatPumpMutationType) => {
  const { heatPumpStore, heatPumpCalcStore, mutations } = useHeatPump();
  const store = useStore();
  const { data: generalData } =
    api.pvMenagerRouter.getCreditPercentage.useQuery();

  useEffect(() => {
    if (data && heatPumpStore.buforType !== "")
      mutations.setBufforCost({
        bufforType: heatPumpStore.buforType,
        buffors: data.bufory,
      });
  }, [data, heatPumpStore.buforType]);

  useEffect(() => {
    if (data) {
      mutations.setMontageInCascadeCost({
        isChoosed: heatPumpStore.isAnotherHeatPumpInCascade,
        elementCost: data.addons.kolejna_kaskada,
      });
    }
  }, [heatPumpStore.isAnotherHeatPumpInCascade, data]);

  useEffect(() => {
    if (data) {
      mutations.setNewDrillings({
        isChoosed: heatPumpStore.newDrillings,
        elementCost: data.addons.przewierty,
      });
    }
  }, [heatPumpStore.newDrillings, data]);
  useEffect(() => {
    if (data) {
      mutations.setLongerIsolationFromMineralWoolCost({
        length: heatPumpStore.longerIsolationFromMineralWool,
        elementCost: data.addons.poprowadzenie_instalacji_wierzchu,
      });
    }
  }, [heatPumpStore.longerIsolationFromMineralWool, data]);
  useEffect(() => {
    if (data) {
      mutations.setpreisolatedPipeCost({
        isChoosed: heatPumpStore.isPreIsolatedPipe,
        elementCost: data.addons.rura_preizolowana,
      });
    }
  }, [heatPumpStore.isPreIsolatedPipe, data]);
  useEffect(() => {
    if (data) {
      mutations.setLongerPreIsolatedPipeCost({
        length: heatPumpStore.longerPreIsolatedPipe,
        elementCost: data.addons.dodatkowe_rury_preizolowane,
      });
    }
  }, [heatPumpStore.longerPreIsolatedPipe, data]);
  useEffect(() => {
    if (data) {
      mutations.setCirculationMontageCost({
        isChoosed: heatPumpStore.isMontageCirculationCWU,
        elementCost: data.addons.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.isMontageCirculationCWU, data]);
  useEffect(() => {
    if (data) {
      mutations.setDemontageOldBoilerCost({
        isChoosed: heatPumpStore.demontageOldBoiler,
        elementCost: data.addons.demontaz_kotla,
      });
    }
  }, [heatPumpStore.demontageOldBoiler, data]);
  useEffect(() => {
    if (data) {
      mutations.setCleaningPlacementCost({
        isChoosed: heatPumpStore.cleanMontagePlacement,
        elementCost: data.addons.posprzatanie,
      });
    }
  }, [heatPumpStore.cleanMontagePlacement, data]);
  useEffect(() => {
    if (data) {
      mutations.setMoveCwuCost({
        isChoosed: heatPumpStore.moveCwu,
        elementCost: data.addons.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.moveCwu, data]);
  useEffect(() => {
    if (data) {
      mutations.setEnergeticConnectionCost({
        isChoosed: heatPumpStore.makeEnergeticConnection,
        elementCost: data.addons.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.makeEnergeticConnection, data]);
  useEffect(() => {
    if (data) {
      mutations.setBuforWithSupportCost({
        isChoosed: heatPumpStore.mergeNewBufforWithOld,
        elementCost: data.addons.spiecie_bufora,
      });
    }
  }, [heatPumpStore.mergeNewBufforWithOld, data]);
  useEffect(() => {
    if (data) {
      mutations.setCloseOpenedSystemCost({
        isChoosed: heatPumpStore.closingOpenSytem,
        elementCost: data.addons.zamkniecie_ukladu_otwartego,
      });
    }
  }, [heatPumpStore.closingOpenSytem, data]);
  useEffect(() => {
    if (data) {
      mutations.setAuditCost({
        isChoosed: heatPumpStore.isEnergeticAudit,
        elementCost: data.addons.audyt,
      });
    }
  }, [heatPumpStore.isEnergeticAudit, data]);
  useEffect(() => {
    if (data && heatPumpStore.suggestedPump) {
      mutations.setHeatPumpCost({
        heatPumpCost: data.heatPumps[heatPumpStore.suggestedPump]!.cena,
      });
    }
  }, [heatPumpStore.suggestedPump, data]);

  useEffect(() => {
    if (data && sessionData?.user && heatPumpStore.suggestedPump) {
      mutations.setMarkupCosts({
        system_power: data.heatPumps[heatPumpStore.suggestedPump]!.fee,
        officeFee: sessionData.user.feePerkwHeatPump,
        constantFee: sessionData.user.imposedFeeHeatPump,
        consultantFee: heatPumpStore.consultantMarkup,
        hasUserContract: store.hasContract,
        creatorId:
          sessionData.user.role === 3 ? sessionData.user.creatorId : "",
      });
    }
  }, [
    store.hasContract,
    heatPumpStore.consultantMarkup,
    sessionData?.user,
    heatPumpStore.suggestedPump,
    data?.heatPumps,
  ]);
  useEffect(() => {
    mutations.setAddonsSumCost({
      buforWithSupportCost: heatPumpCalcStore.buforWithSupportCost,
      circulationMontageCost: heatPumpCalcStore.circulationMontageCost,
      closeOpenedSystemCost: heatPumpCalcStore.closeOpenedSystemCost,
      demontageOldBoilerCost: heatPumpCalcStore.demontageOldBoilerCost,
      cleanPlacementCost: heatPumpCalcStore.cleanPlacementCost,
      energeticConnectionCost: heatPumpCalcStore.energeticConnectionCost,
      longerIsolationFromMineralWoolCost:
        heatPumpCalcStore.longerIsolationFromMineralWoolCost,
      longerPreIsolatedPipeCost: heatPumpCalcStore.longerPreIsolatedPipeCost,
      montagePumpInCascadeCost: heatPumpCalcStore.montagePumpInCascadeCost,
      moveCwuCost: heatPumpCalcStore.moveCwuCost,
      newDrillingsCost: heatPumpCalcStore.newDrillingsCost,
      preisolatedPipeCost: heatPumpCalcStore.preisolatedPipeCost,
      auditCost: heatPumpCalcStore.energeticAuditCost,
      markupSumValue: heatPumpCalcStore.markupCosts.markupSumValue,
    });
  }, [
    heatPumpCalcStore.buforWithSupportCost,
    heatPumpCalcStore.circulationMontageCost,
    heatPumpCalcStore.closeOpenedSystemCost,
    heatPumpCalcStore.demontageOldBoilerCost,
    heatPumpCalcStore.cleanPlacementCost,
    heatPumpCalcStore.energeticConnectionCost,
    heatPumpCalcStore.longerIsolationFromMineralWoolCost,
    heatPumpCalcStore.longerPreIsolatedPipeCost,
    heatPumpCalcStore.montagePumpInCascadeCost,
    heatPumpCalcStore.newDrillingsCost,
    heatPumpCalcStore.moveCwuCost,
    heatPumpCalcStore.preisolatedPipeCost,
    heatPumpCalcStore.markupCosts,
    heatPumpCalcStore.energeticAuditCost,
  ]);
  useEffect(() => {
    mutations.setHeatPumpPricingBeforeDotations({
      addonsSumCost: heatPumpCalcStore.addonSumCost,
      buforCost: heatPumpCalcStore.bufforCost,
      netPriceForHeatPump: heatPumpCalcStore.heatPumpCost,
      vat: heatPumpStore.forCompany ? 0.23 : 0.08,
    });
  }, [
    heatPumpCalcStore.addonSumCost,
    heatPumpCalcStore.bufforCost,
    heatPumpCalcStore.heatPumpCost,
    heatPumpStore.forCompany,
  ]);
  useEffect(() => {
    if (data) {
      mutations.setHeatStoreDotationValue({
        modernizationDotation:
          data.dotations.modernizacja_CO_CWU[
            heatPumpStore.choosedHeatPumpDotation
          ],
        heatStoreDotation:
          data.dotations.pc[heatPumpStore.choosedHeatPumpDotation],
      });
    }
  }, [data?.dotations, heatPumpStore.choosedHeatPumpDotation]);

  useEffect(() => {
    if (data) {
      mutations.setFinallGrossInstalationCost({
        dotationModernizationCoCwu:
          data.dotations.modernizacja_CO_CWU[
            heatPumpStore.choosedHeatPumpDotation
          ],
        grossSystemValue:
          heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue,
        heatPumpDotation:
          heatPumpCalcStore.heatStoreDotations.heatStoreDotationValue,
        termoModernizationRelifAmount:
          heatPumpCalcStore.termoModernizationRelif,
      });
    }
  }, [
    data?.dotations.modernizacja_CO_CWU,
    heatPumpCalcStore.heatStoreDotations,
    heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue,
    heatPumpCalcStore.termoModernizationRelif,
  ]);
  useEffect(() => {
    if (generalData) {
      mutations.setLoanForPurcharse({
        creditPercentage: generalData.creditPercentage,
        finall_installation_cost: heatPumpCalcStore.finallGrossInstalationCost,
        grossInstalltaionBeforeDotationsCost:
          heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue,
        instalmentNumber: heatPumpStore.installmentNumber,
      });
    }
  }, [
    heatPumpStore.installmentNumber,
    heatPumpCalcStore.heatPumpPricingBeforeDotations,
    heatPumpCalcStore.finallGrossInstalationCost,
    generalData,
  ]);
  useEffect(() => {
    mutations.setTermoModernizationRelif({
      dotationModernizationCoCwu:
        heatPumpCalcStore.heatStoreDotations.modernizationDotation,
      heatPumpDotation:
        heatPumpCalcStore.heatStoreDotations.heatStoreDotationValue,
      netSystemValue:
        heatPumpCalcStore.heatPumpPricingBeforeDotations.netSystemValue,
    });
  }, [
    heatPumpCalcStore.heatPumpPricingBeforeDotations.netSystemValue,
    heatPumpCalcStore.heatStoreDotations,
  ]);
};
