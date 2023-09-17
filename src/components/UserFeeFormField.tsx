import { useState } from "react";
import { type User } from "@prisma/client";
import { type MenagerType } from "~/pages/edycja/prowizje";
import { api } from "~/utils/api";
import { Input } from "@mantine/core";

interface UserFormFieldType {
  user: MenagerType | User;
  isWorker?: boolean;
}

interface InputWithSubmitButtonType {
  userId: string;
  label: string;
  setter: (variables: { feeAmount: number; userId: string }) => void;
}
const InputWithSubmitButton: React.FC<InputWithSubmitButtonType> = ({
  userId,
  setter,
  label,
}) => {
  const [value, setValue] = useState(0);

  const handleImposedFeeInput = () => {
    setter({ feeAmount: value, userId: userId });
    setValue(0);
    window.location.reload();
  };

  return (
    <>
      <div className="pl-1">
        <Input.Wrapper id={userId + label} label={label} maw={320} mx="auto">
          <Input
            type="number"
            id={userId + label}
            onChange={(e) => setValue(e.target.valueAsNumber)}
            step={100}
          />
        </Input.Wrapper>
        <button
          onClick={() => handleImposedFeeInput()}
          className="h-1/2 rounded-xl bg-brand p-2 px-4 font-orkneyBold text-dark"
          type="submit"
        >
          Zmień prowizję
        </button>
      </div>
    </>
  );
};

export const UserFeeFormField = ({
  user,
  isWorker = false,
}: UserFormFieldType) => {
  const { mutate: setImposedFeeAmount } =
    api.userDataHandling.imposeTheFee.useMutation();
  const { mutate: setFeePerKw } =
    api.userDataHandling.feePerKwChange.useMutation();

  return (
    <div className="flex flex-wrap items-center gap-5  font-orkney">
      <div>
        <h2>
          {user.name} - {user.role === 2 ? "menager" : "handlowiec"}
        </h2>
        {user.role === 3 && (
          <>
            <p>Stała prowizja {user.imposedFee}</p>
            <p>Prowizja od kW {user.feePerkw}</p>
          </>
        )}
      </div>
      <div className="flex flex-wrap items-end gap-3">
        {isWorker && (
          <>
            <InputWithSubmitButton
              label="Stała prowizja"
              userId={user.id}
              setter={setImposedFeeAmount}
            />
            <InputWithSubmitButton
              label="Prowizja od kW"
              userId={user.id}
              setter={setFeePerKw}
            />
          </>
        )}
      </div>
    </div>
  );
};
