import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface LinkComponentType {
  href: string;
  title: string;
  href2?: string;
}

const SideBarButton = ({ href, href2, title }: LinkComponentType) => {
  const { asPath } = useRouter();
  const validator = asPath === href || asPath === href2;
  return (
    <Link
      href={href}
      className={`mt-5 flex h-full w-60 flex-wrap items-stretch gap-1 px-3 duration-300 hover:translate-x-3`}
    >
      <span className={`h-5 w-1 bg-brand ${!validator && "hidden"}`} />
      <h3 className={`${validator ? "text-brand" : ""} tracking-wide`}>
        {title}
      </h3>
    </Link>
  );
};

export const SideBar = memo(function SideBar() {
  return (
    <div className="flex h-full max-h-screen min-h-screen w-auto flex-col justify-between gap-3 bg-[#191918] font-orkney">
      <Link className="mt-[30px] flex w-full justify-center" href={"/home"}>
        <Image
          src={"/icons/newLogoGreen.svg"}
          width={180}
          height={180}
          alt="Logo"
          loading="eager"
          className="w-full max-w-[160px]"
        ></Image>
      </Link>
      <div className="-mt-36 flex h-full w-full min-w-[145px] flex-col justify-start gap-6 text-white">
        <SideBarButton
          href="/kalkulator/fotowoltaika"
          href2="/edycja/daneFotowoltaiki"
          title="FOTOWOLTAIKA"
        />
        {/* <SideBarButton
          href="/kalkulator/fotowoltaika_firmy"
          href2="/edycja/daneFotowoltaiki_firmy"
          title="DLA FIRM"
        /> */}
        <SideBarButton
          href="/kalkulator/pompy_ciepla"
          href2="/edycja/danePompyCiepla"
          title="POMPY CIEPŁA"
        />
        {/* <SideBarButton
          href="/kalkulator/cieplo_wlasciwe"
          href2="/edycja/daneCieploWlasciwe"
          title="TERMOMODERNIZACJA"
        /> */}
        <SideBarButton
          href="/kalkulator/klimatyzacja"
          href2="/edycja/daneKlimatyzacja"
          title="KLIMATYZACJA"
        />
        <SideBarButton
          href="/kalkulator/turbiny"
          href2="/edycja/daneTurbiny"
          title="TURBINY"
        />
        {/* <SideBarButton
          href="/kalkulator/kotly"
          href2="/edycja/daneKotlyPelletowe"
          title="KOTŁY PELLETOWE"
        />
        <SideBarButton
          href="/kalkulator/okna"
          href2="/edycja/daneOkna"
          title="OKNA"
        /> */}
      </div>
      <div className="m-3 text-center text-xs text-white">
        <p>Przyjazna Natura</p>
        <p>© 2024 </p>
      </div>
    </div>
  );
});
