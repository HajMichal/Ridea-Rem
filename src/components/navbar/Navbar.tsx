import { useSession } from "next-auth/react";
import { IoIosMenu } from "react-icons/io";
import React from "react";
import { SelectComponent } from "../SelectComponent";
import useStore from "~/store";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { useRouter } from "next/router";
import { useHeatPump } from "~/hooks/useHeatPump";
import { useForCompany } from "~/hooks/useForCompany";
import { useHeatHome } from "~/hooks/useHeatHome";
import AuthShowcase from "../AuthShowcase";
import { CALCULATORS } from "~/constans/calculatorTypes";
import { LinkComponent } from "./LinkComponent";
import { DropdownMenu } from "../DropdownMenu";

const photovoltaicProvision = [
  "0",
  "100",
  "200",
  "300",
  "400",
  "500",
  "550",
  "600",
  "650",
  "700",
  "750",
  "800",
];
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

const Navbar = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const store = useStore();
  const { photovoltaicStore } = usePhotovoltaic();
  const { heatPumpStore } = useHeatPump();
  const { forCompanyStore } = useForCompany();
  const { heatHomeStore } = useHeatHome();

  const userRole = sessionData?.user.role;

  const dropDownComponents = [
    <LinkComponent
      key={1}
      href="/aktualnosci"
      title="AKTUALNOŚCI"
      notification
    />,
    <LinkComponent key={2} href="/pliki" title="PLIKI" />,
    <LinkComponent
      key={3}
      href="/edycja/prowizje"
      title="PROWIZJE"
      userRole={userRole}
      neededRole={1}
    />,
    <LinkComponent
      key={4}
      href="/stworz/konto"
      title="KONTA"
      userRole={userRole}
      neededRole={1}
    />,
    <LinkComponent
      key={5}
      href="/edycja/prowizje"
      title="PROWIZJE"
      userRole={userRole}
      neededRole={2}
    />,
    <LinkComponent
      key={6}
      href="/stworz/konto"
      title="KONTA"
      userRole={userRole}
      neededRole={2}
    />,
  ];

  return (
    <div className="h-fit w-full">
      <div className="flex h-[105px] w-full items-center justify-between gap-5 bg-white px-2 font-orkneyLight text-sm font-semibold">
        <div className="flex h-full w-full max-w-[800px] items-center justify-between gap-3 pl-10 text-center xl:justify-evenly xl:pl-0">
          <LinkComponent href="/kalkulator/fotowoltaika" title="KALKULACJA" />

          <div className="mt-1 hidden w-full gap-3 xl:flex">
            {dropDownComponents.map((navButton) => navButton)}
          </div>

          <DropdownMenu
            hide
            mainButtonTitle={<IoIosMenu className="mb-1 h-7 w-7" />}
            jsxData={dropDownComponents}
          />
        </div>
        {userRole === 1 && (
          <DropdownMenu mainButtonTitle="EDYCJA" contextData={CALCULATORS} />
        )}
        <div className="flex min-w-[350px] items-center gap-10">
          <div>
            {router.pathname === "/kalkulator/fotowoltaika" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updatePhotovoltaic("consultantMarkup", Number(e));
                }}
                value={photovoltaicStore.consultantMarkup}
                data={photovoltaicProvision}
              />
            )}
            {router.pathname === "/kalkulator/pompy_ciepla" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updateHeatPump("consultantMarkup", Number(e));
                }}
                value={heatPumpStore.consultantMarkup}
                data={consultantProvisionsData.slice(0, 6)}
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
