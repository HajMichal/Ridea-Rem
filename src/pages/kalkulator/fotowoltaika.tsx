import { PhotovoltaicMutations } from "~/components/calculators/photovoltaics";
import { SideBar, Navbar } from "~/components/LazyLoading";
import { useSession } from "next-auth/react";
import React, { lazy, useEffect } from "react";
import { useRouter } from "next/router";
import { Overlay } from "@mantine/core";
import { Loading } from "~/components";
import PhotovoltaicFormulas from "~/components/calculators/photovoltaics/PhotovoltaicFormulas";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";

const Preview = lazy(
  () => import("~/components/calculators/photovoltaics/Preview")
);

const Fotowoltaika = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);

  const { photovoltaicData } = usePhotovoltaic();

  PhotovoltaicMutations({ data: photovoltaicData, sessionData: sessionData });

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney font-normal laptop:justify-center">
      {!photovoltaicData && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap overflow-scroll p-4 laptop:overflow-hidden">
          <PhotovoltaicFormulas data={photovoltaicData} />
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
