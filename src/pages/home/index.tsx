import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HomeTile } from "~/components/home/HomeTile";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData?.user) {
      console.log(sessionData?.user);
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
