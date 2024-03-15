import { Overlay } from "@mantine/core";
import React, { lazy, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { type ForCompanyDataToCalcualtionType } from "~/server/api/routers/forCompany/interfaces";
import { api } from "~/utils/api";

import { Loading } from "~/components";
import { SideBar, Navbar } from "~/components/LazyLoading";
import { ForCompanyMutation } from "~/components/calculators/forCompany";
import { Preview } from "~/components/calculators/forCompany/lazyLoading";

const ForCompanyFormulas = lazy(
  () => import("~/components/calculators/forCompany/ForCompanyFormulas")
);

const Fotowoltaika_firmy = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data } =
    api.forCompanyDataFlowRouter.downloadFile.useQuery<ForCompanyDataToCalcualtionType>(
      sessionData?.user.id
    );

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

  ForCompanyMutation({ data: data, sessionData: sessionData });

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
          <ForCompanyFormulas />
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika_firmy;
