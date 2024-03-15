import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import { PhotovoltaicMutations } from "~/components/calculators/photovoltaics";
import {
  Preview,
  PhotovoltaicFormulas,
} from "~/components/calculators/photovoltaics/lazyLoading";
import { SideBar, Navbar } from "~/components/LazyLoading";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Overlay } from "@mantine/core";
import { Loading } from "~/components";
import { api } from "~/utils/api";

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

  PhotovoltaicMutations({ data: data, sessionData: sessionData });

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
          <PhotovoltaicFormulas data={data} />
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
