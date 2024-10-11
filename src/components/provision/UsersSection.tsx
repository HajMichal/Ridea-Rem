import { api } from "~/utils/api";
import { UserCard } from ".";

interface UsersSectionType {
  userId: string;
}
export const UsersSection = ({ userId }: UsersSectionType) => {
  const { data } = api.userDataHandling.getUsers.useQuery({ userId });
  if (!data) return;
  return (
    <div className="w-[95%] xl:w-[90%] xxl:w-[80%]">
      {data.map((menager, index) => {
        return <UserCard menager={menager} key={index} />;
      })}
    </div>
  );
};
