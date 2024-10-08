import { useState } from "react";
import { type User } from "@prisma/client";
import { type MenagerType } from "~/pages/edycja/prowizje";
import { api } from "~/utils/api";
import { Button, Input, Modal } from "@mantine/core";
import { CALCUALTOR_TYPES } from "~/constans/calculatorTypes";
import { FeesTable } from ".";
import React from "react";

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
  isDisabled?: boolean;
}
const InputWithSubmitButton: React.FC<InputWithSubmitButtonType> = ({
  userId,
  setter,
  label,
  whichCalcualtor,
  isDisabled = false,
}) => {
  const [value, setValue] = useState(0);

  const handleImposedFeeInput = () => {
    setter({
      feeAmount: value,
      userId: userId,
      whichCalcualtor: whichCalcualtor,
    });
    setValue(0);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-end gap-2 pl-1">
        <Input.Wrapper id={userId + label} label={label} maw={320} mx="auto">
          <Input
            type="number"
            id={userId + label}
            onChange={(e) => setValue(e.target.valueAsNumber)}
            step={100}
            disabled={isDisabled}
          />
        </Input.Wrapper>
        <Button
          onClick={handleImposedFeeInput}
          className="w-[90%] rounded-md bg-brand p-2 px-4 font-orkneyBold text-dark hover:bg-yellow-400"
          type="submit"
          disabled={isDisabled}
        >
          Zmień prowizję
        </Button>
      </div>
    </>
  );
};

export const UserFeeFormField = ({
  user,
  isWorker = false,
}: UserFormFieldType) => {
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [changeDataModal, setChangeDataModal] = useState(false);

  const { mutate: setImposedFeeAmount } =
    api.userDataHandling.imposeTheFee.useMutation({
      onSuccess: () => window.location.reload(),
    });

  const { mutate: setFeePerKw } =
    api.userDataHandling.feePerKwChange.useMutation({
      onSuccess: () => window.location.reload(),
    });

  const { mutate: removeMenagerCalcDataPhotovoltaic } =
    api.pvMenagerRouter.remove.useMutation();
  const { mutate: removeMenagerHeatPumpJson } =
    api.heatPumpDataFlowRouter.removeMenagerData.useMutation();
  const { mutate: removeMenagerForCompanyJson } =
    api.forCompanyDataFlowRouter.removeMenagerData.useMutation();
  const { mutate: removeMenagerHeatHomeJson } =
    api.heatHomeDataFlowRouter.removeMenagerData.useMutation();
  const { mutate: removeMenagerAirConditionJson } =
    api.airCondMenagerData.remove.useMutation();
  const { mutate: removeMenagerCalcDataTurbines } =
    api.turbinesMenagerRouter.remove.useMutation();
  const { mutate: removeUserFromDb } =
    api.userDataHandling.removeUser.useMutation();

  const removeUser = () => {
    removeUserFromDb(user.id);
    if (user.role === 2 && user.name) {
      removeMenagerCalcDataPhotovoltaic(user.id);
      removeMenagerCalcDataTurbines(user.id);
      removeMenagerAirConditionJson(user.id);
      removeMenagerHeatPumpJson(user.name);
      removeMenagerForCompanyJson(user.name);
      removeMenagerHeatHomeJson(user.name);
    }
    setRemoveUserModal(false);
  };

  const handleRemoveUserModal = () => setRemoveUserModal(!removeUserModal);
  const handleChangeDataModal = () => setChangeDataModal(!changeDataModal);

  return (
    <div className="mt-3 flex gap-5 font-orkney">
      <div className="flex flex-col">
        <div className="my-2 w-96 ">
          <h2 className="font-orkneyBold text-2xl">
            {user.name} - {user.role === 2 ? "menager" : "handlowiec"}
          </h2>
          <div className="flex justify-end gap-5">
            <Button
              className="rounded-xl bg-red px-8 py-1 font-semibold text-dark duration-100 hover:bg-rose-400"
              onClick={handleRemoveUserModal}
            >
              Usuń
            </Button>
            {!isWorker && (
              <Button
                className="rounded-xl bg-green-500 px-8 py-1 font-semibold text-dark duration-100 hover:bg-green-400"
                onClick={handleChangeDataModal}
              >
                Edytuj
              </Button>
            )}
          </div>
        </div>
        <FeesTable user={user} />
      </div>

      {/* REMOVE USER MODAL */}
      <Modal
        opened={removeUserModal}
        onClose={handleRemoveUserModal}
        title={`CZY NA PEWNO CHCESZ USUNĄĆ UŻYTKOWNIKA ${user.name}`}
        className="text-center font-orkneyBold"
        centered
      >
        <p className="font-orkney">
          Będzie to skutkowało usunięciem konta użytkownika. Nie będzie miał on
          dostępu do kalkulatora.
          <br />
          {user.role === 2 &&
            "W przypadku usunięcia menagera jego stawki bazowe także zostaną usunięte."}
        </p>
        <div className="flex w-full justify-between p-4">
          <button
            onClick={handleRemoveUserModal}
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

      {/* CHANGE DATA MODAL */}

      <Modal
        opened={changeDataModal}
        onClose={handleChangeDataModal}
        title={`ZMIENIASZ DANE UŻYTKOWNIKA ${user.name}`}
        className="text-center font-orkneyBold"
        size={"xl"}
        centered
      >
        <div className="grid grid-cols-3 grid-rows-1 items-end gap-5">
          {CALCUALTOR_TYPES.map((calcualtor) => {
            return (
              <div className="my-5" key={calcualtor}>
                <InputWithSubmitButton
                  label={`Stała prowizja  
                    ${
                      calcualtor === "Photovoltaic"
                        ? "fotowoltaika"
                        : // : calcualtor === "ForCompany"
                        // ? "dla firm"
                        calcualtor === "HeatPump"
                        ? "pompy ciepła"
                        : // : calcualtor === "HeatHome"
                        // ? "ciepło właściwe"
                        calcualtor === "AirCondition"
                        ? "klimatyzacja"
                        : "turbiny"
                    }`}
                  userId={user.id}
                  setter={setImposedFeeAmount}
                  whichCalcualtor={calcualtor}
                />
                <InputWithSubmitButton
                  label={`
                  ${
                    calcualtor === "Photovoltaic"
                      ? "Prowizja od kW fotowoltaika"
                      : // : calcualtor === "ForCompany"
                      // ? "Prowizja od kW dla firm"
                      calcualtor === "HeatPump"
                      ? "Prowizja od kW pompy ciepła"
                      : // : calcualtor === "HeatHome"
                      // ? "Prowizja od M² ciepło właściwe"
                      calcualtor === "AirCondition"
                      ? ""
                      : "Prowizja od kW turbiny"
                  }`}
                  isDisabled={calcualtor == "AirCondition"}
                  userId={user.id}
                  setter={setFeePerKw}
                  whichCalcualtor={calcualtor}
                />
              </div>
            );
          })}
          <div className="col-span-2">
            <FeesTable user={user} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
