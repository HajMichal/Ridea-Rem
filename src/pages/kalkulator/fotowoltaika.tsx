import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Overlay } from "@mantine/core";
import {
  PhotovoltaicMutations,
  PhotovoltaicFormulas,
  Preview,
} from "~/components/calculators/photovoltaics";
import { useRouter } from "next/router";
import { Loading, Navbar, SideBar } from "~/components";
import { api } from "~/utils/api";
import type { PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";

const Fotowoltaika = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);

  const { data: photovoltaicData } =
    api.pvMenagerRouter.getSingle.useQuery<PhotovoltaicDataToCalculation>();

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
          <PhotovoltaicFormulas photovoltaicData={photovoltaicData} />
          <Preview
            heatStorePrice={photovoltaicData?.dotations["magazynCiepla"]}
          />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
