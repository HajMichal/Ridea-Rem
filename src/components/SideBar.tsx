import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface LinkComponentType {
  href: string;
  title: string;
  href2?: string;
  longWord?: boolean;
}

const SideBarButton = ({
  href,
  href2,
  title,
  longWord = false,
}: LinkComponentType) => {
  const { asPath } = useRouter();
  return (
    <Link
      href={href}
      className={`mt-20 flex h-full w-full -rotate-90 flex-wrap items-stretch justify-center text-center ${
        longWord && "mt-28"
      }`}
    >
      <p
        className={`${
          asPath === href || asPath === href2 ? "text-brand" : ""
        } whitespace-nowrap `}
      >
        {title}
      </p>
      <div
        className={
          asPath === href || asPath === href2
            ? "h-1 w-3/4 translate-y-[59px] bg-brand"
            : ""
        }
      ></div>
    </Link>
  );
};

export const SideBar = () => (
  <div className="flex h-full max-h-screen min-h-screen w-auto flex-col justify-between gap-3  bg-[#191918] font-orkney">
    <Link className="mt-3 flex w-full justify-center" href={"/home"}>
      <Image
        src={"/logo_solo_yellowSun.svg"}
        width={180}
        height={180}
        alt="Logo"
        priority
        className="w-full max-w-[70px]"
      ></Image>
    </Link>
    <div className="-mt-36 flex h-full w-full min-w-[145px] flex-col gap-6 text-white ">
      <SideBarButton
        href="/kalkulator/fotowoltaika"
        href2="/edycja/daneFotowoltaiki"
        title="FOTOWOLTAIKA"
      />
      <SideBarButton
        href="/kalkulator/fotowoltaika_firmy"
        href2="/edycja/daneFotowoltaiki_firmy"
        title="DLA FIRM"
      />
      <SideBarButton
        href="/kalkulator/pompy_ciepla"
        href2="/edycja/danePompyCiepla"
        title="POMPY CIEPŁA"
      />
      {/* <SideBarButton
        href="/kalkulator/magazyn_energii"
        href2="/edycja/daneMagazynEnergii"
        title="MAGAZYN ENERGII"
        longWord
      /> */}
    </div>
    <div className="m-3 text-center text-xs text-white">
      <p>IDEA REM </p>
      <p>© 2023 </p>
    </div>
  </div>
);
