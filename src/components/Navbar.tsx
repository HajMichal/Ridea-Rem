import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { SelectComponent } from "./SelectComponent";
import useStore from "~/store";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { useRouter } from "next/router";
import { useHeatPump } from "~/hooks/useHeatPump";
import { Menu, rem } from "@mantine/core";
import { BiLogOut } from "react-icons/bi";
import { useForCompany } from "~/hooks/useForCompany";

interface LinkComponentType {
  href: string;
  title: string;
}

const LinkComponent = ({ href, title }: LinkComponentType) => {
  return (
    <div className="group -mb-1">
      <div className="flex h-[60%] items-center text-dark laptop:px-4">
        <Link href={href}>{title}</Link>
      </div>
      <span className="mt-1 block h-[2px] w-full max-w-0 bg-brand transition-all duration-500 group-hover:max-w-full"></span>
    </div>
  );
};

export const Navbar = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const store = useStore();
  const { photovoltaicStore } = usePhotovoltaic();
  const { heatPumpStore } = useHeatPump();
  const { forCompanyStore } = useForCompany();
  return (
    <div className="h-fit w-full">
      <div className="flex h-[105px] w-full items-center justify-between gap-5 bg-white px-2 font-orkneyLight text-sm font-semibold">
        <div className="flex h-full w-full max-w-[800px] items-center justify-evenly gap-3 text-center laptop:gap-0 ">
          <LinkComponent href="/kalkulator/fotowoltaika" title="KALKULACJA" />
          <LinkComponent href="/aktualnosci" title="AKTUALNOŚCI" />
          {(sessionData?.user.role === 1 &&
            router.pathname === "/kalkulator/fotowoltaika" && (
              <LinkComponent
                href="/edycja/daneFotowoltaiki"
                title="EDYCJA DANYCH"
              />
            )) ||
            (router.pathname === "/kalkulator/pompy_ciepla" && (
              <LinkComponent
                href="/edycja/danePompyCiepla"
                title="EDYCJA DANYCH"
              />
            )) ||
            (router.pathname === "/kalkulator/fotowoltaika_firmy" && (
              <LinkComponent
                href="/edycja/daneFotowoltaiki_firmy"
                title="EDYCJA DANYCH"
              />
            ))}
          {sessionData?.user.role === 2 || sessionData?.user.role === 1 ? (
            <LinkComponent href="/edycja/prowizje" title="PROWIZJE" />
          ) : (
            ""
          )}
          {!(sessionData?.user.role === 3) && (
            <LinkComponent href="/stworz/konto" title="KONTA" />
          )}
        </div>
        <div className="flex items-center gap-10">
          <div>
            {router.pathname === "/kalkulator/fotowoltaika" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updatePhotovoltaic("consultantMarkup", Number(e));
                }}
                value={photovoltaicStore.consultantMarkup}
                data={[
                  { value: "0", label: "0" },
                  { value: "100", label: "100" },
                  { value: "200", label: "200" },
                  { value: "300", label: "300" },
                  { value: "400", label: "400" },
                  { value: "500", label: "500" },
                  { value: "550", label: "550" },
                  { value: "600", label: "600" },
                  { value: "650", label: "650" },
                  { value: "700", label: "700" },
                  { value: "750", label: "750" },
                  { value: "800", label: "800" },
                  { value: "850", label: "850" },
                  { value: "900", label: "900" },
                  { value: "950", label: "950" },
                  { value: "1000", label: "1000" },
                ]}
              />
            )}
            {router.pathname === "/kalkulator/pompy_ciepla" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updateHeatPump("consultantMarkup", Number(e));
                }}
                value={heatPumpStore.consultantMarkup}
                data={[
                  { value: "0", label: "0" },
                  { value: "100", label: "100" },
                  { value: "200", label: "200" },
                  { value: "300", label: "300" },
                  { value: "400", label: "400" },
                  { value: "500", label: "500" },
                  { value: "550", label: "550" },
                  { value: "600", label: "600" },
                  { value: "650", label: "650" },
                  { value: "700", label: "700" },
                  { value: "750", label: "750" },
                  { value: "800", label: "800" },
                  { value: "850", label: "850" },
                  { value: "900", label: "900" },
                  { value: "950", label: "950" },
                  { value: "1000", label: "1000" },
                ]}
              />
            )}
            {router.pathname === "/kalkulator/fotowoltaika_firmy" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updateForCompany("consultantMarkup", Number(e));
                }}
                value={forCompanyStore.consultantMarkup}
                data={[
                  { value: "0", label: "0" },
                  { value: "100", label: "100" },
                  { value: "200", label: "200" },
                  { value: "300", label: "300" },
                  { value: "400", label: "400" },
                  { value: "500", label: "500" },
                  { value: "550", label: "550" },
                  { value: "600", label: "600" },
                  { value: "650", label: "650" },
                  { value: "700", label: "700" },
                  { value: "750", label: "750" },
                  { value: "800", label: "800" },
                  { value: "850", label: "850" },
                  { value: "900", label: "900" },
                  { value: "950", label: "950" },
                  { value: "1000", label: "1000" },
                ]}
              />
            )}
          </div>
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
};

function AuthShowcase() {
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
            onClick={() => void signOut()}
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
