import { type ChangeEvent } from "react";

interface InputType {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  step: number;
  smallField?: boolean;
}

export const InputComponent = ({
  title,
  onChange,
  value,
  step,
  smallField = false,
}: InputType) => {
  return (
    <div className="mt-2 flex items-center gap-2 font-orkneyLight">
      <input
        type="number"
        onKeyDown={(e) => e.key === "." && e.preventDefault()}
        onChange={onChange}
        step={step}
        value={value}
        className={`border-b-[1.5px] border-dark bg-inherit p-1 pl-2 focus:border-brand focus:outline-none ${
          smallField && "max-w-[120px]"
        }`}
      />
      <div>{title}</div>
    </div>
  );
};
