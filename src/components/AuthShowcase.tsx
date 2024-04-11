import { Menu, rem } from "@mantine/core";
import { useSession, signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

export default function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <button>
            {sessionData && (
              <div className="flex gap-1">
                <FaUserCircle className="h-[40px] w-[40px]" />
                <div className="flex max-w-[150px] flex-wrap font-orkneyLight font-semibold text-dark">
                  <p className="min-w-[130px] text-left text-sm">
                    {sessionData.user.name?.toUpperCase()}
                  </p>
                  <p className="text-xs">
                    {sessionData.user.role === 1 && "ADMINISTRATOR"}
                    {sessionData.user.role === 2 && "MENAGER"}
                    {sessionData.user.role === 3 && "HANDLOWIEC"}
                  </p>
                </div>
              </div>
            )}
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Konto</Menu.Label>
          <Menu.Item
            onClick={() =>
              void signOut({
                redirect: true,
                callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}auth/signin`,
              })
            }
            rightSection={
              <BiLogOut style={{ width: rem(20), height: rem(20) }} />
            }
          >
            Wyloguj się
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
