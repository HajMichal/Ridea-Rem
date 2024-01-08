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
  setter: (variables: {
    feeAmount: number;
    userId: string;
    whichCalcualtor: string;
  }) => void;
  whichCalcualtor: string;
}
const InputWithSubmitButton: React.FC<InputWithSubmitButtonType> = ({
  userId,
  setter,
  label,
  whichCalcualtor,
}) => {
  const [value, setValue] = useState(0);

  const handleImposedFeeInput = () => {
    setter({
      feeAmount: value,
      userId: userId,
      whichCalcualtor: whichCalcualtor,
    });
    setValue(0);
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col justify-end pl-1">
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
          className=" rounded-xl bg-brand p-2 px-4 font-orkneyBold text-dark"
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

  const { mutate: removeMenagerPhotovoltaicJson } =
    api.dataFlow.removeMenagerData.useMutation();
  const { mutate: removeMenagerHeatPumpJson } =
    api.heatPumpDataFlowRouter.removeMenagerData.useMutation();
  const { mutate: removeMenagerForCompanyJson } =
    api.forCompanyDataFlowRouter.removeMenagerData.useMutation();
  const { mutate: removeMenagerHeatHomeJson } =
    api.heatHomeDataFlowRouter.removeMenagerData.useMutation();
  const { mutate: removeUserFromDb } =
    api.userDataHandling.removeUser.useMutation();

  const removeUser = () => {
    removeUserFromDb(user.id);
    user.role === 2 && removeMenagerPhotovoltaicJson(user.name!),
      user.role === 2 && removeMenagerHeatPumpJson(user.name!);
    user.role === 2 && removeMenagerForCompanyJson(user.name!);
    user.role === 2 && removeMenagerHeatHomeJson(user.name!);
    close();
  };
  const CALCUALTOR_TYPES = [
    "Photovoltaic",
    "ForCompany",
    "HeatPump",
    "HeatHome",
  ];
  return (
    <div className="mt-3 flex gap-5 font-orkney">
      <div className="flex flex-col">
        <div className="mt-2 flex w-96 gap-5">
          <h2 className="font-orkneyBold text-2xl">
            {user.name} - {user.role === 2 ? "menager" : "handlowiec"}
          </h2>
          <div>
            <button
              className="rounded-xl bg-red px-8 py-1 font-semibold text-dark"
              onClick={open}
            >
              Usuń
            </button>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black p-3 ">
          <div className="flex justify-between">
            <p>Stała prowizja fotowoltaiki</p>{" "}
            <p>{user.imposedFeePhotovoltaic}</p>
          </div>
          <div className="flex justify-between">
            <p>Prowizja od kW fotowoltaiki</p>{" "}
            <p>{user.feePerkwPhotovoltaic}</p>
          </div>
          <div className="flex justify-between">
            <p>Stała prowizja dla firm</p> <p>{user.imposedFeeForCompany}</p>
          </div>
          <div className="flex justify-between">
            <p>Prowizja od kW dla firm</p> <p>{user.feePerkwForCompany}</p>
          </div>
          <div className="flex justify-between">
            <p>Stała prowizja pompy ciepła</p> <p>{user.imposedFeeHeatPump}</p>
          </div>
          <div className="flex justify-between">
            <p>Prowizja od kW pompy ciepła</p> <p>{user.feePerkwHeatPump}</p>
          </div>
          <div className="flex justify-between">
            <p>Stała prowizja ciepło właściwe</p>{" "}
            <p>{user.imposedFeeHeatHome}</p>
          </div>
          <div className="flex justify-between">
            <p>Prowizja od M² ciepło właściwe</p> <p>{user.feePerkwHeatHome}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-1 items-end gap-5">
        {!isWorker &&
          CALCUALTOR_TYPES.map((calcualtor) => {
            return (
              <div className="my-5" key={calcualtor}>
                <InputWithSubmitButton
                  label={`Stała prowizja  
                    ${
                      calcualtor === "Photovoltaic"
                        ? "fotowoltaika"
                        : calcualtor === "ForCompany"
                        ? "dla firm"
                        : calcualtor === "HeatPump"
                        ? "pompy ciepła"
                        : "ciepło właściwe"
                    }
                      `}
                  userId={user.id}
                  setter={setImposedFeeAmount}
                  whichCalcualtor={calcualtor}
                />
                <InputWithSubmitButton
                  label={`Prowizja od 
                  ${
                    calcualtor === "Photovoltaic"
                      ? "kW fotowoltaika"
                      : calcualtor === "ForCompany"
                      ? "kW dla firm"
                      : calcualtor === "HeatPump"
                      ? "kW pompy ciepła"
                      : "M² ciepło właściwe"
                  }
                    `}
                  userId={user.id}
                  setter={setFeePerKw}
                  whichCalcualtor={calcualtor}
                />
              </div>
            );
          })}
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={`CZY NA PEWNO CHCESZ USUNĄĆ UŻYTKOWNIKA ${user.name}`}
        className="text-center font-orkneyBold"
        centered
      >
        <p className="font-orkney">
          Będzie to skutkowało usunięciem konta użytkownika. Nie będzie miał on
          dostępu do kalkulatora.
          <br />
          {user.role === 2 &&
            " W przypadku usunięcia menagera jego stawki bazowe także zostaną usunięte."}
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
  );
};
