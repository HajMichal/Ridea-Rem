import { useSession } from "next-auth/react";
import { IoIosMenu } from "react-icons/io";
import React, { memo } from "react";
import useStore from "~/store";
import AuthShowcase from "../AuthShowcase";
import { CALCULATORS } from "~/constans/calculatorTypes";
import { LinkComponent } from "./LinkComponent";
import { DropdownMenu } from "../DropdownMenu";
import { InputComponent } from "../InputComponent";
import { Switch } from "@mantine/core";

export const Navbar = memo(function Navbar() {
  const { data: sessionData } = useSession();
  const store = useStore();

  const userRole = sessionData?.user.role;

  const dropDownComponents = [
    <LinkComponent key={1} href="/aktualnosci" title="AKTUALNOŚCI" />,
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
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center justify-center">
            <Switch
              size="lg"
              onLabel="UoZ"
              offLabel="B2B"
              className="font-orkneyBold"
              checked={store.hasContract}
              onChange={(e) => store.setHasContract(e.currentTarget.checked)}
            />

            <InputComponent
              title="POZIOM"
              step={100}
              smallField
              onChange={(e) => {
                let value = e.target.valueAsNumber;
                if (Number.isNaN(value)) value = 0;

                store.setMarkup(value);
              }}
              value={store.markupAmount}
              extraSmallField
            />
          </div>
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
});
