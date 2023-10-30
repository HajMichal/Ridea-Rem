import useStore from "~/store";
import { api } from "~/utils/api";

export const useForCompany = () => {
  const store = useStore();

  const { mutate: setCalculateModuleCount } =
    api.forCompany.calculateModuleCount.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation("calculateModuleCount", data);
      },
    });
  const { mutate: setSystemPower } = api.forCompany.systemPower.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("systemPower", data);
    },
  });
  const { mutate: setEstimatedKWHProd } =
    api.forCompany.estimatedKWHProd.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation("estimatedKWHProd", data);
      },
    });
  const { mutate: setAutoconsumption } =
    api.forCompany.autoconsumption.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation("autoconsumption", data);
      },
    });
  const { mutate: setPriceFor1KW } = api.forCompany.priceFor1KW.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("priceFor1KW", data);
    },
  });

  const handleTigoinput = (e: { target: { valueAsNumber: number } }) => {
    // if (data)
    //   set_tigo_price({
    //     tigo_price: data.koszty_dodatkowe.tigo,
    //     tigo_count: e.target.valueAsNumber,
    //   });
  };

  return {
    forCompanyStore: store.forCompanyStore,
    forCompanyCalcStore: store.forCompanyCalculationStore,
    mutations: {
      setPriceFor1KW,
      setAutoconsumption,
      setEstimatedKWHProd,
      handleTigoinput,
      setCalculateModuleCount,
      setSystemPower,
    },
  };
};
