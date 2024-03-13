import { useSession } from "next-auth/react";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData]);
  return (
    <main className="m-0 grid h-screen max-h-screen w-screen grid-cols-4 overflow-hidden hover:cursor-pointer">
      <HomeTile
        url={"/kalkulator/cieplo_wlasciwe"}
        src={"/home/termomodernizacja.png"}
        iconSrc={"/home/icons/MagazynEnergiiIcon.svg"}
        color={"bg-[#00B4D8]"}
        title={"CIEPŁO"}
        subTitle={"WŁAŚCIWE"}
      />
      <HomeTile
        url={"/kalkulator/fotowoltaika"}
        iconSrc={"/home/icons/FotowoltaikaIcon.svg"}
        src={"/home/Fotowoltaika.png"}
        color={"bg-[#74B734]"}
        title={"PANELE"}
        subTitle={"FOTOWOLTAICZNE"}
      />
      <HomeTile
        url={"/kalkulator/pompy_ciepla"}
        src={"/home/Pompy_ciepla.png"}
        iconSrc={"/home/icons/PompaDoKalkulacji.svg"}
        color={"bg-[#731DD8]"}
        title={"POMPY"}
        subTitle={"CIEPŁA"}
      />
      <HomeTile
        url={"/kalkulator/fotowoltaika_firmy"}
        src={"/home/Foto_firm.png"}
        iconSrc={"/home/icons/FotowoltaikaIcon.svg"}
        color={"bg-[#FFE15D]"}
        title={"FOTOWOLTAIKA"}
        subTitle={"DLA FIRM"}
      />
    </main>
  );
}

interface HomeTileType {
  src: string;
  iconSrc: string;
  url: string;
  color: string;
  title: string;
  subTitle: string;
}
function HomeTile({ url, src, iconSrc, color, title, subTitle }: HomeTileType) {
  const router = useRouter();

  return (
    <div
      id="photovoltaic"
      className={`duration-100 hover:opacity-90 ${color}`}
      onClick={() => void router.push(url)}
    >
      <Image
        src={src}
        alt="Zdjęcie instalacjii"
        width={640}
        height={1080}
        className="h-3/4 w-full object-cover"
      />
      <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
        <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
          <Image
            src={iconSrc}
            alt="Logo"
            width={80}
            height={80}
            className="mb-1 h-14 w-14"
          />
          <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl">{title}</p>
          <p className="sm:text-md text-xs  md:text-xl lg:text-2xl">
            {subTitle}
          </p>
        </div>
        <div className="absolute bottom-10">
          <Image
            src={"/home/icons/KlikDoKalkulacji.svg"}
            alt="Logo"
            width={80}
            height={80}
            className="ml-10 h-7 w-7"
          />
          <p>STWÓRZ OFERTĘ</p>
        </div>
      </div>
    </div>
  );
}
