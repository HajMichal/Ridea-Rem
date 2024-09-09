import { useEffect } from "react";
import { Loader, Tabs } from "@mantine/core";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Navbar, SideBar } from "~/components";
import { type TurbineCalcData } from "~/server/api/routers/turbines/interfaces";
import EditionForm from "~/components/calculators/turbines/edit/EditionForm";

const DaneTurbiny = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const { data: allMenagerCalcs } =
    api.turbinesDataFlowRouter.getAllCalcsData.useQuery<TurbineCalcData[]>();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (sessionData && sessionData.user.role !== 1)
    ) {
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
          <Tabs color="gray" defaultValue={"cm0o4ylab0000q4dcocvv1heu"}>
            <Tabs.List className="fixed z-50 w-full bg-backgroundGray">
              {allMenagerCalcs?.map((calcData, index) => {
                return (
                  <Tabs.Tab value={calcData.id} key={index}>
                    {calcData.userName}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>

            <div className="flex w-full justify-center ">
              {allMenagerCalcs ? (
                allMenagerCalcs.map((calcData, index) => {
                  return (
                    <Tabs.Panel value={calcData.id} key={index}>
                      <EditionForm data={calcData} />
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

export default DaneTurbiny;
