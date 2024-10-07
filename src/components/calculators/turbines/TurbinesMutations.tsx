import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useTurbines } from "~/hooks/useTurbines";

export function TurbinesMutations() {
  const { mutations, turbinesStore, turbinesData, turbinesCalcStore } =
    useTurbines();
  const { data: sessionData } = useSession();

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
        feesAmount: turbinesCalcStore.officeMarkup.markupSumValue,
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
    turbinesStore.isVat23,
  ]);

  useEffect(() => {
    if (sessionData?.user)
      mutations.setOfficeMarkup({
        creatorId: sessionData.user.creatorId ?? undefined,
        constantFee: sessionData.user.imposedFeeTurbines,
        perKwfee: sessionData.user.feePerkwTurbines,
        systemPower: turbinesStore.turbinesDetails.roundedTotalPower,
        consultantFee: turbinesStore.consultantMarkup,
      });
  }, [
    sessionData?.user,
    turbinesStore.turbinesDetails.roundedTotalPower,
    turbinesStore.consultantMarkup,
  ]);
}
