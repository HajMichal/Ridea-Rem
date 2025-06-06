import { roleNameMapping } from "./UserCard";
import { useRef, useState } from "react";
import { api } from "~/utils/api";

import toast from "react-hot-toast";
import { ProvisionTableRow, RemoveUser } from ".";
import type {
  DataToProvisionEdit,
  FeesNames,
  UserProvisionType,
} from "./types";

interface CardBodyType {
  user: UserProvisionType;
  close: () => void;
}

export const CardBody = ({ user, close }: CardBodyType) => {
  const [editData, setEditData] = useState<DataToProvisionEdit>({
    provisionAmount: 0,
    provisionName: "",
  });

  const btnRef = useRef<HTMLButtonElement>(null);
  const utils = api.useUtils();

  const { mutate: editProvision } =
    api.userDataHandling.editProvision.useMutation({
      onSuccess: () => {
        toast.success("PROWIZJA ZOSTAŁA ZMIENIONA");
        void utils.userDataHandling.getUsers.invalidate();
      },
    });

  if (btnRef.current)
    btnRef.current.onclick = () =>
      editProvision({ ...editData, userId: user.id });
  return (
    // THIS two layers of <div />'s are necessary because above is <Collapse />
    // component from mantine and it's complicated to edit built in styles
    <div className="flex w-full justify-center">
      <div className="flex w-[90%] justify-between rounded-3xl bg-[#d6d6d6] p-6">
        <div className="hidden flex-col justify-center xl:flex">
          <h2 className="font-orkneyBold text-3xl">
            {roleNameMapping[user.role]}
          </h2>
          <h2 className="text-center text-xl">{user.name}</h2>
        </div>
        <div>
          {Object.keys(avivableProvision).map((provision) => {
            return (
              <ProvisionTableRow
                key={provision}
                btnRef={btnRef}
                setEditData={setEditData}
                currentProvisionAmount={user[provision as FeesNames]}
                provision={provision}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-center">
          <RemoveUser user={user} close={close} />
        </div>
      </div>
    </div>
  );
};

export const avivableProvision: Record<string, string> = {
  imposedFeePhotovoltaic: "Stała prowizja fotowoltaiki",
  feePerkwPhotovoltaic: "Prowizja od kW fotowoltaiki",
  //   imposedFeeForCompany: "Stała prowizja dla firm",
  //   feePerkwForCompany: "Prowizja od kW dla firm",
  imposedFeeHeatPump: "Stała prowizja pompy ciepła",
  feePerkwHeatPump: "Prowizja od kW pompy ciepła",
  //   imposedFeeHeatHome: "Stała prowizja ciepło właściwe",
  //   feePerkwHeatHome: "Prowizja od M² ciepło właściwe",
  imposedFeeAirCondition: "Stała prowizja klimatyzacja",
  feePerkwTurbines: "Prowizja od szt turbiny",
  imposedFeeTurbines: "Stała prowizja turbiny",
};
