import { memo } from "react";
import { SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";

const IsVoucherHoliday = () => {
  const { photovoltaicStore } = usePhotovoltaic();
  const store = useStore();

  const handleChange = (e: string | null) =>
    store.updatePhotovoltaic("holidayVoucher", e == "true");

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
