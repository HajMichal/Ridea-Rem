import { tax23 } from "~/constans/taxPercentage";

interface InstallationPrice {
  input: {
    airConditionerPrice: number;
    addonsSumPrice: number;
  };
}
export function installationPrice({ input }: InstallationPrice) {
  const netInstallationPrice = input.airConditionerPrice + input.addonsSumPrice;
  const vatValue = Number((netInstallationPrice * tax23).toFixed(2));
  const grossInstallationPrice = netInstallationPrice + vatValue;

  return {
    netInstallationPrice,
    vatValue,
    grossInstallationPrice,
  };
}
