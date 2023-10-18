import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main className="grid h-screen w-screen grid-cols-2 grid-rows-2 gap-4 bg-dark font-orkney">
        <div className="border-b-2 border-r-2 border-white bg-white">
          <div
            onClick={() => void router.push("/kalkulator/fotowoltaika")}
            className="h-full w-full  bg-[url('/login.png')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
          ></div>
        </div>
        <div className="border-b-2 border-l-2 border-white bg-white">
          <div
            onClick={() => void router.push("/kalkulator/fotowoltaika_firmy")}
            className="h-full w-full bg-[url('/Foto_firm.webp')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
          ></div>
        </div>
        <div className="border-r-2 border-t-2 border-white bg-white">
          <div
            onClick={() => void router.push("/kalkulator/magazyn_energii")}
            className="h-full w-full -scale-x-100 bg-[url('/Magazyn_energii.jpg')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
          ></div>
        </div>
        <div className="border-l-2 border-t-2 border-white bg-white">
          <div
            onClick={() => void router.push("/kalkulator/pompy_ciepla")}
            className="h-full w-full bg-[url('/Pompy_ciepla.webp')] bg-cover bg-bottom duration-150 hover:cursor-pointer hover:opacity-90"
          ></div>
        </div>
      </main>
    </>
  );
}
