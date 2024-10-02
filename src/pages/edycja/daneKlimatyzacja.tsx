import { Loader, Tabs } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar, SideBar } from "~/components";
import { EditionForm } from "~/components/calculators/airCondition/edit/EditionForm";
import { api } from "~/utils/api";

function DaneKlimatyzacja() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: entireJsonData } =
    api.airConditionDataFlowRouter.getAllPvData.useQuery();

  useEffect(() => {
    if (sessionData === null || (sessionData && sessionData.user.role !== 1)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/");
    }
  }, [sessionData, router]);
  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center overflow-hidden bg-[#E8E7E7] font-orkney">
      <Toaster />
      <SideBar />
      <div className="flex max-h-screen w-full flex-wrap ">
        <Navbar />
        <div className="max-h-[88%] w-full overflow-y-scroll">
          <Tabs color="gray" defaultValue="Adrian Szymborski">
            <Tabs.List className="fixed z-50 w-full bg-backgroundGray">
              {entireJsonData?.kalkulator.map((eachUserRate, index) => {
                const dynamicKey = Object.keys(eachUserRate)[0];
                return (
                  <Tabs.Tab value={dynamicKey!} key={index}>
                    {dynamicKey}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>

            <div className="flex w-full justify-center ">
              {entireJsonData ? (
                entireJsonData.kalkulator.map((eachUserData, index) => {
                  const dynamicKey = Object.keys(eachUserData)[0];
                  return (
                    <Tabs.Panel value={dynamicKey!} key={index}>
                      <EditionForm data={eachUserData} />
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
}
export default DaneKlimatyzacja;
