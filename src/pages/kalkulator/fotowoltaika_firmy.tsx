import { Overlay } from "@mantine/core";
import React, { lazy, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Loading } from "~/components";
import { SideBar, Navbar } from "~/components/LazyLoading";
import { ForCompanyMutation } from "~/components/calculators/forCompany";
import { Preview } from "~/components/calculators/forCompany/lazyLoading";
import { useForCompany } from "~/hooks/useForCompany";

const ForCompanyFormulas = lazy(
  () => import("~/components/calculators/forCompany/ForCompanyFormulas")
);

const Fotowoltaika_firmy = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const { forCompanyData } = useForCompany();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);

  ForCompanyMutation({ data: forCompanyData, sessionData: sessionData });

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {!forCompanyData && (
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
