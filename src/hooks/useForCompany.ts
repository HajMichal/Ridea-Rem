import { type ForCompanyDataToCalcualtionType } from "~/server/api/routers/forCompany/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

export const useForCompany = () => {
  const store = useStore();
  const { data } =
    api.forCompanyDataFlowRouter.downloadFile.useQuery<ForCompanyDataToCalcualtionType>();

  const { mutate: setCalculateModuleCount } =
    api.forCompany.calculateModuleCount.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation("calculateModuleCount", data);
      },
    });
  const { mutate: setAllSystemPowers } = api.forCompany.systemPower.useMutation(
    {
      onSuccess: (data) => {
        store.updateForCompanyCalculation("allSystemPowers", data);
      },
    }
  );
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

  const { mutate: setTigoPrice } = api.forCompany.addonPricing.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("addonTigoPrice", data);
    },
  });
  const { mutate: setBloczkiPrice } = api.forCompany.addonPricing.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("addonBloczkiPrice", data);
    },
  });
  const { mutate: setEkierkiPrice } = api.forCompany.addonPricing.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("addonEkierkiPrice", data);
    },
  });
  const { mutate: setGruntPrice } = api.forCompany.addonPricing.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("addonGruntPrice", data);
    },
  });

  const getDataDependsOnPanelPower = () => {
    if (store.photovoltaicStore.panelPower === 400) return data?.dane.czterysta;
    else if (store.photovoltaicStore.panelPower === 455)
      return data?.dane.czterysta_piecdziesiat;
    else if (store.photovoltaicStore.panelPower === 500)
      return data?.dane.piecset;
  };
  return {
    forCompanyStore: store.forCompanyStore,
    forCompanyCalcStore: store.forCompanyCalculationStore,
    mutations: {
      setGruntPrice,
      setEkierkiPrice,
      setBloczkiPrice,
      setTigoPrice,
      setPriceFor1KW,
      setAutoconsumption,
      setEstimatedKWHProd,

      setCalculateModuleCount,
      setAllSystemPowers,
      getDataDependsOnPanelPower,
    },
  };
};
