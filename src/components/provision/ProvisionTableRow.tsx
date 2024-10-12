import { useClickOutside } from "@mantine/hooks";
import { BsDatabaseFillCheck } from "react-icons/bs";
import {
  type ChangeEvent,
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useState,
} from "react";
import { avivableProvision } from "./CardBody";
import type { DataToProvisionEdit } from "./types";

interface ProvisionTableRowType {
  provision: string;
  currentProvisionAmount: number;
  btnRef: RefObject<HTMLButtonElement>;
  setEditData: Dispatch<SetStateAction<DataToProvisionEdit>>;
}

export const ProvisionTableRow = ({
  provision,
  currentProvisionAmount,
  btnRef,
  setEditData,
}: ProvisionTableRowType) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditData({
      provisionAmount: e.target.valueAsNumber,
      provisionName: provision,
    });
  };

  return (
    <div className="flex justify-between hover:cursor-pointer" ref={ref}>
      <p className="flex items-center text-lg" onClick={() => setIsOpen(true)}>
        {avivableProvision[provision]}:
      </p>
      {isOpen ? (
        <div className="flex h-9 w-28 items-center gap-2">
          <input
            type="number"
            step={100}
            placeholder={currentProvisionAmount.toString()}
            onChange={onChange}
            className="ml-2 h-8 w-20 rounded-lg p-1 focus:outline-none"
          />
          <button ref={btnRef} onClick={() => setIsOpen(false)}>
            <BsDatabaseFillCheck size={"25px"} color="green" />
          </button>
        </div>
      ) : (
        <p
          className="flex h-9 w-28 items-center pl-2 text-left font-orkneyBold text-lg"
          onClick={() => setIsOpen(true)}
        >
          {currentProvisionAmount}
        </p>
      )}
    </div>
  );
};
