import useStore from "~/store";
import { api } from "~/utils/api";

export const useTurbines = () => {
  const store = useStore();
  const { data } = api.turbinesDataFlowRouter.getCalcData.useQuery();

  const { mutate: setInverterCost } = api.turbines.setInverterCost.useMutation({
    onSuccess: (data) => {
      store.updateTurbinesCalc("inverterCost", data);
    },
  });

  return {
    turbinesData: data,
    turbinesStore: store.turbinesStore,
    turbinesCalcStore: store.turbinesCalcStore,
    updateTurbinesStore: store.updateTurbines,
    updateTurbinesCalcStore: store.updateTurbinesCalc,
    mutations: {
      setInverterCost,
    },
  };
};
