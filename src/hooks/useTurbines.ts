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
      onSuccess: (data) =>
        store.updateTurbinesCalc("energyStoreTotalCosts", data),
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
            data.turbinesCount !== 0
              ? calcData.addons["montaż bazowo"] +
                calcData.addons["montaż dodatkowo"] * (data.turbinesCount - 2)
              : 0;
          store.updateTurbinesCalc("turbinesMontageCost", montageCost);

          const transportCost =
            data.turbinesCount !== 0 ? calcData.addons.wysylka : 0;
          store.updateTurbinesCalc("transportCost", transportCost);

          const greaterPowerFee =
            data.totalPower > 3 ? calcData.addons["instalacja powyzej 3kw"] : 0;
          store.updateTurbinesCalc("greaterPowerFee", greaterPowerFee);
        }
      },
    });

  const { mutate: setTurbinesTotalCost } =
    api.turbines.setTurbinesTotalCost.useMutation({
      onSuccess: (data) => {
        store.updateTurbinesCalc("turbinesTotalCosts", data);
      },
    });

  const { mutate: loanForPurcharse } =
    api.turbines.loanForPurcharse.useMutation({
      onSuccess: (data) => {
        store.updateTurbinesCalc("loanForPurcharse", data);
      },
    });

  const { mutate: setOfficeMarkup } = api.turbines.setOfficeMarkup.useMutation({
    onSuccess: (data) => {
      store.updateTurbinesCalc("officeMarkup", data);
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
      setTurbinesTotalCost,
      loanForPurcharse,
      setOfficeMarkup,
    },
  };
};
