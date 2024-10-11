import { Button, Input, Modal } from "@mantine/core";
import { type MenagerType, roleNameMapping } from "./UserCard";
import { useState } from "react";
import { api } from "~/utils/api";
import { CALCUALTOR_TYPES } from "~/constans/calculatorTypes";

interface CardBodyType {
  menager: MenagerType;
}

export const CardBody = ({ menager }: CardBodyType) => {
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [changeDataModal, setChangeDataModal] = useState(false);

  const handleRemoveUserModal = () => setRemoveUserModal(!removeUserModal);
  const handleChangeDataModal = () => setChangeDataModal(!changeDataModal);

  const ctx = api.useContext();

  const { mutate: removeMenagerCalcDataPhotovoltaic } =
    api.pvMenagerRouter.remove.useMutation();
  const { mutate: removeMenagerHeatPumpJson } =
    api.heatPumpDataFlowRouter.remove.useMutation();
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
    removeUserFromDb(menager.id);
    if (menager.role === 2 && menager.name) {
      removeMenagerCalcDataPhotovoltaic(menager.id);
      removeMenagerCalcDataTurbines(menager.id);
      removeMenagerAirConditionJson(menager.id);
      removeMenagerHeatPumpJson(menager.name);
      removeMenagerForCompanyJson(menager.name);
      removeMenagerHeatHomeJson(menager.name);
    }
  };

  const { mutate: setImposedFeeAmount } =
    api.userDataHandling.imposeFee.useMutation({
      onSuccess: () => void ctx.userDataHandling.getUsers.invalidate(),
    });

  const { mutate: setFeePerKw } =
    api.userDataHandling.feePerKwChange.useMutation({
      onSuccess: () => void ctx.userDataHandling.getUsers.invalidate(),
    });

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[90%] justify-between rounded-3xl bg-[#d6d6d6] p-6">
        <div className="hidden flex-col justify-center xl:flex">
          <h2 className="font-orkneyBold text-3xl">
            {roleNameMapping[menager.role]}
          </h2>
          <h2 className="text-center text-xl">{menager.name}</h2>
        </div>
        <div>
          {Object.keys(avivableProvision).map((provision) => {
            return (
              <div key={provision} className="flex justify-between gap-4">
                <p>{avivableProvision[provision]}:</p>
                <p className="w-12 text-left font-orkneyBold text-lg">
                  {menager[provision as FeesNames]}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center gap-5">
          <button
            onClick={() => setChangeDataModal(true)}
            className="rounded-full bg-brand p-2 px-5 font-orkneyBold"
          >
            EDYTUJ
          </button>
          {/* CHANGE DATA MODAL */}

          <Modal
            opened={changeDataModal}
            onClose={handleChangeDataModal}
            title={`Zmieniasz dane użytkownika: ${menager.name}`}
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
                      userId={menager.id}
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
                      userId={menager.id}
                      setter={setFeePerKw}
                      whichCalcualtor={calcualtor}
                    />
                  </div>
                );
              })}
            </div>
          </Modal>

          <button
            onClick={() => setRemoveUserModal(true)}
            className="rounded-full bg-red p-2 px-5 font-orkneyBold"
          >
            USUŃ
          </button>
          {/* REMOVE USER MODAL */}
          <Modal
            opened={removeUserModal}
            onClose={handleRemoveUserModal}
            title={`Czy na pewno chcesz usunąć: ${menager.name}`}
            className="text-center font-orkneyBold"
            centered
          >
            <p className="font-orkney">
              Będzie to skutkowało usunięciem konta użytkownika. Nie będzie miał
              on dostępu do kalkulatora.
              <br />
              {menager.role === 2 &&
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
        </div>
      </div>
    </div>
  );
};

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
            value={value}
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

type FeesNames =
  | "imposedFeePhotovoltaic"
  | "feePerkwPhotovoltaic"
  | "imposedFeeForCompany"
  | "feePerkwForCompany"
  | "imposedFeeHeatPump"
  | "feePerkwHeatPump"
  | "imposedFeeHeatHome"
  | "feePerkwHeatHome"
  | "imposedFeeAirCondition"
  | "feePerkwTurbines"
  | "imposedFeeTurbines";

const avivableProvision: Record<string, string> = {
  imposedFeePhotovoltaic: "Stała prowizja fotowoltaiki",
  feePerkwPhotovoltaic: "Prowizja od kW fotowoltaiki",
  //   imposedFeeForCompany: "Stała prowizja dla firm",
  //   feePerkwForCompany: "Prowizja od kW dla firm",
  imposedFeeHeatPump: "Stała prowizja pompy ciepła",
  feePerkwHeatPump: "Prowizja od kW pompy ciepła",
  //   imposedFeeHeatHome: "Stała prowizja ciepło właściwe",
  //   feePerkwHeatHome: "Prowizja od M² ciepło właściwe",
  imposedFeeAirCondition: "Stała prowizja klimatyzacja",
  feePerkwTurbines: "Prowizja od kW turbiny",
  imposedFeeTurbines: "Stała prowizja turbiny",
};
