import { type User } from "@prisma/client";

export const FeesTable = ({ user }: { user: User }) => {
  return (
    <div className="rounded-lg border-2 border-black p-3 ">
      <div className="flex justify-between">
        <p>Stała prowizja fotowoltaiki</p> <p>{user.imposedFeePhotovoltaic}</p>
      </div>
      <div className="flex justify-between">
        <p>Prowizja od kW fotowoltaiki</p> <p>{user.feePerkwPhotovoltaic}</p>
      </div>
      {/* <div className="flex justify-between">
        <p>Stała prowizja dla firm</p> <p>{user.imposedFeeForCompany}</p>
      </div>
      <div className="flex justify-between">
        <p>Prowizja od kW dla firm</p> <p>{user.feePerkwForCompany}</p>
      </div> */}
      <div className="flex justify-between">
        <p>Stała prowizja pompy ciepła</p> <p>{user.imposedFeeHeatPump}</p>
      </div>
      <div className="flex justify-between">
        <p>Prowizja od kW pompy ciepła</p> <p>{user.feePerkwHeatPump}</p>
      </div>
      {/* <div className="flex justify-between">
        <p>Stała prowizja ciepło właściwe</p> <p>{user.imposedFeeHeatHome}</p>
      </div>
      <div className="flex justify-between">
        <p>Prowizja od M² ciepło właściwe</p> <p>{user.feePerkwHeatHome}</p>
      </div> */}
      <div className="flex justify-between">
        <p>Stała prowizja klimatyzacja</p> <p>{user.imposedFeeAirCondition}</p>
      </div>
      <div className="flex justify-between">
        <p>Prowizja od kW turbiny</p> <p>{user.feePerkwTurbines}</p>
      </div>
      <div className="flex justify-between">
        <p>Stała prowizja turbiny</p> <p>{user.imposedFeeTurbines}</p>
      </div>
    </div>
  );
};
