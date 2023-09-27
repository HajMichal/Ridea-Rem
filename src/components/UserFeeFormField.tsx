import { useState } from "react";
import { type User } from "@prisma/client";
import { type MenagerType } from "~/pages/edycja/prowizje";
import { api } from "~/utils/api";
import { Input, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);
  
  const { mutate: setImposedFeeAmount } =
    api.userDataHandling.imposeTheFee.useMutation();
  const { mutate: setFeePerKw } =
    api.userDataHandling.feePerKwChange.useMutation();

  const { mutate: removeMenagerJson } =
    api.dataFlow.removeMenagerData.useMutation();
  const { mutate: removeUserFromDb } = api.userDataHandling.removeUser.useMutation()

  const removeUser = () => {
    removeUserFromDb(user.id)
    user.role === 2 && removeMenagerJson(user.name!);
    close();
  };

  return (
    <div className="flex flex-wrap items-center gap-5  font-orkney">
      <div>
        <div className="flex gap-5">
          <h2>
            {user.name} - {user.role === 2 ? "menager" : "handlowiec"}
          </h2>
          <div>
            <button
              className="rounded-xl bg-red px-8 py-1 font-semibold text-dark"
              onClick={open}
            >
              Usuń
            </button>
            <Modal
        opened={opened}
        onClose={close}
        title={`CZY NA PEWNO CHCESZ USUNĄĆ UŻYTKOWNIKA ${user.name}`}
        className="text-center font-orkneyBold"
        centered
      >
        <p className="font-orkney">
          Będzie to skutkowało usunięciem konta użytkownika. Nie będzie miał on dostępu do kalkulatora. 
          <br />
          {user.role === 2 && " W przypadku usunięcia menagera jego stawki bazowe także zostaną usunięte."}
        </p>
        <div className="flex w-full justify-between p-4">
          <button
            onClick={close}
            className="rounded-2xl bg-red p-2 px-4 font-orkneyBold duration-100 hover:scale-110"
          >
            ANULUJ
          </button>
          <button
            onClick={removeUser}
            className="rounded-2xl bg-green-500 p-2 px-4 font-orkneyBold duration-100 hover:scale-110"
          >
            TAK
          </button>
        </div>
      </Modal>
          </div>
        </div>
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
