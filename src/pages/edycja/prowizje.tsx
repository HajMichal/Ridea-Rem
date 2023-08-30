import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Accordion } from "@mantine/core";

import { api } from "~/utils/api";
import { Loading, Navbar, SideBar } from "~/components";
import { useRouter } from "next/router";
import { User } from "@prisma/client";

type MenagerType = User & {
  workers: User[];
};

const Prowizje = () => {
  // useQuery to get users to display, menager see his workers, Admin see all menagers with their workers
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
  console.log(data);

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <SideBar />
      <div className="flex max-h-screen w-full flex-wrap justify-center">
        <Navbar />
        <div className="flex-warp flex h-full max-h-[80%] w-full justify-center gap-20 ">
          {sessionData.user.role === 1 && (
            <div>
              <h1>Twoi Menagerowie</h1>
              <div>
                <Accordion
                  variant="separated"
                  radius="xs"
                  defaultValue="customization"
                >
                  {data?.getMenagerWithWorkers?.map((menager: MenagerType) => (
                    <Accordion.Item
                      value={menager.name ?? "Imię Menagera"}
                      key={menager.id}
                    >
                      <Accordion.Control className="font-orkney">
                        <div className="flex flex-wrap items-center gap-5">
                          <div>
                            <h2>{menager.name} - menager</h2>
                            <p>Wysokość prowizji {menager.imposedFee}</p>
                          </div>
                          <button className="rounded-xl bg-brand p-2 px-4 font-orkneyBold text-dark">
                            Zmień prowizję
                          </button>
                        </div>
                      </Accordion.Control>
                      <Accordion.Panel>
                        {menager.workers.map((worker) => (
                          <div key={worker.id} className="mb-5 ml-10">
                            {worker.name} - handlowiec <br /> Wysokość prowizji{" "}
                            {worker.imposedFee}
                          </div>
                        ))}
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          )}
          <div>
            <h1>Twoi Handlowcy</h1>
            <div>
              {data?.getWorkers?.map((worker) => (
                <div key={worker.id} className="mb-5 ml-10">
                  {worker.name} - handlowiec <br /> Wysokość prowizji{" "}
                  {worker.imposedFee}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prowizje;
