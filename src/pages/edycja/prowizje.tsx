import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { type User } from "@prisma/client";
import { Loading, UserFeeFormField } from "~/components";
import { SideBar, Navbar } from "~/components/LazyLoading";

export type MenagerType = User & {
  workers: User[];
};

const Prowizje = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const { data } = api.userDataHandling.getUsers.useQuery(
    {
      userId: sessionData?.user.id,
      role: sessionData?.user.role,
    },
    {
      enabled: Boolean(sessionData?.user.id),
    }
  );

  useEffect(() => {
    if (
      (status === "authenticated" && sessionData?.user.role === 3) ||
      status === "unauthenticated"
    ) {
      void router.back();
    }
  }, [sessionData, router]);

  if (!sessionData?.user.id) {
    return <Loading />;
  }

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <SideBar />
      <div className="flex h-screen max-h-screen w-full flex-wrap">
        <Navbar />
        <div className="flex h-full max-h-[88%] w-full flex-wrap gap-20 overflow-y-scroll">
          {sessionData.user.role === 1 && (
            <div className="w-full ">
              {data?.getMenagerWithWorkers?.map((menager: MenagerType) => (
                <div key={menager.id} className="grid grid-cols-2">
                  <div className="flex w-full flex-col items-center">
                    <UserFeeFormField user={menager} key={menager.id} />
                  </div>
                  {menager.workers.length !== 0 && (
                    <div className="flex w-full flex-col items-center p-5">
                      {/* <h2 className="p-3 text-xl">
                          Handlowcy pracujący pod {menager.name}
                        </h2> */}
                      {menager.workers.map((worker) => (
                        <UserFeeFormField
                          isWorker
                          user={worker}
                          key={worker.id}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {data && data.getWorkers.length > 0 && (
            <div className="w-full px-20 pb-32">
              <h1>Handlowcy</h1>
              <div>
                {data?.getWorkers?.map((worker) => (
                  <UserFeeFormField key={worker.id} user={worker} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prowizje;
