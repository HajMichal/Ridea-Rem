import { useEffect } from "react";
import { useTurbines } from "~/hooks/useTurbines";

export function TurbinesMutations() {
  const { mutations, turbinesCalcStore } = useTurbines();

  useEffect(() => {
    mutations.setEnergyStoreTotalCost({
      batterCost: turbinesCalcStore.batterCost,
      energyCounterCost: turbinesCalcStore.energyCounterCost,
      mateboxCost: turbinesCalcStore.mateboxCost,
      t30ControllerCost: turbinesCalcStore.t30ControllerCost,
    });
  }, [
    turbinesCalcStore.batterCost,
    turbinesCalcStore.energyCounterCost,
    turbinesCalcStore.mateboxCost,
    turbinesCalcStore.t30ControllerCost,
  ]);
}
