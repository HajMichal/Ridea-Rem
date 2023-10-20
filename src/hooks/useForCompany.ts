import useStore from "~/store";
import { api } from "~/utils/api";

export const useForCompany = () => {
  const store = useStore();

  return {
    forCompanyStore: store.forCompanyStore,
    forCompanyCalculationStore: store.forCompanyCalculationStore,
    mutations: {},
  };
};
