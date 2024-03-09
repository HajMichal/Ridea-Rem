import { panel415, panel455, panel500 } from "~/constans/panelPowers";
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
  const { mutate: setFor1KwAndBaseInstallationPrice } =
    api.forCompany.for1KwAndBaseInstallationPrice.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation(
          "for1KwAndBaseInstallationPrice",
          data
        );
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
  const { mutate: setAddonSum } = api.forCompany.addonSum.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("addonSum", data);
    },
  });
  const { mutate: setOfficeMarkup } = api.forCompany.officeMarkup.useMutation({
    onSuccess: (data) => {
      store.updateForCompanyCalculation("officeMarkup", data);
    },
  });
  const { mutate: setTotalInstallationCosts } =
    api.forCompany.totalInstallationCosts.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation("totalInstallationCosts", data);
      },
    });
  const { mutate: setLoanForPurcharse } =
    api.forCompany.loanForPurcharse.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation("loanForPurcharse", data);
      },
    });
  const { mutate: setBaseInstallationsPricing } =
    api.forCompany.baseInstallationsPricing.useMutation({
      onSuccess: (data) => {
        store.updateForCompanyCalculation("baseInstallationsPricing", data);
      },
    });

  const getDataDependsOnPanelPower = () => {
    if (store.photovoltaicStore.panelPower === panel415)
      return data?.dane.czterysta;
    else if (store.photovoltaicStore.panelPower === panel455)
      return data?.dane.czterysta_piecdziesiat;
    else if (store.photovoltaicStore.panelPower === panel500)
      return data?.dane.piecset;
  };
  return {
    forCompanyStore: store.forCompanyStore,
    forCompanyCalcStore: store.forCompanyCalculationStore,
    mutations: {
      setLoanForPurcharse,
      setTotalInstallationCosts,
      setOfficeMarkup,
      setAddonSum,
      setGruntPrice,
      setEkierkiPrice,
      setBloczkiPrice,
      setTigoPrice,
      setFor1KwAndBaseInstallationPrice,
      setAutoconsumption,
      setEstimatedKWHProd,
      setBaseInstallationsPricing,

      setCalculateModuleCount,
      setAllSystemPowers,
      getDataDependsOnPanelPower,
    },
  };
};
