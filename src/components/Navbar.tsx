import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { SelectComponent } from "./SelectComponent";
import useStore from "~/store";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { useRouter } from "next/router";
import { useHeatPump } from "~/hooks/useHeatPump";
import { useForCompany } from "~/hooks/useForCompany";
import { useHeatHome } from "~/hooks/useHeatHome";
import AuthShowcase from "./AuthShowcase";

interface LinkComponentType {
  href: string;
  title: string;
  notification?: boolean;
}

const consultantProvisionsData = [
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
];
const heatHomeProvisionData = [
  { value: "0", label: "0" },
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
  { value: "25", label: "25" },
  { value: "30", label: "30" },
  { value: "35", label: "35" },
  { value: "40", label: "40" },
  { value: "45", label: "45" },
  { value: "50", label: "50" },
];

const LinkComponent = ({
  href,
  title,
  notification = false,
}: LinkComponentType) => {
  return (
    <div className="group -mb-1">
      {notification && (
        <span className="absolute top-10 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
        </span>
      )}
      <div className="flex h-[60%] items-center text-dark laptop:px-4">
        <Link href={href}>{title}</Link>
      </div>

      <span className="mt-1 block h-[2px] w-full max-w-0 bg-brand transition-all duration-500 group-hover:max-w-full"></span>
    </div>
  );
};

const Navbar = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const store = useStore();
  const { photovoltaicStore } = usePhotovoltaic();
  const { heatPumpStore } = useHeatPump();
  const { forCompanyStore } = useForCompany();
  const { heatHomeStore } = useHeatHome();
  return (
    <div className="h-fit w-full">
      <div className="flex h-[105px] w-full items-center justify-between gap-5 bg-white px-2 font-orkneyLight text-sm font-semibold">
        <div className="flex h-full w-full max-w-[800px] items-center justify-evenly gap-3 text-center laptop:gap-0 ">
          <LinkComponent href="/kalkulator/fotowoltaika" title="KALKULACJA" />

          <LinkComponent href="/aktualnosci" title="AKTUALNOŚCI" notification />

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
            )) ||
            (router.pathname === "/kalkulator/cieplo_wlasciwe" && (
              <LinkComponent
                href="/edycja/daneCieploWlasciwe"
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
                data={consultantProvisionsData}
              />
            )}
            {router.pathname === "/kalkulator/pompy_ciepla" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updateHeatPump("consultantMarkup", Number(e));
                }}
                value={heatPumpStore.consultantMarkup}
                data={consultantProvisionsData}
              />
            )}
            {router.pathname === "/kalkulator/fotowoltaika_firmy" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updateForCompany("consultantMarkup", Number(e));
                }}
                value={forCompanyStore.consultantMarkup}
                data={consultantProvisionsData}
              />
            )}
            {router.pathname === "/kalkulator/cieplo_wlasciwe" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updateHeatHome("consultantMarkup", Number(e));
                }}
                value={heatHomeStore.consultantMarkup}
                data={heatHomeProvisionData}
              />
            )}
          </div>
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
