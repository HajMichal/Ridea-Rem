import { TextInput } from "@mantine/core";
import React from "react";

interface ChangeDataInputComponentType {
  title: string;
  defaultValue: number;
}
export const ChangeDataInputComponent = React.forwardRef<
  HTMLInputElement,
  ChangeDataInputComponentType
>(({ title, defaultValue, ...props }: ChangeDataInputComponentType, ref) => {
  return (
    <div className="grid grid-cols-2 items-end justify-center gap-5">
      <h2 className="text-end">{title}</h2>
      {(defaultValue || defaultValue === 0) && (
        <TextInput
          {...props}
          label={"Wpisz nową wartość"}
          defaultValue={defaultValue}
          className="max-w-[150px]"
          ref={ref}
        />
      )}
    </div>
  );
});
ChangeDataInputComponent.displayName = "ChangeDataInputComponent";
