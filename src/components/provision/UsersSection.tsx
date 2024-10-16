import { api } from "~/utils/api";
import { UserCard } from ".";
import type { UserProvisionType } from "./types";

interface UsersSectionType {
  userId: string | undefined;
}
export const UsersSection = ({ userId }: UsersSectionType) => {
  if (!userId) return;
  const { data } = api.userDataHandling.getUsers.useQuery({ userId });

  return (
    <div className="w-[95%] xl:w-[90%] xxl:w-[80%]">
      {data?.map((user: UserProvisionType, index) => {
        return <UserCard user={user} key={index} />;
      })}
    </div>
  );
};
