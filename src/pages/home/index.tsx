import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
    // <main className="grid h-screen w-screen grid-cols-2 grid-rows-2 gap-4 bg-dark font-orkney">
    //   <div className="border-b-2 border-r-2 border-white bg-white">
    //     <div
    //
    //       className="h-full w-full  bg-[url('/Fotowoltaika.png')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
    //     ></div>
    //   </div>
    //   <div className="border-b-2 border-l-2 border-white bg-white">
    //     <div
    //
    //       className="h-full w-full bg-[url('/Foto_firm.png')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
    //     ></div>
    //   </div>
    //   <div className="border-r-2 border-t-2 border-white bg-white">
    //     <div
    //
    //       className="h-full w-full -scale-x-100 bg-[url('/Magazyn_energii.png')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
    //     ></div>
    //   </div>
    //   <div className="border-l-2 border-t-2 border-white bg-white">
    //     <div
    //
    //       className="h-full w-full bg-[url('/Pompy_ciepla.png')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
    //     ></div>
    //   </div>
    // </main>
    <main className="grid h-screen w-screen grid-cols-4 overflow-hidden hover:cursor-pointer">
      <div
        id="energyStore"
        className="bg-[#00B4D8] duration-100 hover:opacity-90"
        onClick={() => void router.push("/kalkulator/magazyn_energii")}
      >
        <Image
          src={"/Magazyn_energii.png"}
          alt="Zdjęcie instalacjii"
          width={640}
          height={1080}
          className="h-3/4 object-cover"
        />

        <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
          <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
            <Image
              src={"/MagazynEnergiiIcon.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="mb-1 h-14 w-14"
            />
            <p className="text-3xl">MAGAZYNY </p>
            <p>ENERGII</p>
          </div>
          <Image
            src={"/KlikDoKalkulacji.svg"}
            alt="Logo"
            width={80}
            height={80}
            className="h-7 w-7"
          />
          <p>STWÓRZ OFERTĘ</p>
        </div>
      </div>
      <div
        id="photovoltaic"
        className="bg-[#74B734] duration-100 hover:opacity-90"
        onClick={() => void router.push("/kalkulator/fotowoltaika")}
      >
        <Image
          src={"/Fotowoltaika.png"}
          alt="Zdjęcie instalacjii"
          width={640}
          height={1080}
          className="h-3/4 object-cover"
        />
        <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
          <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
            <Image
              src={"/FotowoltaikaIcon.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="mb-1 h-14 w-14"
            />
            <p className="text-3xl">PANELE </p>
            <p>FOTOWOLTAICZNE</p>
          </div>
          <Image
            src={"/KlikDoKalkulacji.svg"}
            alt="Logo"
            width={80}
            height={80}
            className="h-7 w-7"
          />
          <p>STWÓRZ OFERTĘ</p>
        </div>
      </div>
      <div
        id="heatPump"
        className="bg-[#731DD8] duration-100 hover:opacity-90"
        onClick={() => void router.push("/kalkulator/pompy_ciepla")}
      >
        <Image
          src={"/Pompy_ciepla.png"}
          alt="Zdjęcie instalacjii"
          width={480}
          height={920}
          className="h-3/4 object-cover"
        />
        <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
          <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
            <Image
              src={"/PompaDoKalkulacji.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="mb-1 h-14 w-14"
            />
            <p className="text-3xl">POMPY</p>
            <p>CIEPŁA</p>
          </div>
          <Image
            src={"/KlikDoKalkulacji.svg"}
            alt="Logo"
            width={80}
            height={80}
            className="h-7 w-7"
          />
          <p>STWÓRZ OFERTĘ</p>
        </div>
      </div>
      <div
        id="photovoltaicForCompany"
        className="bg-[#FFE15D] duration-100 hover:opacity-90"
        onClick={() => void router.push("/kalkulator/fotowoltaika_firmy")}
      >
        <Image
          src={"/Foto_firm.png"}
          alt="Zdjęcie instalacjii"
          width={640}
          height={1080}
          className="h-3/4 object-cover"
        />
        <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
          <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
            <Image
              src={"/FotowoltaikaIcon.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="mb-1 h-14 w-14"
            />
            <p className="text-3xl">FOTOWOLTAIKA</p>
            <p>DLA FIRM</p>
          </div>
          <Image
            src={"/KlikDoKalkulacji.svg"}
            alt="Logo"
            width={80}
            height={80}
            className="h-7 w-7"
          />
          <p>STWÓRZ OFERTĘ</p>
        </div>
      </div>
    </main>
  );
}
