import { tax23 } from "~/constans/taxPercentage";

interface InstallationPrice {
  input: {
    airConditionerPrice: number;
    addonsSumPrice: number;
  };
}
export function installationPrice({ input }: InstallationPrice) {
  const netInstallationPrice = Number(
    (input.airConditionerPrice + input.addonsSumPrice).toFixed(2)
  );
  const vatValue = Number((netInstallationPrice * tax23).toFixed(2));
  const grossInstallationPrice = Number(
    (netInstallationPrice + vatValue).toFixed(2)
  );

  return {
    netInstallationPrice,
    vatValue,
    grossInstallationPrice,
  };
}
