import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SelectComponent } from "~/components";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { Preview } from "~/components/forCompany";
import useStore from "~/store";

const Fotowoltaika_firmy = () => {
  const store = useStore();
  const router = useRouter();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    } else if (sessionData?.user.role !== 1) void router.push("/home");
  }, [sessionData, router]);

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
            <h1
              style={{ textShadow: " 24px 24px #bebebe" }}
              className="z-50 mb-10 font-orkneyBold text-5xl"
            >
              FOTOWOLTAIKA DLA FIRM
            </h1>
            <ScrollArea h={"78%"}>
              <div className=" mr-4">
                <h2 className="font-orkneyBold">INSTALACJA FOTOWOLTAICZNA</h2>
                {/* <SelectComponent
                  title="MOC POJEDYŃCZEGO PANELA W KW"
                  onChange={(e) => {
                    store.updatePhotovoltaic("panelPower", Number(e));
                  }}
                  value={photovoltaicStore.panelPower}
                  data={[
                    { value: "400", label: "400" },
                    { value: "455", label: "455" },
                    { value: "500", label: "500" },
                  ]}
                /> */}
              </div>
            </ScrollArea>
          </div>
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika_firmy;
