import { Overlay } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Loading, Navbar, SideBar } from "~/components";
import {
  HeatHomeMutations,
  Preview,
  HeatHomeFormulas,
} from "~/components/calculators/heatHome";
import { useHeatHome } from "~/hooks/useHeatHome";

const Cieplo_wlasciwe = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const { jsonData } = useHeatHome();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);

  HeatHomeMutations({ sessionData: sessionData });

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {!jsonData && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <HeatHomeFormulas />
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Cieplo_wlasciwe;
