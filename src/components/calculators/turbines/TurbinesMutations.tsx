import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useTurbines } from "~/hooks/useTurbines";
import type { TurbineCalcData } from "~/server/api/routers/turbines/interfaces";
import useStore from "~/store";

interface TurbinesMutationsType {
  turbinesData?: TurbineCalcData;
}
export function TurbinesMutations({ turbinesData }: TurbinesMutationsType) {
  const { mutations, turbinesStore, turbinesCalcStore } = useTurbines();
  const { data: sessionData } = useSession();
  const store = useStore();

  useEffect(() => {
    mutations.setEnergyStoreTotalCost({
      choosedEnergyStore: turbinesStore.energyStore.price,
      batteryCost: turbinesCalcStore.batteryCost,
      energyCounterCost: turbinesCalcStore.energyCounterCost,
      mateboxCost: turbinesCalcStore.mateboxCost,
      t30ControllerCost: turbinesCalcStore.t30ControllerCost,
      isVat23: turbinesStore.isVat23,
    });
  }, [
    turbinesStore.energyStore,
    turbinesCalcStore.batteryCost,
    turbinesCalcStore.energyCounterCost,
    turbinesCalcStore.mateboxCost,
    turbinesCalcStore.t30ControllerCost,
    turbinesStore.isVat23,
  ]);

  useEffect(() => {
    if (turbinesData?.addons)
      mutations.setTurbinesTotalCost({
        turbine500Cost: turbinesCalcStore.turbine500Cost,
        turbine1000Cost: turbinesCalcStore.turbine1000Cost,
        turbine1500Cost: turbinesCalcStore.turbine1500Cost,
        turbine3000Cost: turbinesCalcStore.turbine3000Cost,

        turbinesBasesCost: turbinesCalcStore.turbinesBasesCost,
        turbinesMontageCost: turbinesCalcStore.turbinesMontageCost,
        inverterCost: turbinesCalcStore.inverterCost,
        mastCost: turbinesCalcStore.mastCost,
        transportCost: turbinesCalcStore.transportCost,
        inverterBase: turbinesCalcStore.inverterBaseCost,
        greaterPowerFee: turbinesCalcStore.greaterPowerFee,
        feesAmount:
          turbinesStore.turbinesDetails.turbinesCount !== 0
            ? turbinesCalcStore.officeMarkup.markupSumValue
            : 0,
        cableCost:
          turbinesStore.turbinesDetails.turbinesCount !== 0
            ? turbinesData.addons.kable
            : 0,
        zwyzka:
          turbinesStore.turbinesDetails.turbinesCount !== 0
            ? turbinesData.addons.zwyzka
            : 0,

        isVat23: turbinesStore.isVat23,
      });
  }, [
    turbinesCalcStore.turbine500Cost,
    turbinesCalcStore.turbine1000Cost,
    turbinesCalcStore.turbine1500Cost,
    turbinesCalcStore.turbine3000Cost,
    turbinesCalcStore.turbinesBasesCost,
    turbinesCalcStore.turbinesMontageCost,
    turbinesCalcStore.inverterCost,
    turbinesCalcStore.officeMarkup,
    turbinesCalcStore.mastCost,
    turbinesCalcStore.transportCost,
    turbinesCalcStore.inverterBaseCost,
    turbinesCalcStore.greaterPowerFee,
    turbinesStore.turbinesDetails.turbinesCount,
    turbinesStore.isVat23,
    turbinesData?.addons,
  ]);

  useEffect(() => {
    if (sessionData?.user)
      mutations.setOfficeMarkup({
        creatorId: sessionData.user.creatorId ?? undefined,
        constantFee: sessionData.user.imposedFeeTurbines,
        perPcsFee: sessionData.user.feePerkwTurbines,
        turbinesCount: turbinesStore.turbinesDetails.turbinesCount,
        consultantFee: store.markupAmount,
        hasUserContract: store.hasContract,
      });
  }, [
    sessionData?.user,
    turbinesStore.turbinesDetails.turbinesCount,
    store.markupAmount,
    store.hasContract,
  ]);

  useEffect(() => {
    if (turbinesData?.addons) {
      const basesCost =
        turbinesStore.turbinesDetails.smallBaseCount *
          turbinesData.addons["podstawa dachowa"] +
        turbinesStore.turbinesDetails.mediumBaseCount *
          turbinesData.addons["podstawa dachowa1000/1500"] +
        turbinesStore.turbinesDetails.biggerBaseCount *
          turbinesData.addons["podstawa dachowa3000"];
      store.updateTurbinesCalc("turbinesBasesCost", basesCost);

      const montageCost =
        turbinesStore.turbinesDetails.turbinesCount !== 0
          ? turbinesData.addons["montaż bazowo"] +
            turbinesData.addons["montaż dodatkowo"] *
              turbinesStore.turbinesDetails.turbinesCount
          : 0;
      store.updateTurbinesCalc("turbinesMontageCost", montageCost);

      const transportCost =
        turbinesStore.turbinesDetails.turbinesCount !== 0
          ? turbinesData.addons.wysylka *
            turbinesStore.turbinesDetails.turbinesCount
          : 0;
      store.updateTurbinesCalc("transportCost", transportCost);

      const greaterPowerFee =
        turbinesStore.turbinesDetails.totalPower > 3
          ? turbinesData.addons["instalacja powyzej 3kw"]
          : 0;
      store.updateTurbinesCalc("greaterPowerFee", greaterPowerFee);
    }
  }, [turbinesData?.addons, turbinesStore.turbinesDetails.turbinesCount]);
}
