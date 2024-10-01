import { useEffect, useState } from "react";
import { Checkbox, Loader, Tabs } from "@mantine/core";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { EditionForm } from "~/components/calculators/photovoltaics";
import { api } from "~/utils/api";
import { Navbar, SideBar } from "~/components";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";

const DaneFotowoltaiki = () => {
  const [menagers, setMenagers] = useState<string[]>([]);
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: entireJsonData } =
    api.dataFlow.getAllPvCalcs.useQuery<PhotovoltaicDataToCalculation[]>();

  useEffect(() => {
    if (sessionData === null || (sessionData && sessionData.user.role !== 1)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center overflow-hidden bg-[#E8E7E7] font-orkney">
      <Toaster />
      <SideBar />
      <div className="flex max-h-screen w-full flex-wrap ">
        <Navbar />
        <div className="max-h-[88%] w-full overflow-y-scroll">
          <Tabs
            orientation="vertical"
            color="lime"
            defaultValue={"cm0o4ylab0000q4dcocvv1heu"}
          >
            <Tabs.List className="z-50 w-min bg-backgroundGray">
              <Checkbox.Group value={menagers} onChange={setMenagers}>
                {entireJsonData?.map((calcData, index) => {
                  return (
                    <Tabs.Tab
                      value={calcData.id}
                      key={index}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox name="menagers" value={calcData.userId} />
                        <p>{calcData.userName}</p>
                      </div>
                    </Tabs.Tab>
                  );
                })}
              </Checkbox.Group>
            </Tabs.List>

            <div className="flex w-full justify-center ">
              {entireJsonData ? (
                entireJsonData.map((calcData, index) => {
                  return (
                    <Tabs.Panel value={calcData.id} key={index}>
                      <EditionForm data={calcData} menagers={menagers} />
                    </Tabs.Panel>
                  );
                })
              ) : (
                <Loader
                  color="yellow"
                  size="lg"
                  variant="dots"
                  className=" absolute top-40"
                />
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DaneFotowoltaiki;
