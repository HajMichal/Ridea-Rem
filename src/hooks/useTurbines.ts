import useStore from "~/store";
import { api } from "~/utils/api";

export const useTurbines = () => {
  const store = useStore();

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
