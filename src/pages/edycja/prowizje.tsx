import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { Loading, Navbar, SideBar } from "~/components";
import { UsersSection } from "~/components/provision";

const Prowizje = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (
      (status === "authenticated" && sessionData?.user.role === 3) ||
      status === "unauthenticated"
    ) {
      void router.back();
    }
  }, [sessionData, router]);

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <SideBar />
      <div className="flex h-screen max-h-screen w-full flex-wrap">
        <Navbar />
        <div className="flex h-full max-h-[88%] w-full flex-wrap justify-center overflow-y-scroll">
          {status === "loading" ? (
            <Loading />
          ) : (
            <UsersSection userId={sessionData?.user.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Prowizje;
