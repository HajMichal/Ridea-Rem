import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const IsVoucherHoliday = () => {
  const { photovoltaicStore, updatePhotovoltaic } = usePhotovoltaic();

  const handleChange = (e: string | null) =>
    updatePhotovoltaic("holidayVoucher", e == "true");

  return (
    <SelectComponent
      title="VOUCHER HOLIDAY"
      onChange={handleChange}
      value={photovoltaicStore.holidayVoucher}
      data={YESNO}
    />
  );
};
export default memo(IsVoucherHoliday);
