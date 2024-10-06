import { type ChangeEvent } from "react";

interface InputType {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  smallField?: boolean;
  disable?: boolean;
}

export const InputString = ({
  title,
  onChange,
  value,
  smallField = false,
  disable = false,
}: InputType) => {
  return (
    <div className="mt-4 flex items-center gap-2 font-orkneyLight">
      <input
        onChange={onChange}
        value={value}
        disabled={disable}
        className={`border-b-[1.5px] border-dark bg-inherit p-1 pl-2 focus:border-brand focus:outline-none ${
          smallField && "max-w-[120px]"
        }`}
      />
      <div>{title}</div>
    </div>
  );
};
