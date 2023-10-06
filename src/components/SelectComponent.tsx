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
}
export const SelectComponent = ({
  title,
  onChange,
  value,
  data,
}: SelectType) => {
  return (
    <div className="my-3 flex w-full items-center gap-2 font-orkneyLight">
      <Select
        onChange={onChange}
        value={String(value)}
        data={data}
        radius="lg"
        className="w-[215px]"
      />
      <div className="mt-[6px]">{title}</div>
    </div>
  );
};
