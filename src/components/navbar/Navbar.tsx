import { useSession } from "next-auth/react";
import { IoIosMenu } from "react-icons/io";
import React, { memo } from "react";
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
import { useAirCondition } from "~/hooks/useAirCondition";
import { useTurbines } from "~/hooks/useTurbines";
import { InputComponent } from "../InputComponent";

const consultantProvisionsData = [
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
  "850",
  "900",
  "950",
  "1000",
];
const heatHomeProvisionData = [
  "0",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
];
const airCondtitionProvisionData = ["0", "500", "1000", "1500", "2000"];

export const Navbar = memo(function Navbar() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const store = useStore();
  const { photovoltaicStore } = usePhotovoltaic();
  const { heatPumpStore } = useHeatPump();
  const { forCompanyStore } = useForCompany();
  const { heatHomeStore } = useHeatHome();
  const { airConditionStore } = useAirCondition();
  const { turbinesStore } = useTurbines();

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
              <InputComponent
                title="POZIOM"
                step={100}
                smallField
                onChange={(e) => {
                  let value = e.target.valueAsNumber;
                  if (Number.isNaN(value)) value = 0;

                  store.updatePhotovoltaic("consultantMarkup", value);
                }}
                value={photovoltaicStore.consultantMarkup}
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
            {router.pathname === "/kalkulator/klimatyzacja" && (
              <SelectComponent
                title="POZIOM"
                onChange={(e) => {
                  store.updateAirCondition("consultantMarkup", Number(e));
                }}
                value={airConditionStore.consultantMarkup}
                data={airCondtitionProvisionData}
              />
            )}
            {router.pathname === "/kalkulator/turbiny" && (
              <InputComponent
                title="POZIOM"
                step={100}
                smallField
                onChange={(e) => {
                  let value = e.target.valueAsNumber;
                  if (Number.isNaN(value)) value = 0;

                  store.updateTurbines("consultantMarkup", value);
                }}
                value={turbinesStore.consultantMarkup}
              />
            )}
          </div>
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
});
