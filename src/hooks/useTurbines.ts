import useStore from "~/store";
import { api } from "~/utils/api";

export const useTurbines = () => {
  const store = useStore();
  const { data: calcData } = api.turbinesDataFlowRouter.getCalcData.useQuery();

  const { mutate: setInverterCost } = api.turbines.setInverterCost.useMutation({
    onSuccess: (data) => {
      store.updateTurbinesCalc("inverterCost", data);
    },
  });

  const { mutate: setEnergyStoreTotalCost } =
    api.turbines.setEnergyStoreTotalCost.useMutation({
      onSuccess: (data) => {
        store.updateTurbinesCalc("energyStoreTotalCosts", data);
      },
    });

  const { mutate: setTurbinesDetails } =
    api.turbines.setTurbinesDetails.useMutation({
      onSuccess: (data) => {
        store.updateTurbines("turbinesDetails", data);
        if (calcData?.addons) {
          const basesCost =
            data.smallBaseCount * calcData.addons["podstawa dachowa"] +
            data.biggerBaseCount * calcData.addons["podstawa dachowa3000"];
          store.updateTurbinesCalc("turbinesBasesCost", basesCost);

          const montageCost =
            calcData.addons["montaż bazowo"] +
            calcData.addons["montaż dodatkowo"] * (data.turbinesCount - 2);
          store.updateTurbinesCalc("turbinesMontageCost", montageCost);
        }
      },
    });

  return {
    turbinesData: calcData,
    turbinesStore: store.turbinesStore,
    turbinesCalcStore: store.turbinesCalcStore,
    updateTurbinesStore: store.updateTurbines,
    updateTurbinesCalcStore: store.updateTurbinesCalc,
    mutations: {
      setInverterCost,
      setEnergyStoreTotalCost,
      setTurbinesDetails,
    },
  };
};
