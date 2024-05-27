import { useEffect } from "react";
import { type Session } from "next-auth";
import { type HeatPumpDataToCalculationType } from "~/server/api/routers/heatpump/interfaces";
import { useHeatPump } from "~/hooks/useHeatPump";

interface HeatPumpMutationType {
  data?: HeatPumpDataToCalculationType;
  sessionData: Session | null;
}

export const HeatPumpMutations = ({
  data,
  sessionData,
}: HeatPumpMutationType) => {
  const { heatPumpStore, heatPumpCalcStore, mutations } = useHeatPump();

  useEffect(() => {
    if (data && heatPumpStore.buforType !== "")
      mutations.setBufforCost({
        bufforType: heatPumpStore.buforType,
        buffors: data?.bufory,
      });
  }, [data, heatPumpStore.buforType]);

  useEffect(() => {
    if (data) {
      mutations.setMontageInCascadeCost({
        isChoosed: heatPumpStore.isAnotherHeatPumpInCascade,
        elementCost: data.dodatki.kolejna_kaskada,
      });
    }
  }, [heatPumpStore.isAnotherHeatPumpInCascade, data]);

  useEffect(() => {
    if (data) {
      mutations.setNewDrillings({
        isChoosed: heatPumpStore.newDrillings,
        elementCost: data.dodatki.przewierty,
      });
    }
  }, [heatPumpStore.newDrillings, data]);
  useEffect(() => {
    if (data) {
      mutations.setLongerIsolationFromMineralWoolCost({
        length: heatPumpStore.longerIsolationFromMineralWool,
        elementCost: data.dodatki.poprowadzenie_instalacji_wierzchu,
      });
    }
  }, [heatPumpStore.longerIsolationFromMineralWool, data]);
  useEffect(() => {
    if (data) {
      mutations.setpreisolatedPipeCost({
        isChoosed: heatPumpStore.isPreIsolatedPipe,
        elementCost: data.dodatki.rura_preizolowana,
      });
    }
  }, [heatPumpStore.isPreIsolatedPipe, data]);
  useEffect(() => {
    if (data) {
      mutations.setLongerPreIsolatedPipeCost({
        length: heatPumpStore.longerPreIsolatedPipe,
        elementCost: data.dodatki.dodatkowe_rury_preizolowane,
      });
    }
  }, [heatPumpStore.longerPreIsolatedPipe, data]);
  useEffect(() => {
    if (data) {
      mutations.setCirculationMontageCost({
        isChoosed: heatPumpStore.isMontageCirculationCWU,
        elementCost: data.dodatki.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.isMontageCirculationCWU, data]);
  useEffect(() => {
    if (data) {
      mutations.setDemontageOldBoilerCost({
        isChoosed: heatPumpStore.demontageOldBoiler,
        elementCost: data.dodatki.demontaz_kotla,
      });
    }
  }, [heatPumpStore.demontageOldBoiler, data]);
  useEffect(() => {
    if (data) {
      mutations.setCleaningPlacementCost({
        isChoosed: heatPumpStore.cleanMontagePlacement,
        elementCost: data.dodatki.posprzatanie,
      });
    }
  }, [heatPumpStore.cleanMontagePlacement, data]);
  useEffect(() => {
    if (data) {
      mutations.setMoveCwuCost({
        isChoosed: heatPumpStore.moveCwu,
        elementCost: data.dodatki.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.moveCwu, data]);
  useEffect(() => {
    if (data) {
      mutations.setEnergeticConnectionCost({
        isChoosed: heatPumpStore.makeEnergeticConnection,
        elementCost: data.dodatki.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.makeEnergeticConnection, data]);
  useEffect(() => {
    if (data) {
      mutations.setBuforWithSupportCost({
        isChoosed: heatPumpStore.mergeNewBufforWithOld,
        elementCost: data.dodatki.spiecie_bufora,
      });
    }
  }, [heatPumpStore.mergeNewBufforWithOld, data]);
  useEffect(() => {
    if (data) {
      mutations.setCloseOpenedSystemCost({
        isChoosed: heatPumpStore.closingOpenSytem,
        elementCost: data.dodatki.zamkniecie_ukladu_otwartego,
      });
    }
  }, [heatPumpStore.closingOpenSytem, data]);
  useEffect(() => {
    if (data) {
      mutations.setAuditCost({
        isChoosed: heatPumpStore.isEnergeticAudit,
        elementCost: data.dodatki.audyt,
      });
    }
  }, [heatPumpStore.closingOpenSytem, data]);
  useEffect(() => {
    if (data && heatPumpStore.suggestedPump) {
      mutations.setHeatPumpCost({
        heatPumpCost: data.pompy_ciepla[heatPumpStore.suggestedPump]!.cena,
      });
    }
  }, [heatPumpStore.suggestedPump, data]);

  useEffect(() => {
    if (data && sessionData?.user && heatPumpStore.suggestedPump) {
      mutations.setMarkupCosts({
        system_power:
          data.pompy_ciepla[heatPumpStore.suggestedPump]!.mnozik_prowizji,
        officeFee: sessionData.user.feePerkwHeatPump,
        constantFee: sessionData.user.imposedFeeHeatPump,
        consultantFee: heatPumpStore.consultantMarkup,
        creatorId:
          sessionData.user.role === 3 ? sessionData.user.creatorId : "",
      });
    }
  }, [
    heatPumpStore.consultantMarkup,
    sessionData?.user,
    heatPumpStore.suggestedPump,
    data?.pompy_ciepla,
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
  ]);
  useEffect(() => {
    mutations.setHeatPumpPricingBeforeDotations({
      addonsSumCost: heatPumpCalcStore.addonSumCost,
      buforCost: heatPumpCalcStore.bufforCost,
      auditCost: heatPumpStore.isEnergeticAudit
        ? heatPumpCalcStore.energeticAuditCost
        : 0,
      netPriceForHeatPump: heatPumpCalcStore.heatPumpCost,
      vat: heatPumpStore.forCompany ? 0.23 : 0.08,
    });
  }, [
    heatPumpStore.isEnergeticAudit,
    heatPumpCalcStore.addonSumCost,
    heatPumpCalcStore.bufforCost,
    heatPumpCalcStore.heatPumpCost,
    heatPumpStore.forCompany,
  ]);
  useEffect(() => {
    if (data) {
      mutations.setHeatStoreDotationValue({
        modernizationDotation:
          data.dotacje.modernizacja_CO_CWU[
            heatPumpStore.choosedHeatPumpDotation
          ],
        heatStoreDotation:
          data.dotacje.pc[heatPumpStore.choosedHeatPumpDotation],
      });
    }
  }, [data?.dotacje, heatPumpStore.choosedHeatPumpDotation]);

  useEffect(() => {
    if (data) {
      mutations.setFinallGrossInstalationCost({
        dotationModernizationCoCwu:
          data.dotacje.modernizacja_CO_CWU[
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
    data?.dotacje.modernizacja_CO_CWU,
    heatPumpCalcStore.heatStoreDotations,
    heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue,
    heatPumpCalcStore.termoModernizationRelif,
  ]);
  useEffect(() => {
    if (data) {
      mutations.setLoanForPurcharse({
        creditPercentage: data.oprocentowanie_kredytu,
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
    data?.oprocentowanie_kredytu,
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
