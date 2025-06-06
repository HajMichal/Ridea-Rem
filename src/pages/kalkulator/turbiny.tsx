import { Overlay } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { Loading, Navbar, SideBar } from "~/components";
import {
  TurbinesFormulas,
  Preview,
  TurbinesMutations,
} from "~/components/calculators/turbines";
import { api } from "~/utils/api";

const Turbiny = () => {
  const { status } = useSession();
  const router = useRouter();
  const { data: turbinesData } = api.turbinesMenagerRouter.getSingle.useQuery();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);

  TurbinesMutations({ turbinesData: turbinesData ?? undefined });
  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {!turbinesData && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        {turbinesData && (
          <div className="flex h-full flex-wrap justify-center overflow-auto p-4 xl:overflow-hidden">
            <TurbinesFormulas turbinesData={turbinesData} />
            <Preview />
          </div>
        )}
      </div>
    </main>
  );
};
export default Turbiny;
