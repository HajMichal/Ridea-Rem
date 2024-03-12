import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Overlay } from "@mantine/core";

import { api } from "~/utils/api";

import { Loading } from "~/components";
import { SideBar, Navbar } from "~/components/LazyLoading";
import {
  Preview,
  PhotovoltaicFormulas,
  PhotovoltaicMutations,
} from "~/components/photovoltaics/lazyLoading";

import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import React from "react";

const Fotowoltaika = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data } =
    api.dataFlow.downloadFile.useQuery<PhotovoltaicDataToCalculation>(
      sessionData?.user.id
    );

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

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
        <div className="flex h-full max-h-[90vw] flex-wrap overflow-scroll p-4 laptop:overflow-hidden">
          <PhotovoltaicMutations data={data} sessionData={sessionData} />
          <PhotovoltaicFormulas data={data} />
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
