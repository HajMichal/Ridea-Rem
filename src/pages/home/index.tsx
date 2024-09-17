import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomeTile = dynamic(() => import("~/components/home/HomeTile"));

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [status]);
  return (
    <main className="m-0 grid h-screen max-h-screen w-screen grid-cols-4 overflow-hidden hover:cursor-pointer">
      <HomeTile
        url={"/kalkulator/turbiny"}
        src={"/home/termomodernizacja.png"}
        iconSrc={"/home/icons/MagazynEnergiiIcon.svg"}
        color={"bg-[#FFE15D]"}
        title={"TURBINY"}
        subTitle={"WIATROWE"}
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
        url={"/kalkulator/klimatyzacja"}
        src={"/home/Foto_firm.png"}
        iconSrc={"/home/icons/PompaDoKalkulacji.svg"}
        color={"bg-[#00B4D8]"}
        title={"KLIMATYZACJA"}
        subTitle={""}
      />
    </main>
  );
}
