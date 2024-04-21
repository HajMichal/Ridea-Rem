import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Overlay } from "@mantine/core";
import { useRouter } from "next/router";

import { Loading } from "~/components";
import { SideBar, Navbar } from "~/components/LazyLoading";
import { Preview } from "~/components/calculators/heatPumps/lazyLoading";

import HeatPumpMutations from "~/components/calculators/heatPumps/HeatPumpMutations";
import HeatPumpFormulas from "~/components/calculators/heatPumps/HeatPumpFormulas";
import { useHeatPump } from "~/hooks/useHeatPump";

const Pompy_ciepla = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);

  const { heatPumpData } = useHeatPump();

  HeatPumpMutations({ data: heatPumpData, sessionData: sessionData });

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {!heatPumpData && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <HeatPumpFormulas data={heatPumpData} />
          <Preview cop={heatPumpData?.cop} />
        </div>
      </div>
    </main>
  );
};

export default Pompy_ciepla;
