import { Select } from "@mantine/core";

interface SelectType {
  title: string;
  onChange: (value: string | null) => void;
  value: number | boolean | string | null;
  data:
    | {
        value: string;
        label: string;
      }[]
    | string[];
  smallField?: boolean;
  className?: string;
}
export const SelectComponent = ({
  title,
  onChange,
  value,
  data,
  className,
  smallField = false,
}: SelectType) => {
  return (
    <div
      className={`my-3 flex w-full items-center gap-2 font-orkneyLight ${className}`}
    >
      <Select
        onChange={onChange}
        value={String(value)}
        data={data}
        radius="lg"
        className={`${smallField ? "max-w-[120px]" : "max-w-[220px]"} w-full`}
      />
      <div className="mt-[6px]">{title}</div>
    </div>
  );
};
