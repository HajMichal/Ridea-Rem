import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Overlay } from "@mantine/core";
import { useRouter } from "next/router";

import { type HeatPumpDataToCalculationType } from "~/server/api/routers/heatpump/interfaces";
import { api } from "~/utils/api";

import { Loading } from "~/components";
import { SideBar, Navbar } from "~/components/LazyLoading";
import { Preview } from "~/components/calculators/heatPumps/lazyLoading";

import HeatPumpMutations from "~/components/calculators/heatPumps/HeatPumpMutations";
import HeatPumpFormulas from "~/components/calculators/heatPumps/HeatPumpFormulas";

const Pompy_ciepla = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);

  const { data } =
    api.heatPumpDataFlowRouter.downloadFile.useQuery<HeatPumpDataToCalculationType>(
      sessionData?.user.id
    );

  HeatPumpMutations({ data: data, sessionData: sessionData });

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {!data && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <HeatPumpFormulas data={data} />
          <Preview cop={data?.cop} />
        </div>
      </div>
    </main>
  );
};

export default Pompy_ciepla;
