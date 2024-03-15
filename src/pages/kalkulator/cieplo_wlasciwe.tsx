import { Overlay } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { lazy, useEffect } from "react";

import { Loading } from "~/components";
import { SideBar, Navbar } from "~/components/LazyLoading";
import { HeatHomeMutations } from "~/components/calculators/heatHome";
import { Preview } from "~/components/calculators/heatHome/lazyLoading";
import { useHeatHome } from "~/hooks/useHeatHome";

const HeatHomeFormulas = lazy(
  () => import("~/components/calculators/heatHome/HeatHomeFormulas")
);

const Cieplo_wlasciwe = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { jsonData } = useHeatHome();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

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
