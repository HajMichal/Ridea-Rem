import { useEffect, useState } from "react";
import { Checkbox, Loader, Tabs } from "@mantine/core";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { EditionForm } from "~/components/calculators/heatPumps";
import { api } from "~/utils/api";
import { Navbar, SideBar } from "~/components";

const DanePompyCiepla = () => {
  const [menagers, setMenagers] = useState<string[]>([]);
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: allMenagersData } =
    api.heatPumpDataFlowRouter.getAll.useQuery();
  useEffect(() => {
    if ((sessionData && sessionData?.user.role !== 1) || sessionData === null) {
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
            defaultValue={"cm21oh0ku0000k8pjfxlk54pa"}
          >
            <Tabs.List className="hide-scroll-bar fixed z-50 h-heightMinusNavbar w-min overflow-y-scroll bg-backgroundGray">
              <Checkbox.Group value={menagers} onChange={setMenagers}>
                {allMenagersData?.map((menagerCalcData, index) => {
                  return (
                    <Tabs.Tab
                      value={menagerCalcData.id}
                      key={index}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          name="menagers"
                          value={menagerCalcData.userId}
                        />
                        <p>{menagerCalcData.userName}</p>
                      </div>
                    </Tabs.Tab>
                  );
                })}
              </Checkbox.Group>
            </Tabs.List>

            <div className="flex w-full justify-center ">
              {allMenagersData ? (
                allMenagersData.map((menagerCalcData, index) => {
                  return (
                    <Tabs.Panel value={menagerCalcData.id} key={index}>
                      <EditionForm data={menagerCalcData} menagers={menagers} />
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

export default DanePompyCiepla;
