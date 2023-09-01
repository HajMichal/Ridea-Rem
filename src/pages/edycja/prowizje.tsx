import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { type User } from "@prisma/client";
import { Loading, Navbar, SideBar, UserFeeFormField } from "~/components";

export type MenagerType = User & {
  workers: User[];
};

const Prowizje = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data } = api.userDataHandling.getUsers.useQuery(
    {
      userId: sessionData?.user.id,
      role: sessionData?.user.role,
    },
    { enabled: Boolean(sessionData?.user.id) }
  );

  useEffect(() => {
    if ((sessionData && sessionData?.user.role === 3) || sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/");
    }
  }, [sessionData, router]);

  if (!sessionData?.user.id) {
    return <Loading />;
  }

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <SideBar />
      <div className="flex max-h-screen w-full flex-wrap justify-center">
        <Navbar />
        <div className="flex h-full max-h-[80%] flex-wrap justify-center gap-20 p-5 ">
          {sessionData.user.role === 1 && (
            <div className="w-full ">
              <h1>Menagerowie</h1>
              <div>
                <div>
                  {data?.getMenagerWithWorkers?.map((menager: MenagerType) => (
                    <div key={menager.id}>
                      <UserFeeFormField user={menager} key={menager.id} />

                      {menager.workers.length !== 0 && (
                        <div className="ml-10  p-5">
                          <h2 className="p-3 text-xl">
                            Handlowcy pracujący pod {menager.name}
                          </h2>
                          {menager.workers.map((worker) => (
                            <UserFeeFormField user={worker} key={worker.id} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="w-full">
            <h1>Handlowcy</h1>
            <div>
              {data?.getWorkers?.map((worker) => (
                <UserFeeFormField key={worker.id} user={worker} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prowizje;
