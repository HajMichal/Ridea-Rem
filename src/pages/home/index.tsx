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
    <main className="grid h-screen w-screen grid-cols-3 overflow-hidden hover:cursor-pointer">
      {/* <div
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
      </div> */}
      <div
        id="photovoltaic"
        className="bg-[#74B734] duration-100 hover:opacity-90"
        onClick={() => void router.push("/kalkulator/fotowoltaika")}
      >
        <Image
          src={"/home/Fotowoltaika.png"}
          alt="Zdjęcie instalacjii"
          width={640}
          height={1080}
          className="h-3/4 w-full object-cover"
        />
        <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
          <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
            <Image
              src={"/home/icons/FotowoltaikaIcon.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="mb-1 h-14 w-14"
            />
            <p className="text-3xl">PANELE </p>
            <p>FOTOWOLTAICZNE</p>
          </div>
          <div className="absolute bottom-10">
            <Image
              src={"/home/icons/KlikDoKalkulacji.svg"}
              alt="Logo"
              width={80}
              height={80}
              className=" ml-10 h-7 w-7"
            />
            <p>STWÓRZ OFERTĘ</p>
          </div>
        </div>
      </div>
      <div
        id="heatPump"
        className="bg-[#731DD8] duration-100 hover:opacity-90"
        onClick={() => void router.push("/kalkulator/pompy_ciepla")}
      >
        <Image
          src={"/home/Pompy_ciepla.png"}
          alt="Zdjęcie instalacjii"
          width={480}
          height={920}
          className="h-3/4 w-full object-cover"
        />
        <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
          <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
            <Image
              src={"/home/icons/PompaDoKalkulacji.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="mb-1 h-14 w-14"
            />
            <p className="text-3xl">POMPY</p>
            <p>CIEPŁA</p>
          </div>
          <div className="absolute bottom-10">
            <Image
              src={"/home/icons/KlikDoKalkulacji.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="ml-10  h-7  w-7"
            />
            <p>STWÓRZ OFERTĘ</p>
          </div>
        </div>
      </div>
      <div
        id="photovoltaicForCompany"
        className="bg-[#FFE15D] duration-100 hover:opacity-90"
        onClick={() => void router.push("/kalkulator/fotowoltaika_firmy")}
      >
        <Image
          src={"/home/Foto_firm.png"}
          alt="Zdjęcie instalacjii"
          width={640}
          height={1080}
          className="h-3/4 w-full object-cover"
        />
        <div className="flex flex-col items-center font-orkneyLight text-sm text-white">
          <div className="absolute top-[350px] flex flex-col items-center font-orkneyBold text-2xl text-white">
            <Image
              src={"/home/icons/FotowoltaikaIcon.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="mb-1 h-14 w-14"
            />
            <p className="text-3xl">FOTOWOLTAIKA</p>
            <p>DLA FIRM</p>
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
    </main>
  );
}
