import { Select } from "@mantine/core";

interface SelectType {
  title: string;
  onChange: (value: string | null) => void;
  value: number | boolean | string;
  data:
    | {
        value: string;
        label: string;
      }[]
    | string[];
  smallField?: boolean;
}
export const SelectComponent = ({
  title,
  onChange,
  value,
  data,
  smallField = false,
}: SelectType) => {
  return (
    <div className="my-3 flex w-full items-center gap-2 font-orkneyLight">
      <Select
        onChange={onChange}
        value={String(value)}
        data={data}
        radius="lg"
        className={`${smallField ? "max-w-[120px]" : "max-w-[215px]"} w-full`}
      />
      <div className="mt-[6px]">{title}</div>
    </div>
  );
};
