import type { UserProvisionType } from "./types";
import { roleNameMapping } from "./UserCard";
import { RiArrowLeftSLine } from "react-icons/ri";

interface CardHeaderType {
  user: UserProvisionType;
  opened: boolean;
  toggle: () => void;
}
export const CardHeader = ({ user, opened, toggle }: CardHeaderType) => {
  return (
    <div
      className="my-2 flex w-full justify-between rounded-full bg-[#d6d6d6] p-2 px-6 hover:cursor-pointer xl:px-10"
      onClick={toggle}
    >
      <h2 className="font-orkneyBold xl:text-xl">
        {roleNameMapping[user.role]}
      </h2>
      <h3 className="xl:text-xl">{user.name}</h3>
      <div className="flex gap-5 xl:gap-10">
        <h4 className="xl:text-xl">{user.city || "NIE PODANO"}</h4>
        <button>
          <RiArrowLeftSLine
            size={"28px"}
            className={`duration-200 ${opened && "-rotate-90"}`}
          />
        </button>
      </div>
    </div>
  );
};
