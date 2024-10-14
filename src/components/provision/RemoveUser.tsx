import { Modal } from "@mantine/core";
import { useState } from "react";
import { api } from "~/utils/api";
import type { UserProvisionType } from "./types";
import toast from "react-hot-toast";

interface RemoveUserType {
  user: UserProvisionType;
}
export const RemoveUser = ({ user }: RemoveUserType) => {
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const handleRemoveUserModal = () => setRemoveUserModal(!removeUserModal);

  const utils = api.useUtils();

  const { mutate: removeUserFromDb } =
    api.userDataHandling.removeUser.useMutation({
      onSuccess: () => {
        toast.success("UŻYTKOWNIK ZOSTAŁ USUNIĘTY ✅");
        void utils.userDataHandling.getUsers.invalidate();
        setRemoveUserModal(false);
      },
    });

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
  };

  return (
    <>
      <button
        onClick={() => setRemoveUserModal(true)}
        className="h-10 rounded-full bg-red p-2 px-5 font-orkneyBold"
      >
        USUŃ
      </button>

      <Modal
        opened={removeUserModal}
        onClose={handleRemoveUserModal}
        title={`Czy na pewno chcesz usunąć: ${user.name}`}
        className="text-center font-orkneyBold"
        centered
      >
        <p>
          Będzie to skutkowało usunięciem konta użytkownika. Nie będzie miał on
          dostępu do kalkulatora.
          <br />
          {user.role === 2 &&
            "W przypadku usunięcia menagera jego stawki bazowe także zostaną usunięte."}
        </p>
        <div className="flex w-full justify-between p-4">
          <button
            onClick={handleRemoveUserModal}
            className="rounded-2xl bg-red p-2 px-4 font-semibold duration-100 hover:scale-110"
          >
            ANULUJ
          </button>
          <button
            onClick={removeUser}
            className="rounded-2xl bg-brand p-2 px-4 font-semibold duration-100 hover:scale-110"
          >
            TAK
          </button>
        </div>
      </Modal>
    </>
  );
};
