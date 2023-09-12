import { useState } from "react";
import { type User } from "@prisma/client";
import { type MenagerType } from "~/pages/edycja/prowizje";

interface UserFormFieldType {
  user: MenagerType | User;
  isWorker?: boolean;
}

export const UserFeeFormField = ({
  user,
  isWorker = false,
}: UserFormFieldType) => {
  const [value, setValue] = useState(0);
  const handleInputValue = () => {
    setValue(0);
  };

  return (
    <div className="flex flex-wrap items-center gap-5  font-orkney">
      <div>
        <h2>
          {user.name} - {user.role === 2 ? "menager" : "handlowiec"}
        </h2>
        <p>Wysokość prowizji {user.imposedFee}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <input
          type="number"
          className="border border-dark pl-1"
          onChange={(e) => setValue(e.target.valueAsNumber)}
          step={100}
        />

        {isWorker && (
          <button
            onClick={() => handleInputValue()}
            className="rounded-xl bg-brand p-2 px-4 font-orkneyBold text-dark"
            type="submit"
          >
            Zmień prowizję
          </button>
        )}
      </div>
    </div>
  );
};
