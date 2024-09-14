import { type ChangeEvent, memo, useEffect } from "react";
import { InputComponent } from "~/components";
import { useTurbines } from "~/hooks/useTurbines";
import { api } from "~/utils/api";

const Installments = () => {
  const { data: generalData } = api.dataFlow.getCreditPercentage.useQuery();
  const { turbinesStore, turbinesCalcStore, mutations, updateTurbinesStore } =
    useTurbines();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    updateTurbinesStore(
      "installmentNumber",
      value <= 0 || Number.isNaN(value) ? 0 : value
    );
  };
  useEffect(() => {
    if (generalData)
      mutations.loanForPurcharse({
        creditPercentage: generalData.creditPercentage,
        finallInstallationCost:
          turbinesCalcStore.turbinesAfterDotationCost +
          turbinesCalcStore.energyStoreAfterDotationCost,
        grossInstalltaionBeforeDotationsCost:
          turbinesCalcStore.turbinesTotalCosts.grossCost -
          turbinesCalcStore.energyStoreTotalCosts.grossCost,
        instalmentNumber: turbinesStore.installmentNumber,
      });
  }, [
    generalData,
    turbinesStore.installmentNumber,
    turbinesCalcStore.turbinesAfterDotationCost,
    turbinesCalcStore.energyStoreAfterDotationCost,
    turbinesCalcStore.turbinesTotalCosts.grossCost,
    turbinesCalcStore.energyStoreTotalCosts.grossCost,
  ]);

  return (
    <div className="mt-14">
      <InputComponent
        title="LICZBA RAT"
        onChange={handleChange}
        step={10}
        value={turbinesStore.installmentNumber}
      />
    </div>
  );
};
export default memo(Installments);
